import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative flex min-h-[25vh] items-center justify-center bg-[url('/hero.svg')] bg-cover md:min-h-[30vh]">
      <div className="mx-4 flex w-full flex-col items-center gap-4 text-center md:mx-0">
        <Skeleton className="flex w-1/3 items-center bg-slate-600 text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
          id
        </Skeleton>
        <Skeleton className="w-1/3 bg-slate-600 text-base text-transparent md:text-lg lg:text-xl">
          quote
        </Skeleton>
      </div>
    </div>
  );
}
