import { getFlashcardDeckDetail } from "@/data/courses/queries";

import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

import { FlashcardCarousel } from "./_components/flashcard-carousel";

export default async function DashboardStudyDeck({
  params,
}: {
  params: Promise<{ courseId: string; deckId: string }>;
}) {
  const { deckId } = await params;
  const deck = await getFlashcardDeckDetail(deckId);

  return (
    <>
      <section>
        <Hero text="Bộ thẻ" highlightText={deck.title} quote={deck.description ?? ""} />
      </section>
      <Container className="mt-6">
        <ReusableBreadcrumb
          items={[
            { href: "/dashboard", label: "Góc học tập" },
            { href: `/dashboard/courses/${deck.course_id}`, label: deck.courses?.title ?? "" },
            {
              href: `/dashboard/courses/${deck.course_id}/decks/${deck.id}`,
              label: `Bộ thẻ ${deck.title}`,
            },
          ]}
        />
      </Container>

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
