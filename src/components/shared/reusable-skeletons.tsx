import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HeadingSkeleton() {
  return null;
}

export function CourseCardSkeleton() {
  return (
    <Card className="border-border border-1">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-transparent">
          <Skeleton className="w-1/2">title</Skeleton>
        </CardTitle>
        <CardDescription className="text-lg text-transparent">
          <Skeleton>description</Skeleton>
        </CardDescription>
      </CardHeader>
      <CardFooter className="text-base">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Skeleton className="w-[60px] text-transparent uppercase">icon</Skeleton>
            <Skeleton className="w-[120px] text-transparent uppercase">icon</Skeleton>
          </div>
          <div>
            <Skeleton className="w-[120px] text-transparent uppercase">icon</Skeleton>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function CourseDetailSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-12 w-[200px]" />
        <div className="flex-1">
          <div className="flex flex-col">
            {Array.from({ length: 12 }, (_, i) => i).map((i) => (
              <div key={i} className="flex items-center py-4 not-last:border-b">
                <div
                  className="flex flex-col items-start gap-2 md:flex-row md:items-center"
                  key={i}
                >
                  <Skeleton className="h-8 w-22 rounded-sm text-lg font-medium text-nowrap text-transparent uppercase">
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
