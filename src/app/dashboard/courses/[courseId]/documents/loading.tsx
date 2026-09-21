import { Container } from "@/components/shared/container";
import { DocumentItemSkeleton } from "@/components/shared/reusable-skeletons";

export default function DashboardCourseDocumentsLoading() {
  <Container className="mt-2">
    <div className="grid grid-cols-1 gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <DocumentItemSkeleton key={index} />
      ))}
    </div>
  </Container>;
}
