import { Skeleton } from "@/components/ui/skeleton";

export function LessonListItemSkeleton() {
  return (
    <div className="flex flex-col items-start gap-2 rounded-md border p-3 md:flex-row md:items-center">
      <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
        <Skeleton className="flex h-8 w-26 items-center justify-center rounded-sm font-semibold text-nowrap text-transparent uppercase">
          id
        </Skeleton>
        <Skeleton className="block w-[600px] max-w-[80vw] truncate text-lg text-nowrap text-transparent md:max-w-[480px] lg:max-w-[720px]">
          title
        </Skeleton>
      </div>
      <div className="ml-auto">
        <Skeleton className="w-[120px] text-transparent">icon</Skeleton>
      </div>
    </div>
  );
}
