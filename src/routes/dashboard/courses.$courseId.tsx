import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { ErrorMessage } from "@/components/error-message";
import { Hero } from "@/components/hero";
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
  component: DashboardStudentCourse,
});

function DashboardStudentCourse() {
  const { course } = Route.useLoaderData();

  return (
    <>
      <section className="w-full overflow-hidden">
        <Hero
          text="Khóa"
          highlightText={course.title}
          quote={course.description ?? ""}
        />
      </section>
      <section className="mt-6">
        <Container>
          <CourseDetail course={course} />
        </Container>
      </section>
    </>
  );
}
