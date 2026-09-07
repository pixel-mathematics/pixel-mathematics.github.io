import type { Document } from "@/types"
import { DownloadIcon } from "lucide-react"

interface Props {
  document: Document
}

export function DocumentListItem({ document }: Props) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-md border px-3 py-2.5 text-base md:flex-row md:items-center">
      <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
        <span className="flex h-6 items-center rounded-sm bg-primary/10 px-2 text-sm font-semibold text-nowrap text-primary uppercase">
          {document.id}
        </span>
        <span>{document.file_name}</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <a href={document.file_url} target="_blank">
          <div className="flex items-center gap-1 text-xs text-primary uppercase hover:text-primary/70">
            <DownloadIcon size={16} />
            {document.file_type}
          </div>
        </a>
      </div>
    </div>
  )
}
