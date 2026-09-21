import { Container } from "@/components/shared/container";
import {
  BreadcrumbSkeleton,
  CourseCardSkeleton,
  HeadingSkeleton,
  HeroSkeleton,
} from "@/components/shared/reusable-skeletons";

export default function DashboardCoursesLoading() {
  return (
    <>
      <section className="w-full overflow-hidden">
        <HeroSkeleton />
      </section>
      <Container className="mt-6">
        <BreadcrumbSkeleton />
      </Container>
      <section className="my-6">
        <Container>
          <HeadingSkeleton />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
