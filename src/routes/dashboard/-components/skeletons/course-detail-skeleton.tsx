import { Skeleton } from "@/components/ui/skeleton";

export function CourseDetailSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-12 w-[200px]" />
        <div className="flex-1">
          <div className="flex flex-col">
            {Array.from({ length: 12 }, (_, i) => i).map((i) => (
              <div className="flex items-center py-4 not-last:border-b">
                <div
                  className="flex flex-col items-start gap-2 md:flex-row md:items-center"
                  key={i}
                >
                  <Skeleton className="h-8 w-22 rounded-sm text-lg font-semibold text-nowrap text-transparent uppercase">
                    id
                  </Skeleton>{" "}
                  <Skeleton className="w-[80vw] text-xl font-medium text-transparent md:w-[800px]">
                    title
                  </Skeleton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
