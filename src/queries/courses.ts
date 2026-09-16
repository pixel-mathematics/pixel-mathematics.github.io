import type { QueryData } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/* Fetch all courses of current user */
const fetchStudentCoursesQuery = (studentId: string) =>
  supabase
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

export type StudentCourse = QueryData<
  ReturnType<typeof fetchStudentCoursesQuery>
>[0];

export async function fetchStudentCourses(
  studentId: string
): Promise<StudentCourse[]> {
  const { data, error } = await fetchStudentCoursesQuery(studentId);

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu khóa học");
  }

  return data;
}

export const fetchStudentCoursesQueryOptions = (studentId: string) =>
  queryOptions({
    queryKey: ["courses", "student", studentId],
    queryFn: () => fetchStudentCourses(studentId),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 60 * 24,
  });

/* Fetch a course of current user */
const fetchStudentCourseDetailQuery = (courseId: string) =>
  supabase
    .from("courses")
    .select(
      `
    *,
    subjects (
      *
    ),
    chapters (
      *,
      lessons (
        *,
        lesson_attachments (
          *
        )
      )
    ),
    documents (*)
  `
    )
    .order("id", { referencedTable: "chapters", ascending: true })
    .eq("id", courseId)
    .single();

export type StudentCourseDetail = QueryData<
  ReturnType<typeof fetchStudentCourseDetailQuery>
>;

export async function fetchStudentCourseDetail(
  courseId: string
): Promise<StudentCourseDetail> {
  const { data, error } = await fetchStudentCourseDetailQuery(courseId);

  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu khóa học #${courseId}`);
  }

  return data;
}

export const fetchStudentCourseDetailQueryOptions = (courseId: string) =>
  queryOptions({
    queryKey: ["courses", courseId],
    queryFn: () => fetchStudentCourseDetail(courseId),
    staleTime: 1000 * 60 * 60 * 24,
  });

/* Fetch recent lessons of current user */
const fetchStudentLessonsQuery = (studentId: string) =>
  supabase
    .from("lessons")
    .select(
      `
          *,
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
    .order("updated_on", { ascending: false });

export type StudentLesson = QueryData<
  ReturnType<typeof fetchStudentLessonsQuery>
>[0];

export async function fetchStudentLessons(
  studentId: string
): Promise<StudentLesson[]> {
  const { data, error } = await fetchStudentLessonsQuery(studentId);

  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu các bài học gần đây`);
  }

  return data;
}

export const fetchStudentLessonsQueryOptions = (studentId: string) =>
  queryOptions({
    queryKey: ["lessons", "student", studentId],
    queryFn: () => fetchStudentLessons(studentId),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 60 * 24,
  });
