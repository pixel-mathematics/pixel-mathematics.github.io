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

interface Props {
  lesson_id?: string | null
  lesson: {
    id: string
    title: string
    class_date: Date
    updated_at: Date
    due_date: Date
    lesson_attachments: {
      id: string
      file_name: string
      file_url: string
      file_type?: string
    }[]
  }
  chapter: { id: string; title: string }
  course: { id: string; title: string }
}
export function LessonListItem({ lesson_id, lesson, chapter, course }: Props) {
  const [open, setOpen] = useState(lesson_id === lesson.id)

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
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      swipeDirection="right"
      key={lesson.id}
    >
      <DrawerTrigger className="odd:bg-primary/5">
        <div className="flex items-center rounded-md border px-3 py-2.5 text-base">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-6 items-center rounded-sm bg-primary/10 px-2 text-sm font-semibold text-primary uppercase">
              {lesson.id}
            </span>
            <span>{lesson.title}</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-1 text-foreground/60">
              <PaperclipIcon size={16} />
              <span>{lesson.lesson_attachments.length}</span>
            </div>
            {lesson.due_date >= new Date() && (
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
              <div className="inline-block h-6.5 rounded-sm bg-primary/10 px-2 text-base font-semibold text-primary uppercase">
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
                <div className="flex h-6 items-center rounded-sm bg-primary/10 px-1.5 text-sm font-semibold text-primary uppercase">
                  {course.id}
                </div>
              </div>
              <div className="flex items-center gap-1">
                Chương
                <div className="flex h-6 items-center rounded-sm bg-primary px-1.5 text-sm font-semibold text-primary-foreground uppercase">
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
            <div className="ml-6 flex flex-col">
              {lesson.lesson_attachments.map((file) => (
                <div className="flex items-center gap-4" key={file.id}>
                  <span>{file.file_name}</span>
                  <a href={file.file_url} target="_blank">
                    <div className="flex items-center gap-1 text-xs text-primary uppercase hover:text-primary/70">
                      <DownloadIcon size={16} />
                      {file.file_type}
                    </div>
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
              {formatDate(lesson.updated_at, "dd/MM/yyyy")}
            </div>
          </div>
          {lesson.due_date >= new Date() && (
            <div className="rounded-md border border-destructive p-4">
              <div className="mb-1 flex items-center gap-1 font-medium text-destructive">
                <HourglassIcon size={18} />
                <span>Hạn cuối BTVN</span>
              </div>
              <div className="ml-6">
                <span>{formatDate(lesson.due_date, "dd/MM/yyyy")}</span>{" "}
                <span>
                  (Còn {differenceInCalendarDays(lesson.due_date, new Date())}{" "}
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
