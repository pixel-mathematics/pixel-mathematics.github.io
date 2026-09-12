import type { QueryData } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/* Fetch subjects */
const fetchSubjectsWithCoursesQuery = supabase.from("subjects").select(`
    id,
    title,
    sort_order,
    courses (
      id,
      title,
      description,
      start_date,
      updated_on,
      subjects (
        id,
        title
      )
    )
  `);

export type SubjectWithCourses = QueryData<
  typeof fetchSubjectsWithCoursesQuery
>[0];

export async function fetchSubjectsWithCourses(): Promise<
  SubjectWithCourses[]
> {
  const { data, error } = await fetchSubjectsWithCoursesQuery;

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu môn học");
  }

  return data;
}

export const fetchSubjectsWithCoursesQueryOptions = queryOptions({
  queryKey: ["subjects"],
  queryFn: fetchSubjectsWithCourses,
  staleTime: 1000 * 60 * 5,
});

/* Fetch all courses */
const fetchCoursesWithSubjectsQuery = supabase
  .from("courses")
  .select(
    `
    id,
    subjects (
      id,
      title
    ),
    title,
    description,
    start_date,
    updated_on
  `
  )
  .eq("status", "active");

export type CourseWithSubjects = QueryData<
  typeof fetchCoursesWithSubjectsQuery
>[0];

export async function fetchCoursesWithSubjects(): Promise<
  CourseWithSubjects[]
> {
  const { data, error } = await fetchCoursesWithSubjectsQuery;

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu khóa học");
  }

  return data;
}

export const fetchCoursesWithSubjectsQueryOptions = queryOptions({
  queryKey: ["courses"],
  queryFn: fetchCoursesWithSubjects,
  staleTime: 1000 * 60 * 5,
});

/* Fetch a single course with its chapters (including lessons) and documents */
const fetchCourseWithChaptersAndDocumentsQuery = (id: string) =>
  supabase
    .from("courses")
    .select(
      `
    id,
    title,
    description,
    start_date,
    updated_on,
    status,
    sort_order,
    chapters (
      id,
      title,
      start_date,
      sort_order,
      lessons (
        id,
        title,
        class_date,
        updated_on,
        deadline,
        sort_order,
        lesson_attachments (
          id,
          file_name,
          file_url,
          file_type
        )
      )
    ),
    documents (
      id,
      file_name,
      file_url,
      file_type
    )
`
    )
    .order("id", { referencedTable: "chapters", ascending: true })
    .eq("id", id)
    .single();

export type CourseWithChaptersAndDocuments = QueryData<
  ReturnType<typeof fetchCourseWithChaptersAndDocumentsQuery>
>;

export async function fetchCourseWithChaptersAndDocuments(
  id: string
): Promise<CourseWithChaptersAndDocuments> {
  const { data, error } = await fetchCourseWithChaptersAndDocumentsQuery(id);

  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu khóa học #${id}`);
  }

  return data;
}

export const fetchCourseWithChaptersAndDocumentsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["courses", id],
    queryFn: () => fetchCourseWithChaptersAndDocuments(id),
    staleTime: 1000 * 60 * 5,
  });

/* Fetch all lessons for searching */
const fetchLessonsWithChapterAndCourseQuery = supabase
  .from("lessons")
  .select(
    `
      id,
      title,
      class_date,
      updated_on,
      chapters (
        id,
        title,
        courses (
          id,
          title
        )
      )
    `
  )
  .order("updated_on", { ascending: false })
  .order("id", { ascending: false });

export type LessonWithChapterAndCourse = QueryData<
  typeof fetchLessonsWithChapterAndCourseQuery
>[0];

export async function fetchLessonsWithChapterAndCourse(): Promise<
  LessonWithChapterAndCourse[]
> {
  const { data, error } = await fetchLessonsWithChapterAndCourseQuery;

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu bài học");
  }

  return data;
}

export const fetchLessonsWithChapterAndCourseQueryOptions = queryOptions({
  queryKey: ["lessons"],
  queryFn: fetchLessonsWithChapterAndCourse,
  staleTime: 1000 * 60 * 5,
});
