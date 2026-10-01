import Link from "next/link";
import { getCourses } from "@/data/courses/admin-queries";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function DemoPage() {
  const courses = await getCourses();

  return (
    <Container className="mt-6 flex flex-col gap-6">
      <ReusableBreadcrumb
        items={[
          { href: "/admin", label: "Bảng điều khiển" },
          { href: "/admin/management", label: "Quản lí" },
          { href: "/admin/management/courses", label: "Khóa học" },
        ]}
      />
      <Separator />
      <section>
        <div className="flex items-center justify-between">
          <Heading>Quản lí khóa học</Heading>
          <div>
            <Link href={`/admin/management/courses/create`}>
              <Button>
                <PlusIcon /> Tạo khóa học
              </Button>
            </Link>
          </div>
        </div>
        <DataTable columns={columns} data={courses} />
      </section>
    </Container>
  );
}
