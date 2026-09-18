import type { StudentCourseDetail } from "@/data/courses/queries";
import { DownloadIcon } from "lucide-react";

interface DocumentItemProps {
  document: StudentCourseDetail["documents"][number];
}

export function DocumentItem({ document }: DocumentItemProps) {
  return (
    <div className="flex flex-col items-start gap-2 overflow-hidden rounded-md border p-2 md:flex-row md:items-center md:p-0 md:pr-3">
      <div className="flex flex-col items-start gap-2 text-base font-medium md:flex-row md:items-center">
        <span className="bg-primary/10 text-primary flex h-7 w-28 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase md:h-11 md:rounded-none">
          {document.id}
        </span>
        <span className="max-w-[80svw] truncate text-left text-nowrap md:max-w-[480px] lg:max-w-[720px]">
          {document.file_name}
        </span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <a href={document.file_url} target="_blank">
          <div className="text-primary hover:text-primary/70 flex items-center gap-2 font-medium uppercase">
            <DownloadIcon className="size-4.5" />
            {document.file_type}
          </div>
        </a>
      </div>
    </div>
  );
}
