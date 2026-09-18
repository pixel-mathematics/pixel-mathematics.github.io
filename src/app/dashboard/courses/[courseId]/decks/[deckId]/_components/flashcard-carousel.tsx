import type { FlashcardDeckDetail } from "@/data/courses/queries";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Flashcard } from "./flashcard";

interface FlashcardCarouselProps {
  deck: FlashcardDeckDetail;
}

export function FlashcardCarousel({ deck }: FlashcardCarouselProps) {
  return (
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
  );
}
