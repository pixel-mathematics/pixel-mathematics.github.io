import { differenceInCalendarDays } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  PaperclipIcon,
  DownloadIcon,
} from "lucide-react"
import { formatDate } from "@/lib/utils"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { useState } from "react"
import type { Chapter, Course, LessonWithAttachments } from "@/types"

interface Props {
  lesson: LessonWithAttachments
  chapter: Pick<Chapter, "id" | "title">
  course: Pick<Course, "id" | "title">
}
export function LessonListItem({ lesson, chapter, course }: Props) {
  const url = new URL(window.location.href)
  const lesson_id = url.searchParams.get("lesson_id")
  const [open, setOpen] = useState(lesson.id === lesson_id)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open && lesson_id) {
      const url = new URL(window.location.href)
      url.searchParams.delete("lesson_id")
      window.history.pushState({}, "", url.toString())
    } else {
      const url = new URL(window.location.href)
      url.searchParams.set("chapter_id", chapter.id)
      url.searchParams.set("lesson_id", lesson.id)
      window.history.pushState({}, "", url.toString())
    }
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} swipeDirection="right">
      <DrawerTrigger>
        <div className="flex flex-col items-start gap-2 rounded-md border px-3 py-2.5 text-base md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
            <span className="flex h-6 w-20 items-center justify-center rounded-sm bg-primary/10 px-2 text-sm font-semibold text-nowrap text-primary uppercase">
              {lesson.id}
            </span>
            <span className="max-w-[80vw] truncate text-left md:max-w-[500px]">
              {lesson.title}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-1 text-foreground/60">
              <PaperclipIcon size={16} />
              <span>{lesson.lesson_attachments.length}</span>
            </div>
            {lesson.deadline >= new Date() && (
              <div className="flex items-center gap-1 text-destructive">
                <HourglassIcon size={16} />
              </div>
            )}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex flex-col items-start gap-2">
              <div className="flex h-6 w-20 items-center justify-center rounded-sm bg-primary/10 px-2 text-sm font-semibold text-primary uppercase">
                {lesson.id}
              </div>
              <div className="self-stretch truncate text-lg">
                {lesson.title}
              </div>
            </div>
          </DrawerTitle>
          <DrawerDescription>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                Khóa
                <div className="flex h-6 w-12 items-center justify-center rounded-sm bg-primary/10 text-sm font-semibold text-primary uppercase">
                  {course.id}
                </div>
              </div>
              <div className="flex items-center gap-1">
                Chương
                <div className="flex h-6 w-16 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground uppercase">
                  {chapter.id}
                </div>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4 text-base">
          <div className="rounded-md border border-primary p-4">
            <div className="mb-1 flex items-center gap-1 font-medium text-primary">
              <PaperclipIcon size={18} />
              <span>Tài liệu đính kèm</span>
            </div>
            <div className="ml-6 flex flex-col gap-1">
              {lesson.lesson_attachments.map((file) => (
                <div className="flex items-center gap-4" key={file.id}>
                  <span className="w-20">{file.file_name}</span>
                  <a href={file.file_url} target="_blank">
                    <button className="flex items-center gap-1 text-xs text-primary uppercase hover:text-primary/70">
                      <DownloadIcon size={16} />
                      {file.file_type}
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-primary p-4">
            <div className="mb-1 flex items-center gap-1 font-medium text-primary">
              <CalendarIcon size={18} />
              <span>Ngày học</span>
            </div>
            <div className="ml-6">
              {formatDate(lesson.class_date, "dd/MM/yyyy")}
            </div>
          </div>

          <div className="rounded-md border border-primary p-4">
            <div className="mb-1 flex items-center gap-1 font-medium text-primary">
              <ClockIcon size={18} />
              <span>Cập nhật lần cuối</span>
            </div>
            <div className="ml-6">
              {formatDate(lesson.updated_on, "dd/MM/yyyy")}
            </div>
          </div>
          {lesson.deadline >= new Date() && (
            <div className="rounded-md border border-destructive p-4">
              <div className="mb-1 flex items-center gap-1 font-medium text-destructive">
                <HourglassIcon size={18} />
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
  )
}
