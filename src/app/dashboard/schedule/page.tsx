import { getScheduleEvents } from "@/data/schedules/queries";

import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

import { CourseSchedule } from "./_components/course-schedule";

export default async function DashboardSchedulePage() {
  const scheduleEvents = await getScheduleEvents();

  return (
    <>
      <section>
        <Hero text="Thời khóa biểu" highlightText="PIXEL2027" />
      </section>
      <Container className="mt-6">
        <ReusableBreadcrumb
          items={[
            { href: "/dashboard", label: "Góc học tập" },
            { href: "/dashboard/schedule", label: "Thời khóa biểu" },
          ]}
        />
      </Container>
      <section className="mb-6">
        <Container className="mt-4">
          <div className="text-muted-foreground block text-center text-sm md:hidden">
            <p>Kéo sang trái/phải để xem</p>
            <p>Click để xem thông tin buổi học</p>
          </div>
        </Container>
        <CourseSchedule scheduleEvents={scheduleEvents} />
      </section>
    </>
  );
}
