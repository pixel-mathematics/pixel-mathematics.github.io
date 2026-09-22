import { redirect } from "next/navigation";
import { getUserProfile } from "@/data/auth/queries";
import { DashboardProvider } from "@/providers/dashboard-provider";

import { DashboardFooter } from "./_components/dashboard-footer";
import { DashboardHeader } from "./_components/dashboard-header";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/sign-in");
  }

  return (
    <DashboardProvider data={{ profile }}>
      <DashboardHeader />
      <main className="min-h-screen">{children}</main>
      <DashboardFooter />
    </DashboardProvider>
  );
}
