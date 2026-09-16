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
      <div className="flex flex-col items-start gap-2 rounded-md border p-3 md:flex-row md:items-center">
        <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
          <span className="bg-primary/10 text-primary flex h-8 w-26 items-center justify-center rounded-sm text-base font-semibold text-nowrap uppercase">
            {lesson.id}
          </span>
          <span className="block max-w-[80vw] truncate text-base text-nowrap md:max-w-[480px] md:text-lg lg:max-w-[720px]">
            {lesson.title}
          </span>
        </div>
        <div className="ml-auto">
          <div className="text-foreground/60 flex items-center gap-1">
            <ClockIcon size={20} />
            <span>{formatDate(lesson.updated_on)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
