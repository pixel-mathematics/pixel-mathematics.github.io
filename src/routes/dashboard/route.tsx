import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { fetchCurrentUserProfileQueryOptions } from "@/queries/auth";
import {
  fetchStudentCoursesQueryOptions,
  fetchStudentLessonsQueryOptions,
} from "@/queries/courses";
import { Footer } from "./-components/footer";
import { Header } from "./-components/header";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context, location }) => {
    try {
      const profile = await context.queryClient.query(
        fetchCurrentUserProfileQueryOptions
      );

      if (!profile) {
        throw redirect({
          to: "/auth/sign-in",
          search: {
            redirect: location.href,
          },
        });
      }

      return { profile };
    } catch (err) {
      if (err instanceof Error && err.message.includes("redirect")) {
        throw err;
      }

      throw redirect({ to: "/auth/sign-in" });
    }
  },
  loader: async ({ context: { queryClient, profile } }) => {
    const courses = await queryClient.query(
      fetchStudentCoursesQueryOptions(profile.id)
    );
    const lessons = await queryClient.query(
      fetchStudentLessonsQueryOptions(profile.id)
    );
    return { profile, courses, lessons };
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <>
      <Header />
      <main className="min-h-svh">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
