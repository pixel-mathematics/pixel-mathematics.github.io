import { Fragment } from "react/jsx-runtime";

import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative flex min-h-[20vh] items-center justify-center bg-[url('/hero.svg')] bg-cover md:min-h-[30vh]">
      <div className="mx-4 flex w-full flex-col items-center gap-1 text-center md:mx-0 md:gap-4">
        <Skeleton className="bg-primary/50 w-1/2 text-2xl font-bold text-transparent sm:text-3xl md:w-1/4 md:text-4xl">
          Pixel Mathematics
        </Skeleton>
        <Skeleton className="w-2/3 bg-slate-600 text-transparent md:w-1/3 md:text-lg">
          quote
        </Skeleton>
      </div>
    </div>
  );
}

export function HeadingSkeleton() {
  return (
    <Skeleton className="bg-primary/30 mb-2 w-[300px] text-xl font-bold text-transparent">
      heading
    </Skeleton>
  );
}

export function IconSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("size-4.5", className)} />;
}

export function CourseCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-1/3 text-lg font-bold text-transparent duration-300 md:text-xl">
          title
        </Skeleton>
        <Skeleton className="w-full text-base text-transparent">description</Skeleton>
      </CardHeader>
      <CardFooter>
        <div className="flex w-full items-center justify-between text-base">
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-1 font-medium uppercase">
              <IconSkeleton />
              <Skeleton className="w-[80px] text-transparent">id</Skeleton>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <IconSkeleton />
              <Skeleton className="w-[120px] text-transparent">subject</Skeleton>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function LessonItemSkeleton() {
  return (
    <div className="flex flex-col items-start gap-2 overflow-hidden rounded-md border p-2 md:flex-row md:items-center md:p-0 md:pr-3">
      <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
        <div className="bg-primary/10 flex h-7 w-22 items-center justify-center rounded-md text-sm font-semibold text-nowrap text-transparent uppercase md:h-12 md:rounded-none">
          <Skeleton className="bg-primary/30">T06-A01</Skeleton>
        </div>
        <Skeleton className="block w-[600px] max-w-[80svw] text-base text-nowrap text-transparent md:max-w-[480px] lg:max-w-[720px]">
          title
        </Skeleton>
      </div>
      <div className="ml-auto">
        <div className="flex items-center gap-1 text-sm text-transparent md:text-base">
          <IconSkeleton />
          <Skeleton>02/09/2026</Skeleton>
        </div>
      </div>
    </div>
  );
}

export function ChapterItemSkeleton() {
  return (
    <div className="border-primary/30 relative flex cursor-pointer items-center justify-between overflow-hidden rounded-md border p-2 hover:no-underline md:p-0 md:pr-3">
      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
        <div className="bg-primary flex h-7 w-18 items-center justify-center rounded-md text-sm font-medium text-nowrap text-transparent uppercase md:h-11 md:rounded-none">
          <Skeleton className="bg-primary-foreground/30">T09-A</Skeleton>
        </div>
        <Skeleton className="bg-primary/10 w-[600px] max-w-[80svw] truncate text-left text-base font-medium text-nowrap text-transparent md:max-w-[480px] lg:max-w-[720px]">
          title
        </Skeleton>
      </div>
      <IconSkeleton />
    </div>
  );
}

export function DeckItemSkeleton() {
  return (
    <div className="flex cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-md border p-2 text-base md:flex-row md:items-center md:p-0 md:pr-3">
      <div className="flex flex-col items-start gap-2 text-base font-medium md:flex-row md:items-center">
        <span className="bg-primary/10 flex h-7 w-22 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase md:h-11 md:rounded-none">
          <Skeleton className="bg-primary/30 text-transparent">T09-FD01</Skeleton>
        </span>
        <Skeleton className="w-[600px] max-w-[80svw] truncate text-left text-nowrap text-transparent md:max-w-[480px] lg:max-w-[720px]">
          title
        </Skeleton>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-1">
          <IconSkeleton />
          <Skeleton className="text-transparent">66</Skeleton>
        </div>
      </div>
    </div>
  );
}

export function DocumentItemSkeleton() {
  return (
    <div className="flex cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-md border p-2 text-base md:flex-row md:items-center md:p-0 md:pr-3">
      <div className="flex flex-col items-start gap-2 text-base font-medium md:flex-row md:items-center">
        <span className="bg-primary/10 flex h-7 w-22 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase md:h-11 md:rounded-none">
          <Skeleton className="bg-primary/30 text-transparent">T09-DOC01</Skeleton>
        </span>
        <Skeleton className="w-[600px] max-w-[80svw] truncate text-left text-nowrap text-transparent md:max-w-[480px] lg:max-w-[720px]">
          title
        </Skeleton>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-1">
          <IconSkeleton />
          <Skeleton className="text-transparent">PDF</Skeleton>
        </div>
      </div>
    </div>
  );
}

export function ScheduleSkeleton() {
  return (
    <div className="bg-background flex w-full flex-col space-y-4 rounded-md">
      {/* 2. Khung Lịch chính */}
      <div className="bg-background flex flex-col overflow-hidden rounded-md border">
        {/* Dòng tiêu đề các ngày trong tuần */}
        <div className="bg-muted/10 flex border-b">
          {/* Góc trống phía trên trục thời gian */}
          <div className="w-16 shrink-0 border-r" />

          {/* 7 Cột ngày */}
          <div className="grid flex-1 grid-cols-7 divide-x">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`header-${i}`}
                className="flex flex-col items-center justify-center gap-2 py-3"
              >
                <Skeleton className="h-4 w-[100px]" /> {/* Tên thứ (Mon, Tue...) */}
              </div>
            ))}
          </div>
        </div>

        {/* Phần lưới thời gian (TimeGrid) */}
        <div className="bg-background relative flex h-[600px] overflow-hidden">
          {/* Trục thời gian bên trái */}
          <div className="bg-muted/5 flex w-16 shrink-0 flex-col divide-y border-r">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`time-${i}`} className="flex h-16 items-start justify-center">
                <Skeleton className="mt-1 h-4 w-8" />
              </div>
            ))}
          </div>

          {/* Lưới các ngày và Sự kiện giả (Fake Events) */}
          <div className="relative grid flex-1 grid-cols-7 divide-x">
            {/* Các đường kẻ ngang (Grid lines) */}
            <div className="pointer-events-none absolute inset-0 flex flex-col divide-y">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={`line-${i}`} className="h-16 w-full" />
              ))}
            </div>

            {/* Cột dữ liệu của từng ngày */}
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div key={`day-${dayIndex}`} className="relative h-full">
                {/* 
                  Rải ngẫu nhiên một vài khối Skeleton để giả lập các lớp học/sự kiện đang load.
                  Sử dụng top và height tuyệt đối (dựa trên % hoặc rem) để đặt vị trí.
                */}
                {dayIndex === 1 && (
                  <Skeleton className="absolute top-[10%] right-1 left-1 h-[15%] rounded opacity-60" />
                )}
                {dayIndex === 2 && (
                  <Skeleton className="absolute top-[30%] right-1 left-1 h-[10%] rounded opacity-60" />
                )}
                {dayIndex === 4 && (
                  <>
                    <Skeleton className="absolute top-[20%] right-1 left-1 h-[25%] rounded opacity-60" />
                    <Skeleton className="absolute top-[50%] right-1 left-1 h-[15%] rounded opacity-60" />
                  </>
                )}
                {dayIndex === 5 && (
                  <Skeleton className="absolute top-[15%] right-1 left-1 h-[30%] rounded opacity-60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountSettingItemSkeleton() {
  return (
    <div className="border-border flex items-center gap-4 rounded-md border p-4 text-left">
      <IconSkeleton className="size-8" />
      <div className="w-full">
        <Skeleton className="bg-primary/30 w-1/2 font-medium text-transparent">
          setting item title
        </Skeleton>
        <Skeleton className="w-2/3 text-transparent">setting item description</Skeleton>
      </div>
    </div>
  );
}

export function BreadcrumbSkeleton() {
  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList className="text-primary gap-0.5 text-sm font-medium sm:gap-1 sm:text-base">
          {Array.from({ length: 2 }).map((_, index) => {
            const isLast = index === 1;

            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <Skeleton className="bg-primary/30 w-[120px] text-transparent">item</Skeleton>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex md:hidden">
        <Skeleton className="bg-primary/30 w-[120px] px-0 font-medium text-transparent hover:no-underline">
          button
        </Skeleton>
      </div>
    </>
  );
}
