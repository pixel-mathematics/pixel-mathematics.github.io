import { getScheduleEvents } from "@/data/schedules/queries";

import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";

import { CourseSchedule } from "./_components/course-schedule";

export default async function DashboardSchedulePage() {
  const scheduleEvents = await getScheduleEvents();

  return (
    <>
      <section>
        <Hero text="Thời khóa biểu" highlightText="PIXEL2027" />
      </section>
      <section className="my-6">
        <Container>
          <div className="text-muted-foreground block text-center md:hidden">
            <p>Kéo sang trái/phải để xem</p>
            <p>Click để xem thông tin buổi học</p>
          </div>
        </Container>
        <CourseSchedule scheduleEvents={scheduleEvents} />
      </section>
    </>
  );
}
