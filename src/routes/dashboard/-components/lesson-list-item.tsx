import { Link } from "@tanstack/react-router";
import { ClockIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { StudentLesson } from "@/queries/courses";

interface LessonListItemProps {
  lesson: StudentLesson;
}

export function LessonListItem({ lesson }: LessonListItemProps) {
  return (
    <Link
      to="/dashboard/courses/$courseId"
      params={{
        courseId: lesson.chapters.courses.id,
      }}
      search={{
        chapterId: lesson.chapters.id,
        lessonId: lesson.id,
      }}
    >
      <div className="flex flex-col items-start gap-2 overflow-hidden rounded-md border p-2 md:flex-row md:items-center md:p-0 md:pr-3">
        <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
          <span className="bg-primary/10 text-primary flex h-7 w-22 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase md:h-12 md:rounded-none">
            {lesson.id}
          </span>
          <span className="block max-w-[80svw] truncate text-base text-nowrap md:max-w-[480px] lg:max-w-[720px]">
            {lesson.title}
          </span>
        </div>
        <div className="ml-auto">
          <div className="text-muted-foreground flex items-center gap-1 text-sm md:text-base">
            <ClockIcon className="size-4.5" />
            <span>{formatDate(lesson.updated_on)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
