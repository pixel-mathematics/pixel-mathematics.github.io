import { Container } from "@/components/shared/container";
import {
  BreadcrumbSkeleton,
  HeroSkeleton,
  ScheduleSkeleton,
} from "@/components/shared/reusable-skeletons";

export default function DashboardScheduleLoading() {
  return (
    <>
      <section>
        <HeroSkeleton />
      </section>
      <Container className="mt-6">
        <BreadcrumbSkeleton />
      </Container>
      <section className="mb-6">
        <Container className="mt-4">
          <div className="text-muted-foreground block text-center text-sm md:hidden">
            <p>Kéo sang trái/phải để xem</p>
            <p>Click để xem thông tin buổi học</p>
          </div>
        </Container>
        <ScheduleSkeleton />
      </section>
    </>
  );
}
