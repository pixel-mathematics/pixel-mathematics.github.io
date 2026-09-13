import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { fetchScheduleEventsQueryOptions } from "@/queries/schedules";
import { CourseSchedule } from "./-components/course-schedule";

export const Route = createFileRoute("/dashboard/schedule")({
  loader: async ({ context }) => {
    const events = await context.queryClient.query(
      fetchScheduleEventsQueryOptions
    );
    return { events };
  },
  component: DashboardSchedule,
});

function DashboardSchedule() {
  const { events } = Route.useLoaderData();

  return (
    <section className="mt-6">
      <Container className="block text-center md:hidden">
        Kéo/cuộn sang trái/phải và click để xem thông tin buổi học
      </Container>
      <CourseSchedule scheduleEvents={events} />
    </section>
  );
}
