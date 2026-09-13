import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { fetchCurrentUserProfileQueryOptions } from "@/queries/auth";
import { Footer } from "@/routes/dashboard/-components/footer";
import { Header } from "@/routes/dashboard/-components/header";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context, location }) => {
    try {
      const profile = await context.queryClient.query(
        fetchCurrentUserProfileQueryOptions
      );

      if (!profile) {
        throw redirect({
          to: "/sign-in",
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

      throw redirect({ to: "/sign-in" });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="p-2">
      <Header />
      <main className="min-h-svh">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
