import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import { Container } from "@/components/shared/container";
import { ErrorMessage } from "@/components/shared/error-message";
import { Hero } from "@/components/shared/hero";
import { fetchStudentCourseDetailQueryOptions } from "@/queries/courses";
import { CourseDetail } from "./-components/course-detail";
import { CourseDetailSkeleton } from "./-components/skeletons/course-detail-skeleton";
import { HeroSkeleton } from "./-components/skeletons/hero-skeleton";

const searchSchema = z.object({
  chapterId: z.string().optional(),
  lessonId: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/courses/$courseId")({
  loader: async ({ params, context }) => {
    // await new Promise(() => {});
    const { courseId } = params;

    const course = await context.queryClient.query(
      fetchStudentCourseDetailQueryOptions(courseId)
    );

    return { course };
  },
  pendingComponent: () => (
    <>
      <section>
        <HeroSkeleton />
      </section>
      <section className="my-6">
        <Container>
          <CourseDetailSkeleton />
        </Container>
      </section>
    </>
  ),
  errorComponent: ErrorMessage,
  validateSearch: searchSchema,
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
      <section className="my-6">
        <Container>
          <CourseDetail course={course} />
        </Container>
      </section>
    </>
  );
}
