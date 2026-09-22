import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/data/auth/queries";
import { getStudentLessons } from "@/data/courses/queries";
import {
  CalendarDaysIcon,
  ChartSplineIcon,
  FlameIcon,
  NotebookPenIcon,
  UserRoundCogIcon,
} from "lucide-react";

import { getAvatarFallbackText } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

import { Search } from "./_components/search";

export default async function DashboardPage() {
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/");
  }
  const lessons = await getStudentLessons(profile.id);

  return (
    <>
      <section className="w-full overflow-hidden">
        <Hero
          text="Pixel"
          highlightText="Mathematics"
          quote={`"The more I learn, the less I realize I know"`}
        />
      </section>
      <Container className="mt-6 flex flex-col gap-6">
        <ReusableBreadcrumb items={[{ href: "/dashboard", label: "Góc học tập" }]} />
        <section className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Avatar className="size-12 md:size-16">
              <AvatarFallback className="text-primary-foreground bg-primary rounded-md text-2xl font-medium md:text-4xl">
                {getAvatarFallbackText(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium">Xin chào,</p>
              <p className="text-primary text-xl font-medium">{profile.full_name}</p>
            </div>
          </div>
          <Search data={{ lessons }} />
        </section>
        <Separator />
        <section>
          <Heading>Danh sách tiện ích</Heading>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {dashboardNavItems.map(({ href, icon: Icon, title, description }) => (
              <Link key={href} href={href}>
                <div className="border-primary flex items-center gap-4 rounded-xl border-2 p-4">
                  <div className="text-primary bg-primary/10 grid aspect-[1/1] size-16 place-items-center rounded-xl md:size-20">
                    <Icon className="size-8 size-10" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-primary text-lg font-medium md:text-xl">{title}</div>
                    <div className="text-muted-foreground mt-0 truncate md:mt-1">{description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

const dashboardNavItems = [
  {
    href: "/dashboard/courses",
    icon: NotebookPenIcon,
    title: "Khóa học",
    description: "Các khóa học PIXEL2027 của bạn",
  },
  {
    href: "#results",
    // href: "/dashboard/results",
    icon: ChartSplineIcon,
    title: "Kết quả học tập",
    description: "Kết quả các bài kiểm tra định kì",
  },
  {
    href: "#feedback",
    // href: "/dashboard/feedback",
    icon: FlameIcon,
    title: "Nhận xét hàng tuần",
    description: "Nhận xét thái độ học tập ở các buổi học",
  },
  {
    href: "/dashboard/schedule",
    icon: CalendarDaysIcon,
    title: "Thời khóa biểu",
    description: "Ngày và giờ học cụ thể",
  },
  {
    href: "/dashboard/account",
    icon: UserRoundCogIcon,
    title: "Tài khoản",
    description: "Thông tin và thiết lập tài khoản",
  },
];
