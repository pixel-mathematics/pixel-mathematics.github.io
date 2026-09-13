import { createFileRoute } from "@tanstack/react-router";
import { ErrorMessage } from "@/components/error-message";
import { fetchStudentCourseDetailQueryOptions } from "@/queries/courses";
import { CourseDetail } from "./-components/course-detail";

export const Route = createFileRoute("/dashboard/courses/$courseId")({
  loader: async ({ params, context }) => {
    const { courseId } = params;

    const course = await context.queryClient.query(
      fetchStudentCourseDetailQueryOptions(courseId)
    );

    return { course };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ErrorMessage,
  component: StudentCourse,
});

function StudentCourse() {
  const { course } = Route.useLoaderData();

  return (
    <div>
      <CourseDetail course={course} />
    </div>
  );
}
