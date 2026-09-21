import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import {
  BreadcrumbSkeleton,
  HeadingSkeleton,
  HeroSkeleton,
  IconSkeleton,
} from "@/components/shared/reusable-skeletons";

export default function DashboardLoading() {
  return (
    <>
      <section className="w-full overflow-hidden">
        <HeroSkeleton />
      </section>
      <Container className="mt-6 flex flex-col gap-6">
        <BreadcrumbSkeleton />
        <section className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 md:size-16" />
            <div>
              <Skeleton className="w-[300px] text-lg font-medium text-transparent">
                Xin chào,
              </Skeleton>
              <Skeleton className="text-primary w-1/2 text-xl font-medium text-transparent">
                Họ và tên
              </Skeleton>
            </div>
          </div>
          <Skeleton className="h-9 w-sm max-w-sm" />
        </section>
        <Separator />
        <section>
          <HeadingSkeleton />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border-primary flex items-center gap-4 rounded-xl border-2 p-4"
              >
                <div className="text-primary bg-primary/10 grid aspect-[1/1] size-16 place-items-center rounded-xl md:size-20">
                  <IconSkeleton />
                </div>
                <div className="w-full min-w-0">
                  <Skeleton className="bg-primary/30 w-1/2 text-lg font-medium text-transparent md:text-xl">
                    title
                  </Skeleton>
                  <Skeleton className="mt-0 w-full truncate text-transparent md:mt-1">
                    description
                  </Skeleton>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
