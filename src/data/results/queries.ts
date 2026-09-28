"use server";

import { cache } from "react";
import type { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

/* get all courses of current user */
export async function buildStudentResultsQuery(
  client: SupabaseClient<Database>,
  studentId: string
) {
  return client
    .from("results")
    .select(
      `
    id,
    score,
    lesson:lessons(id, title, class_date, chapter:chapters(id, title, course:courses(id, title, subject:subjects(id, title, sort_order))))
  `
    )
    .eq("student_id", studentId);
}

export type StudentResult = QueryData<ReturnType<typeof buildStudentResultsQuery>>[number];

export interface StudentResultsBySubject {
  id: string;
  title: string;
  sort_order: number;
  results: StudentResult[];
}

export const getStudentResults = cache(
  async (studentId: string): Promise<StudentResultsBySubject[]> => {
    const supabase = await createClient();
    const { data, error } = await buildStudentResultsQuery(supabase, studentId);

    if (!data || error) {
      throw new Error("Lỗi lấy dữ liệu kết quả kiểm tra");
    }

    return data
      .reduce((acc, item) => {
        const subjectId = item.lesson.chapter?.course?.subject?.id;
        if (!subjectId) return acc;

        const index = acc.findIndex((r) => r.id === subjectId);

        if (index < 0) {
          return [
            ...acc,
            {
              id: subjectId,
              title: item.lesson.chapter!.course!.subject!.title,
              sort_order: item.lesson.chapter!.course!.subject!.sort_order ?? 0,
              results: [item],
            },
          ];
        }

        acc[index].results.push(item);
        return acc;
      }, [] as StudentResultsBySubject[])
      .sort((a, b) => a.sort_order - b.sort_order);
  }
);
