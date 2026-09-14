import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LogoIcon } from "@/components/shared/custom-icons";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <main>
      <div className="relative top-[50vh] flex translate-y-[-50%] flex-col items-center gap-6 sm:absolute sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%]">
        <div className="flex items-center gap-2">
          <LogoIcon size={48} />
          <div className="text-4xl font-semibold tracking-tight">
            <span className="text-primary">Pixel</span> Mathematics
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  );
}
