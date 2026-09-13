import { DownloadIcon } from "lucide-react";
import type { StudentCourseDetail } from "@/queries/courses";

interface DocumentListItemProps {
  document: StudentCourseDetail["documents"][number];
}

export function DocumentListItem({ document }: DocumentListItemProps) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-md border px-3 py-2.5 text-base md:flex-row md:items-center">
      <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
        <span className="bg-primary/10 text-primary flex h-6 items-center rounded-sm px-2 text-sm font-semibold text-nowrap uppercase">
          {document.id}
        </span>
        <span>{document.file_name}</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <a href={document.file_url} target="_blank">
          <div className="text-primary hover:text-primary/70 flex items-center gap-1 text-xs uppercase">
            <DownloadIcon size={16} />
            {document.file_type}
          </div>
        </a>
      </div>
    </div>
  );
}
