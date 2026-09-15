import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { differenceInCalendarDays } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  HourglassIcon,
  PaperclipIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { formatDate } from "@/lib/utils";
import type { StudentCourseDetail } from "@/queries/courses";

interface ChapterLessonListItemProps {
  lesson: StudentCourseDetail["chapters"][number]["lessons"][number];
  chapter: Pick<
    StudentCourseDetail["chapters"][number],
    "id" | "title" | "course_id"
  >;
}
export function ChapterLessonListItem({
  lesson,
  chapter,
}: ChapterLessonListItemProps) {
  const search = useSearch({ from: "/dashboard/courses/$courseId" });
  const navigate = useNavigate({ from: "/dashboard/courses/$courseId" });
  const [open, setOpen] = useState(lesson.id === search.lessonId);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open && search.lessonId) {
      navigate({
        search: (prev) => ({
          ...prev,
          lessonId: undefined,
        }),
        resetScroll: false,
        replace: true,
      });
    } else {
      navigate({
        search: (prev) => ({
          ...prev,
          ...search,
        }),
        resetScroll: false,
        replace: true,
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} swipeDirection="right">
      <DrawerTrigger>
        <div className="flex cursor-pointer flex-col items-start gap-4 rounded-md border p-4 text-base md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
            <span className="bg-primary/10 text-primary flex h-8 w-26 items-center justify-center rounded-sm text-lg font-semibold text-nowrap uppercase">
              {lesson.id}
            </span>
            <span className="max-w-[80vw] truncate text-left text-lg md:max-w-[500px]">
              {lesson.title}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-foreground/60 flex items-center gap-1">
              <PaperclipIcon size={20} />
              <span>{lesson.lesson_attachments.length}</span>
            </div>
            {lesson.deadline && new Date(lesson.deadline) >= new Date() && (
              <div className="text-destructive flex items-center gap-1">
                <HourglassIcon size={20} />
              </div>
            )}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="md:w-[30vw]">
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex flex-col items-start gap-2">
              <div className="bg-primary/10 text-primary flex h-8 w-26 items-center justify-center rounded-sm font-semibold uppercase">
                {lesson.id}
              </div>
              <div className="self-stretch truncate text-xl">
                {lesson.title}
              </div>
            </div>
          </DrawerTitle>
          <DrawerDescription>
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
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4 text-base">
          <div className="border-border rounded-md border p-4">
            <div className="text-primary mb-2 flex items-center gap-2 text-lg font-medium">
              <PaperclipIcon size={20} />
              <span>Tài liệu đính kèm</span>
            </div>
            <div className="ml-7 flex flex-col gap-2">
              {lesson.lesson_attachments.map((file) => (
                <div className="flex items-center gap-4" key={file.id}>
                  <span className="w-20">{file.file_name}</span>
                  <a href={file.file_url} target="_blank">
                    <button className="text-primary hover:text-primary/70 flex items-center gap-2 font-medium uppercase">
                      <DownloadIcon size={20} />
                      {file.file_type}
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="border-border rounded-md border p-4">
            <div className="text-primary mb-2 flex items-center gap-2 text-lg font-medium">
              <CalendarIcon size={20} />
              <span>Ngày học</span>
            </div>
            <div className="ml-7">
              {formatDate(lesson.class_date, "dd/MM/yyyy")}
            </div>
          </div>

          <div className="border-border rounded-md border p-4">
            <div className="text-primary mb-2 flex items-center gap-2 text-lg font-medium">
              <ClockIcon size={20} />
              <span>Cập nhật lần cuối</span>
            </div>
            <div className="ml-7">
              {formatDate(lesson.updated_on, "dd/MM/yyyy")}
            </div>
          </div>
          {lesson.deadline && new Date(lesson.deadline) >= new Date() && (
            <div className="border-destructive rounded-md border p-4">
              <div className="text-destructive mb-1 flex items-center gap-1 text-lg font-medium">
                <HourglassIcon size={20} />
                <span>Hạn cuối BTVN</span>
              </div>
              <div className="ml-6">
                <span>{formatDate(lesson.deadline, "dd/MM/yyyy")}</span>{" "}
                <span>
                  (Còn {differenceInCalendarDays(lesson.deadline, new Date())}{" "}
                  ngày)
                </span>
              </div>
            </div>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Trở lại
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
