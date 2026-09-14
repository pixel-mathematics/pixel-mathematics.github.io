import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Footer } from "./-components/footer";
import { Header } from "./-components/header";

export const Route = createFileRoute("/_public")({
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
