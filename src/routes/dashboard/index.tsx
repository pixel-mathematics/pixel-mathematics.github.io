import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/shared/container";
import { ErrorMessage } from "@/components/shared/error-message";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";
import { Separator } from "@/components/ui/separator";
import {
  fetchStudentCoursesQueryOptions,
  fetchStudentLessonsQueryOptions,
} from "@/queries/courses";
import { CourseCard } from "./-components/course-card";
import { LessonListItem } from "./-components/lesson-list-item";
import { CourseCardSkeleton } from "./-components/skeletons/course-card-skeleton";
import { HeadingSkeleton } from "./-components/skeletons/heading-skeleton";
import { HeroSkeleton } from "./-components/skeletons/hero-skeleton";
import { LessonListItemSkeleton } from "./-components/skeletons/lesson-list-item-skeleton";

export const Route = createFileRoute("/dashboard/")({
  loader: async ({ context: { queryClient, profile } }) => {
    // await new Promise(() => {});
    const courses = await queryClient.query(
      fetchStudentCoursesQueryOptions(profile.id)
    );
    const lessons = await queryClient.query(
      fetchStudentLessonsQueryOptions(profile.id)
    );
    return { courses, lessons };
  },
  pendingMs: 0,
  pendingComponent: () => (
    <>
      <section className="w-full overflow-hidden">
        <HeroSkeleton />
      </section>
      <section className="my-6">
        <Container>
          <HeadingSkeleton />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 2 }, (_, i) => i + 1).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
      <Separator />
      <section className="my-6">
        <Container>
          <HeadingSkeleton />
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
              <LessonListItemSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  ),
  errorComponent: ErrorMessage,
  component: Dashboard,
});

function Dashboard() {
  const { courses, lessons } = Route.useLoaderData();

  return (
    <>
      <section className="w-full overflow-hidden">
        <Hero
          text="Pixel"
          highlightText="Mathematics"
          quote={`"The more I learn, the less I realize I know"`}
        />
      </section>
      <section className="my-6">
        <Container>
          <Heading>Khóa học PIXEL2027</Heading>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>
      <Separator />
      <section className="my-6">
        <Container>
          <Heading>Bài học gần đây</Heading>
          <div className="grid grid-cols-1 gap-2">
            {lessons.slice(0, 8).map((lesson) => (
              <LessonListItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
