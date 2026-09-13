import { Link } from "@tanstack/react-router";
import { ClockIcon, KeyRoundIcon, ScrollTextIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { StudentRecentLesson } from "@/queries/courses";

interface RecentLessonItemProps {
  lesson: StudentRecentLesson;
}

export function RecentLessonItem({ lesson }: RecentLessonItemProps) {
  return (
    <Link
      to={`/dashboard/courses/${lesson.chapters.courses.id}?chapter_id=${lesson.chapters.id}&lesson_id=${lesson.id}`}
    >
      <div className="flex flex-col items-start gap-2 rounded-md border px-3 py-2.5 text-base md:flex-row md:items-center">
        <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
          <span className="bg-primary/10 text-primary flex h-6 w-20 items-center justify-center rounded-sm text-sm font-semibold text-nowrap uppercase">
            {lesson.id}
          </span>
          <span className="block max-w-[80vw] truncate text-nowrap md:max-w-[400px]">
            {lesson.title}
          </span>
        </div>
        <div className="ml-auto grid grid-cols-3 text-sm">
          <div className="text-primary flex items-center gap-1 font-medium uppercase">
            <KeyRoundIcon size={14} />
            {lesson.chapters.courses.id}
          </div>
          <div className="flex items-center gap-1 font-medium text-pink-700 uppercase">
            <ScrollTextIcon size={14} />
            {lesson.chapters.id}
          </div>
          <div className="text-foreground/60 flex items-center gap-1">
            <ClockIcon size={14} />
            <span>{formatDate(lesson.updated_on)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
