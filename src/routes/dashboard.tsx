import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { fetchCurrentUserProfileQueryOptions } from "@/queries/auth";

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
      <div>From Dashboard Layout</div>
      <Outlet />
    </div>
  );
}
