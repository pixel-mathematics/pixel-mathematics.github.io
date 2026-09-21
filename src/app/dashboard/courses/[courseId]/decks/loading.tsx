import { Container } from "@/components/shared/container";
import { DeckItemSkeleton } from "@/components/shared/reusable-skeletons";

export default function DashboardCourseDecksLoading() {
  <Container className="mt-2">
    <div className="grid grid-cols-1 gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <DeckItemSkeleton key={index} />
      ))}
    </div>
  </Container>;
}
