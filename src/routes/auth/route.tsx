import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Logo } from "@/components/shared/logo";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <main>
      <div className="relative top-[50vh] flex translate-y-[-50%] flex-col items-center gap-6 sm:absolute sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%]">
        <Logo />
        <Outlet />
      </div>
    </main>
  );
}
