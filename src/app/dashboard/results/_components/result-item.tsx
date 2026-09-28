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
    <div className="flex flex-col items-start gap-2 overflow-hidden rounded-md border p-2 md:flex-row md:items-center md:p-0 md:pr-3">
      <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
        <span className="bg-primary/10 text-primary flex h-7 w-22 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase md:h-12 md:rounded-none">
          {lesson.id}
        </span>
        <span className="block max-w-[80svw] truncate text-base text-nowrap md:max-w-[480px] lg:max-w-[720px]">
          {lesson.title}
        </span>
      </div>

      <div className="ml-0 flex items-center gap-2 md:ml-12">
        <div>
          Điểm: <span className="font-semibold">{getJudgementByScore(score).score.toFixed(2)}</span>
        </div>
        {"-"}
        <div>
          Đánh giá:{" "}
          <span className={cn("font-semibold", getJudgementByScore(score).className)}>
            {getJudgementByScore(score).text}
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Link
          href={`/dashboard/courses/${lesson.chapter?.course?.id}/lessons?chapterId=${lesson.chapter?.id}&lessonId=${lesson.id}`}
        >
          <Button variant="link">Bài học</Button>
        </Link>
        <div className="text-muted-foreground flex items-center gap-1 text-sm md:text-base">
          <ClockIcon className="size-4.5" />
          <span>{formatDate(lesson.class_date)}</span>
        </div>
      </div>
    </div>
  );
}
