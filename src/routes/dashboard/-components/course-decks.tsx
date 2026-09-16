import type { StudentCourseDetail } from "@/queries/courses";
import { DeckListItem } from "./deck-list-item";

interface CourseDecksProps {
  decks: StudentCourseDetail["flashcard_decks"];
}

export function CourseDecks({ decks }: CourseDecksProps) {
  return decks.length > 0 ? (
    <div className="flex flex-col items-stretch gap-2">
      {decks.map((deck) => (
        <DeckListItem key={deck.id} deck={deck} />
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground p-4 text-base">Chưa cập nhật bộ thẻ.</p>
  );
}
