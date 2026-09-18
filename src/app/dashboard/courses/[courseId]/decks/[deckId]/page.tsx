import { getFlashcardDeckDetail } from "@/data/courses/queries";

import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";

import { FlashcardCarousel } from "./_components/flashcard-carousel";

export default async function DashboardStudyDeck({
  params,
}: {
  params: Promise<{ courseId: string; deckId: string }>;
}) {
  const { courseId, deckId } = await params;
  const deck = await getFlashcardDeckDetail(deckId);

  return (
    <>
      <section>
        <Hero text="Bộ thẻ" highlightText={deck.title} quote={deck.description ?? ""} />
      </section>
      <section className="mt-6">
        <Container>
          <div className="mx-auto max-w-full md:max-w-[768px]">
            <FlashcardCarousel deck={deck} />
          </div>
        </Container>
      </section>
    </>
  );
}
