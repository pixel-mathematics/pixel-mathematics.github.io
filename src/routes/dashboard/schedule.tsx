import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";
import { fetchScheduleEventsQueryOptions } from "@/queries/schedules";
import { CourseSchedule } from "./-components/course-schedule";
import { HeroSkeleton } from "./-components/skeletons/hero-skeleton";
import { ScheduleSkeleton } from "./-components/skeletons/schedule-skeleton";

export const Route = createFileRoute("/dashboard/schedule")({
  loader: async ({ context }) => {
    // await new Promise(() => {});
    const events = await context.queryClient.query(
      fetchScheduleEventsQueryOptions
    );
    return { events };
  },
  pendingMs: 0,
  pendingComponent: () => (
    <>
      <section>
        <HeroSkeleton />
      </section>
      <section className="my-6">
        <ScheduleSkeleton />
      </section>
    </>
  ),
  component: DashboardSchedule,
});

function DashboardSchedule() {
  const { events } = Route.useLoaderData();

  return (
    <>
      <section>
        <Hero text="Lịch học" highlightText="PIXEL2027" />
      </section>
      <section className="my-6">
        <Container>
          <div className="text-muted-foreground block text-center md:hidden">
            <p>Kéo sang trái/phải để xem</p>
            <p>Click để xem thông tin buổi học</p>
          </div>
        </Container>
        <CourseSchedule scheduleEvents={events} />
      </section>
    </>
  );
}
