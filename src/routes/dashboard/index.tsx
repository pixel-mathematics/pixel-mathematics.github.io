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

export const Route = createFileRoute("/dashboard/")({
  loader: async ({ context: { queryClient, profile } }) => {
    const courses = await queryClient.query(
      fetchStudentCoursesQueryOptions(profile.id)
    );
    const lessons = await queryClient.query(
      fetchStudentLessonsQueryOptions(profile.id)
    );
    return { courses, lessons };
  },
  pendingComponent: () => <div>Loading...</div>,
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
      <Container>
        <section className="my-6">
          <Heading>Khóa học PIXEL2027</Heading>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
        <Separator />
        <section className="my-6">
          <Heading>Bài học gần đây</Heading>
          <div className="grid grid-cols-1 gap-2">
            {lessons.slice(0, 8).map((lesson) => (
              <LessonListItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
