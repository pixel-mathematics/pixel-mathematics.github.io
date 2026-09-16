import { Link } from "@tanstack/react-router";
import { PlayingCardsFanIcon } from "lucide-react";
import type { StudentCourseDetail } from "@/queries/courses";

interface DeckListItemProps {
  deck: StudentCourseDetail["flashcard_decks"][number];
}

export function DeckListItem({ deck }: DeckListItemProps) {
  return (
    <Link to="/dashboard/study/decks/$deckId" params={{ deckId: deck.id }}>
      <div className="flex flex-col items-start gap-4 rounded-md border p-3 md:flex-row md:items-center">
        <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
          <span className="bg-primary/10 text-primary flex h-8 w-32 items-center justify-center rounded-sm text-base font-semibold text-nowrap uppercase">
            {deck.id}
          </span>
          <span className="max-w-[80vw] truncate text-base md:max-w-[500px] md:text-lg">
            {deck.title}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-primary hover:text-primary/70 flex items-center gap-2 font-medium uppercase">
            <PlayingCardsFanIcon size={20} />
            {deck.flashcards[0].count}
          </div>
        </div>
      </div>
    </Link>
  );
}
