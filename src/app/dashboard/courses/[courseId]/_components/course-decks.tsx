import type { CourseDeck } from "@/data/courses/queries";

import { DeckItem } from "./deck-item";

interface CourseDecksProps {
  decks: CourseDeck[];
}

export function CourseDecks({ decks }: CourseDecksProps) {
  return decks.length > 0 ? (
    <div className="flex flex-col items-stretch gap-2">
      {decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground text-base">Chưa cập nhật bộ thẻ.</p>
  );
}
