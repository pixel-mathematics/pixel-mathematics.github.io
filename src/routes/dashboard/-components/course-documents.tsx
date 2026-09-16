import type { StudentCourseDetail } from "@/queries/courses";
import { DocumentListItem } from "./document-list-item";

interface CourseDocumentsProps {
  documents: StudentCourseDetail["documents"];
}

export function CourseDocuments({ documents }: CourseDocumentsProps) {
  return documents.length > 0 ? (
    <div className="flex flex-col items-stretch gap-2">
      {documents.map((doc) => (
        <DocumentListItem key={doc.id} document={doc} />
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground p-4 text-base">
      Chưa cập nhật tài liệu.
    </p>
  );
}
