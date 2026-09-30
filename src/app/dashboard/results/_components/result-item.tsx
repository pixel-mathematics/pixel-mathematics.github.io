import Link from "next/link";
import type { StudentResult } from "@/data/results/queries";
import { ClockIcon } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ResultItemProps {
  result: StudentResult;
}

function getJudgementByScore(score: number) {
  if (score > 9) return { score, text: "Xuất sắc", className: "text-primary" };
  if (score > 7) return { score, text: "Tốt", className: "text-primary" };
  if (score > 5) return { score, text: "Đạt", className: "text-foreground" };
  return { score, text: "Chưa đạt", className: "text-destructive" };
}

export function ResultItem({ result: { score, lesson } }: ResultItemProps) {
  return (
    <div className="flex items-center justify-between overflow-hidden rounded-md border p-2 md:p-4">
      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
          <span className="bg-primary/10 text-primary flex h-7 w-22 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase">
            {lesson.id}
          </span>
          <span className="block truncate text-base text-nowrap">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-muted-foreground flex items-center gap-1 text-sm md:text-base">
            <ClockIcon className="size-4.5" />
            <span>{formatDate(lesson.class_date)}</span>
          </div>
          <Link
            href={`/dashboard/courses/${lesson.chapter?.course?.id}/lessons?chapterId=${lesson.chapter?.id}&lessonId=${lesson.id}`}
          >
            <Button variant="default" size="sm">
              Bài học
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-border grid grid-cols-1 overflow-hidden rounded-md border">
        <div
          className={cn(
            "px-4 py-2 text-xl font-semibold md:text-2xl lg:px-6",
            getJudgementByScore(score).className
          )}
        >
          {getJudgementByScore(score).score.toFixed(2)}
        </div>
        <div
          className={cn(
            "border-border border-t p-1 text-center text-sm",
            getJudgementByScore(score).className
          )}
        >
          {getJudgementByScore(score).text}
        </div>
      </div>
    </div>
  );
}
