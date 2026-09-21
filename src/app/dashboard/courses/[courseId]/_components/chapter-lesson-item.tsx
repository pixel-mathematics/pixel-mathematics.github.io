import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { CourseChapter } from "@/data/courses/queries";
import { differenceInCalendarDays } from "date-fns";
import { CalendarIcon, ClockIcon, DownloadIcon, HourglassIcon, PaperclipIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ChapterLessonItemProps {
  lesson: CourseChapter["lessons"][number];
  chapter: Pick<CourseChapter, "id" | "title" | "course_id">;
}
export function ChapterLessonItem({ lesson, chapter }: ChapterLessonItemProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const [open, setOpen] = useState(lesson.id === lessonId);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    const params = new URLSearchParams(searchParams.toString());

    if (!open && lessonId) {
      params.delete("lessonId");
    } else {
      params.set("lessonId", lesson.id);
    }

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <div className="flex cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-md border p-2 text-base md:flex-row md:items-center md:p-0 md:pr-3">
          <div className="flex min-w-0 flex-col items-start gap-2 text-base font-medium md:flex-row md:items-center">
            <span className="bg-primary/10 text-primary flex h-7 w-20 items-center justify-center rounded-md text-sm text-nowrap uppercase md:h-11 md:rounded-none">
              {lesson.id}
            </span>
            <span className="truncate text-left text-nowrap">{lesson.title}</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {lesson.deadline && new Date(lesson.deadline) >= new Date() && (
              <div className="text-destructive flex items-center gap-1">
                <HourglassIcon className="size-4.5" />
                <span>{differenceInCalendarDays(lesson.deadline, new Date())} ngày</span>
              </div>
            )}
            <div className="text-muted-foreground flex items-center gap-1">
              <PaperclipIcon className="size-4.5" />
              <span>{lesson.lesson_attachments.length}</span>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="gap-0 md:w-[30vw]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex flex-col items-start gap-2">
              <div className="bg-primary/10 text-primary flex h-8 w-24 items-center justify-center rounded-sm font-semibold uppercase">
                {lesson.id}
              </div>
              <div className="self-stretch truncate text-base md:text-lg">{lesson.title}</div>
            </div>
          </SheetTitle>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              Khóa
              <div className="bg-primary/10 text-primary flex h-7 w-12 items-center justify-center rounded-sm font-semibold uppercase">
                {chapter.course_id}
              </div>
            </div>
            <div className="flex items-center gap-2">
              Chương
              <div className="bg-primary text-primary-foreground flex h-7 w-16 items-center justify-center rounded-sm text-sm font-semibold uppercase">
                {chapter.id}
              </div>
            </div>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 text-base">
          <div className="border-border rounded-md border p-4">
            <div className="text-primary mb-1 flex items-center gap-1 font-medium">
              <PaperclipIcon className="size-4.5" />
              <span>Tài liệu đính kèm</span>
            </div>
            <div className="ml-6 flex flex-col gap-2">
              {lesson.lesson_attachments.map((file) => (
                <div className="flex items-center gap-4" key={file.id}>
                  <span className="w-20">{file.file_name}</span>
                  <a href={file.file_url} target="_blank">
                    <button className="text-primary hover:text-primary/70 flex items-center gap-1 text-sm font-medium uppercase">
                      <DownloadIcon size={18} />
                      {file.file_type}
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="border-border rounded-md border p-4">
            <div className="text-primary mb-1 flex items-center gap-1 font-medium">
              <CalendarIcon className="size-4.5" />
              <span>Ngày học</span>
            </div>
            <div className="ml-6">{formatDate(lesson.class_date, "dd/MM/yyyy")}</div>
          </div>

          <div className="border-border rounded-md border p-4">
            <div className="text-primary mb-1 flex items-center gap-1 font-medium">
              <ClockIcon className="size-4.5" />
              <span>Cập nhật lần cuối</span>
            </div>
            <div className="ml-6">{formatDate(lesson.updated_on, "dd/MM/yyyy")}</div>
          </div>
          {lesson.deadline && new Date(lesson.deadline) >= new Date() && (
            <div className="border-destructive rounded-md border p-4">
              <div className="text-destructive mb-1 flex items-center gap-1 font-medium">
                <HourglassIcon className="size-4.5" />
                <span>Hạn cuối</span>
              </div>
              <div className="ml-6">
                <span>{formatDate(lesson.deadline, "dd/MM/yyyy")}</span>{" "}
                <span>({differenceInCalendarDays(lesson.deadline, new Date())} ngày)</span>
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Trở lại</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
