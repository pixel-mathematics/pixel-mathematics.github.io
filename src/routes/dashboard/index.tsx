import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { ErrorMessage } from "@/components/error-message";
import { Heading } from "@/components/heading";
import { Hero } from "@/components/hero";
import {
  fetchStudentCoursesQueryOptions,
  fetchStudentRecentLessonsQueryOptions,
} from "@/queries/courses";
import { CourseCard } from "./-components/course-card";
import { RecentLessonItem } from "./-components/recent-lesson-item";

export const Route = createFileRoute("/dashboard/")({
  loader: async ({ context: { queryClient, profile } }) => {
    const courses = await queryClient.query(
      fetchStudentCoursesQueryOptions(profile.id)
    );
    const recentLessons = await queryClient.query(
      fetchStudentRecentLessonsQueryOptions(profile.id)
    );
    return { courses, recentLessons };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ErrorMessage,
  component: Dashboard,
});

function Dashboard() {
  const { courses, recentLessons } = Route.useLoaderData();

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
        <section className="mt-6">
          <Heading>Khóa học</Heading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
        <section className="mt-6">
          <Heading>Bài học gần đây</Heading>
          <div className="grid grid-cols-1 gap-2">
            {recentLessons.map((lesson) => (
              <RecentLessonItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
