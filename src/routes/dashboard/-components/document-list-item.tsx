import { DownloadIcon } from "lucide-react";
import type { StudentCourseDetail } from "@/queries/courses";

interface DocumentListItemProps {
  document: StudentCourseDetail["documents"][number];
}

export function DocumentListItem({ document }: DocumentListItemProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-md border p-4 md:flex-row md:items-center">
      <div className="flex flex-col items-start gap-2 text-lg font-medium md:flex-row md:items-center">
        <span className="bg-primary/10 text-primary flex h-10 w-34 items-center justify-center rounded-sm font-semibold text-nowrap uppercase">
          {document.id}
        </span>
        <span className="max-w-[80vw] truncate md:max-w-[500px]">
          {document.file_name}
        </span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <a href={document.file_url} target="_blank">
          <div className="text-primary hover:text-primary/70 flex items-center gap-2 uppercase">
            <DownloadIcon size={18} />
            {document.file_type}
          </div>
        </a>
      </div>
    </div>
  );
}
