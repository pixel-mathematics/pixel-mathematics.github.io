import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/data/auth/queries";
import {
  CalendarDaysIcon,
  ChartSplineIcon,
  FlameIcon,
  NotebookPenIcon,
  UserRoundCogIcon,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

export default async function DashboardPage() {
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/");
  }

  return (
    <>
      <section className="w-full overflow-hidden">
        <Hero
          text="Pixel"
          highlightText="Mathematics"
          quote={`"The more I learn, the less I realize I know"`}
        />
      </section>
      <Container className="mt-6">
        <ReusableBreadcrumb items={[{ href: "/dashboard", label: "Góc học tập" }]} />
      </Container>
      <section className="my-6">
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {dashboardNavItems.map(({ href, icon: Icon, title, description }) => (
              <Link key={href} href={href}>
                <div className="border-primary flex items-center gap-4 rounded-xl border-2 p-4">
                  <div className="text-primary bg-primary/10 grid aspect-[1/1] size-16 place-items-center rounded-xl md:size-20">
                    <Icon className="size-10 md:size-12" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-primary text-lg font-medium md:text-xl">{title}</div>
                    <div className="text-muted-foreground mt-0 truncate md:mt-1">{description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
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
