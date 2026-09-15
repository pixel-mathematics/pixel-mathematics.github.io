import { createFileRoute, Outlet } from "@tanstack/react-router";
import { fetchCurrentUserProfileQueryOptions } from "@/queries/auth";
import { Footer } from "./-components/footer";
import { Header } from "./-components/header";

export const Route = createFileRoute("/_public")({
  loader: async ({ context }) => {
    const profile = await context.queryClient.query(
      fetchCurrentUserProfileQueryOptions
    );

    return { profile };
  },
  component: PublicLayout,
});

function PublicLayout() {
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
