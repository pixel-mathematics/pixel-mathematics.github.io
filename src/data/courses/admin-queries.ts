"use server";

import { cache } from "react";
import type { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

/* get all courses of current user */
export async function buildCoursesQuery(client: SupabaseClient<Database>) {
  return client
    .from("courses")
    .select(
      `
    *,
    subject:subjects (
      id,
      title
    )
  `
    )
    .order("id", { ascending: true });
}

export type Course = QueryData<ReturnType<typeof buildCoursesQuery>>[0];

export const getCourses = cache(async (): Promise<Course[]> => {
  const supabase = await createClient();
  const { data, error } = await buildCoursesQuery(supabase);

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu khóa học");
  }

  return data;
});
