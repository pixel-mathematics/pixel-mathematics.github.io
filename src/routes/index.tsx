import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="text-destructive p-2 text-red-500">
      <h3>Welcome Home!</h3>
    </div>
  );
}
