import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <Card className="border-border border-1">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-transparent uppercase">
          <Skeleton className="w-1/2">title</Skeleton>
        </CardTitle>
        <CardDescription className="text-lg text-transparent">
          <Skeleton>description</Skeleton>
        </CardDescription>
      </CardHeader>
      <CardFooter className="text-base">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Skeleton className="w-[60px] text-transparent uppercase">
              icon
            </Skeleton>
            <Skeleton className="w-[120px] text-transparent uppercase">
              icon
            </Skeleton>
          </div>
          <div>
            <Skeleton className="w-[120px] text-transparent uppercase">
              icon
            </Skeleton>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
