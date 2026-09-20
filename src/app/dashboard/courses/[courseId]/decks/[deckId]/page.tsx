import Link from "next/link";
import { getFlashcardDeckDetail } from "@/data/courses/queries";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";

import { FlashcardCarousel } from "./_components/flashcard-carousel";

export default async function DashboardStudyDeck({
  params,
}: {
  params: Promise<{ courseId: string; deckId: string }>;
}) {
  const { deckId } = await params;
  const deck = await getFlashcardDeckDetail(deckId);

  return (
    <section className="my-6">
      <Container>
        <Link href={`/dashboard/courses/${deck.course_id}/decks`}>
          <Button variant="link" className="px-0 hover:no-underline">
            <ChevronLeftIcon />
            Trở lại Bộ thẻ {deck.courses?.title}
          </Button>
        </Link>
        <Heading className="mt-4 text-center">{deck.title}</Heading>
        <div className="mx-auto max-w-full md:max-w-[768px]">
          <FlashcardCarousel deck={deck} />
        </div>
      </Container>
    </section>
  );
}
