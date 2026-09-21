import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { BreadcrumbSkeleton, HeroSkeleton } from "@/components/shared/reusable-skeletons";

export function CourseHeaderSkeleton() {
  return (
    <>
      <section className="w-full overflow-hidden">
        <HeroSkeleton />
      </section>
      <Container className="mt-6">
        <BreadcrumbSkeleton />
      </Container>
      <Container>
        <div className="border-border my-4 flex h-10 items-center border-b">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-full flex-1 text-transparent">
              placeholder
            </Skeleton>
          ))}
        </div>
      </Container>
    </>
  );
}
