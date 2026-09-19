import { redirect } from "next/navigation";
import { getUserProfile } from "@/data/auth/queries";
import { getStudentLessons } from "@/data/courses/queries";
import { DashboardProvider } from "@/providers/dashboard-provider";

import { DashboardFooter } from "./_components/dashboard-footer";
import { DashboardHeader } from "./_components/dashboard-header";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/sign-in");
  }

  const lessons = await getStudentLessons(profile?.id);

  return (
    <DashboardProvider data={{ profile, lessons }}>
      <DashboardHeader />
      <main className="min-h-svh">{children}</main>
      <DashboardFooter />
    </DashboardProvider>
  );
}
