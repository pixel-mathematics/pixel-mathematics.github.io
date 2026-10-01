import Link from "next/link";
import { LibraryIcon, Users2Icon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

export default async function DashboardPage() {
  return (
    <Container className="mt-6 flex flex-col gap-6">
      <ReusableBreadcrumb
        items={[
          { href: "/admin", label: "Bảng điều khiển" },
          { href: "/admin/management", label: "Quản lí" },
        ]}
      />
      <Separator />
      <section>
        <Heading>Quản lí</Heading>
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
  );
}

const dashboardNavItems = [
  {
    href: "/admin/management/users",
    icon: Users2Icon,
    title: "Tài khoản người dùng",
    description: "Thiết lập tài khoản của người dùng",
  },
  {
    href: "/admin/management/courses",
    icon: LibraryIcon,
    title: "Khóa học",
    description: "Quản lí các khóa học hiện tại",
  },
];
