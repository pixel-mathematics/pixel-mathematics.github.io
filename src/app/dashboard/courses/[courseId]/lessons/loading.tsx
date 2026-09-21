import { Container } from "@/components/shared/container";
import { ChapterItemSkeleton } from "@/components/shared/reusable-skeletons";

export default function DashboardCourseLessonsLoading() {
  <Container className="mt-2">
    <div className="grid grid-cols-1 gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <ChapterItemSkeleton key={index} />
      ))}
    </div>
  </Container>;
}
