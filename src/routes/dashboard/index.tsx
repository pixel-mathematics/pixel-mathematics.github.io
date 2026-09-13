import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { ErrorMessage } from "@/components/error-message";
import { fetchStudentCoursesQueryOptions } from "@/queries/courses";
import { CourseCard } from "./-components/course-card";

export const Route = createFileRoute("/dashboard/")({
  loader: async ({ context: { queryClient, profile } }) => {
    const courses = await queryClient.query(
      fetchStudentCoursesQueryOptions(profile.id)
    );
    console.log(courses);
    return { courses };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ErrorMessage,
  component: Dashboard,
});

function Dashboard() {
  const { courses } = Route.useLoaderData();

  return (
    <>
      <section>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
