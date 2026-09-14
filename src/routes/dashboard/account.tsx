import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/account")({
  component: DashboardAccount,
});

function DashboardAccount() {
  return <div>Hello "/dashboard/account"!</div>;
}
