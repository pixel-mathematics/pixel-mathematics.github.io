import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchFlashcardDeckDetailQueryOptions } from "@/queries/courses";
import { Flashcard } from "./-components/flashcard";

export const Route = createFileRoute("/dashboard/study/decks/$deckId")({
  loader: async ({ params, context }) => {
    const deck = await context.queryClient.query(
      fetchFlashcardDeckDetailQueryOptions(params.deckId)
    );

    return { deck };
  },
  component: DashboardStudyDeck,
});

function DashboardStudyDeck() {
  const { deck } = Route.useLoaderData();

  return (
    <>
      <section>
        <Hero
          text="Bộ thẻ"
          highlightText={deck.title}
          quote={deck.description ?? ""}
        />
      </section>
      <section className="mt-6">
        <Container>
          <div className="mx-auto max-w-full md:max-w-[768px]">
            <Carousel>
              <CarouselContent>
                {deck.flashcards.map((fc) => (
                  <CarouselItem key={fc.id}>
                    <Flashcard flashcard={fc} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </Container>
      </section>
    </>
  );
}
