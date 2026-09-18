import Link from "next/link";
import type { StudentCourseDetail } from "@/data/courses/queries";
import { PlayingCardsFanIcon } from "lucide-react";

interface DeckItemProps {
  deck: StudentCourseDetail["flashcard_decks"][number];
}

export function DeckItem({ deck }: DeckItemProps) {
  return (
    <Link href={`/dashboard/courses/${deck.course_id}/decks/${deck.id}`}>
      <div className="flex cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-md border p-2 text-base md:flex-row md:items-center md:p-0 md:pr-3">
        <div className="flex flex-col items-start gap-2 text-base font-medium md:flex-row md:items-center">
          <span className="bg-primary/10 text-primary flex h-7 w-22 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase md:h-11 md:rounded-none">
            {deck.id}
          </span>
          <span className="max-w-[80svw] truncate text-left text-nowrap md:max-w-[480px] lg:max-w-[720px]">
            {deck.title}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-muted-foreground flex items-center gap-1">
            <PlayingCardsFanIcon className="size-4.5" />
            <span>{deck.flashcards[0].count}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
