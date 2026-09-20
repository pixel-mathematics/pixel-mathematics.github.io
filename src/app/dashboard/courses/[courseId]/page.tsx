import { redirect } from "next/navigation";
import { getStudentCourseDetail } from "@/data/courses/queries";

export default async function DashboardCourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getStudentCourseDetail(courseId);

  redirect(`/dashboard/courses/${course.id}/lessons`);
}
