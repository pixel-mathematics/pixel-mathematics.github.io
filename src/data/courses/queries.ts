"use server";

import { cache } from "react";
import type { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

/* get all courses of current user */
export async function buildStudentCoursesQuery(
  client: SupabaseClient<Database>,
  studentId: string
) {
  return client
    .from("courses")
    .select(
      `
    *,
    subjects (
      id,
      title
    ),
    enrollments!inner ( student_id )
  `
    )
    .eq("status", "active")
    .eq("enrollments.student_id", studentId);
}

export type StudentCourse = QueryData<ReturnType<typeof buildStudentCoursesQuery>>[0];

export const getStudentCourses = cache(async (studentId: string): Promise<StudentCourse[]> => {
  const supabase = await createClient();
  const { data, error } = await buildStudentCoursesQuery(supabase, studentId);

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu khóa học");
  }

  return data;
});

/* get a course of current user */
export async function buildStudentCourseDetailQuery(
  client: SupabaseClient<Database>,
  courseId: string
) {
  return client
    .from("courses")
    .select(
      `
    *,
    subjects (
      *
    )
  `
    )
    .order("id", { ascending: true })
    .eq("id", courseId)
    .single();
}

export type StudentCourseDetail = QueryData<ReturnType<typeof buildStudentCourseDetailQuery>>;

export const getStudentCourseDetail = cache(
  async (courseId: string): Promise<StudentCourseDetail> => {
    const supabase = await createClient();

    const { data, error } = await buildStudentCourseDetailQuery(supabase, courseId);
    if (!data || error) {
      throw new Error(`Lỗi lấy dữ liệu khóa học #${courseId}`);
    }

    return data;
  }
);

/* get chapters with lessons in a course */
export async function buildCourseChaptersQuery(client: SupabaseClient<Database>, courseId: string) {
  return client
    .from("chapters")
    .select(
      `
      *,
      lessons (
        *,
        lesson_attachments (
          *
        )
      )
  `
    )
    .order("id", { ascending: true })
    .eq("course_id", courseId);
}

export type CourseChapter = QueryData<ReturnType<typeof buildCourseChaptersQuery>>[number];

export const getCourseChapters = cache(async (courseId: string): Promise<CourseChapter[]> => {
  const supabase = await createClient();

  const { data, error } = await buildCourseChaptersQuery(supabase, courseId);
  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu bài học của khóa #${courseId}`);
  }

  return data;
});

/* get decks in a course */
export async function buildCourseDecksQuery(client: SupabaseClient<Database>, courseId: string) {
  return client
    .from("flashcard_decks")
    .select(
      `
      *,
      flashcards (count)

  `
    )
    .order("id", { ascending: true })
    .eq("course_id", courseId);
}

export type CourseDeck = QueryData<ReturnType<typeof buildCourseDecksQuery>>[number];

export const getCourseDecks = cache(async (courseId: string): Promise<CourseDeck[]> => {
  const supabase = await createClient();

  const { data, error } = await buildCourseDecksQuery(supabase, courseId);
  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu  của khóa #${courseId}`);
  }

  return data;
});

/* get documents in a course */
export async function buildCourseDocumentsQuery(
  client: SupabaseClient<Database>,
  courseId: string
) {
  return client
    .from("documents")
    .select(
      `
      *

  `
    )
    .order("id", { ascending: true })
    .eq("course_id", courseId);
}

export type CourseDocument = QueryData<ReturnType<typeof buildCourseDocumentsQuery>>[number];

export const getCourseDocuments = cache(async (courseId: string): Promise<CourseDocument[]> => {
  const supabase = await createClient();

  const { data, error } = await buildCourseDocumentsQuery(supabase, courseId);
  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu tài liệu của khóa #${courseId}`);
  }

  return data;
});

/* get recent lessons of current user */
export async function buildStudentLessonsQuery(
  client: SupabaseClient<Database>,
  studentId: string
) {
  return (
    client
      .from("lessons")
      .select(
        ` *,
          chapters!inner (
            id, title,
            courses!inner (
              id, title,
              enrollments!inner (
                student_id
              )
            )
          )
        `
      )
      // Lọc những bài học thuộc về học sinh này (thông qua JOIN)
      .eq("chapters.courses.enrollments.student_id", studentId)
      .order("updated_on", { ascending: false })
  );
}

export type StudentLesson = QueryData<ReturnType<typeof buildStudentLessonsQuery>>[0];

export const getStudentLessons = cache(async (studentId: string): Promise<StudentLesson[]> => {
  const supabase = await createClient();

  const { data, error } = await buildStudentLessonsQuery(supabase, studentId);
  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu các bài học gần đây`);
  }

  return data;
});

export async function buildFlashcardDeckDetailQuery(
  client: SupabaseClient<Database>,
  deckId: string
) {
  return client
    .from("flashcard_decks")
    .select(
      `
      *,
      courses (*),
      flashcards (*)
    `
    )
    .eq("id", deckId)
    .single();
}

export type FlashcardDeckDetail = QueryData<ReturnType<typeof buildFlashcardDeckDetailQuery>>;

export const getFlashcardDeckDetail = cache(
  async (deckId: string): Promise<FlashcardDeckDetail> => {
    const supabase = await createClient();

    const { data, error } = await buildFlashcardDeckDetailQuery(supabase, deckId);

    if (!data || error) {
      throw new Error(`Lỗi lấy dữ liệu của bộ thẻ #${deckId}`);
    }

    return data;
  }
);
