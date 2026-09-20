import type { CourseDocument } from "@/data/courses/queries";

import { DocumentItem } from "./document-item";

interface CourseDocumentsProps {
  documents: CourseDocument[];
}

export function CourseDocuments({ documents }: CourseDocumentsProps) {
  return documents.length > 0 ? (
    <div className="flex flex-col items-stretch gap-2">
      {documents.map((doc) => (
        <DocumentItem key={doc.id} document={doc} />
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground text-base">Chưa cập nhật tài liệu.</p>
  );
}
