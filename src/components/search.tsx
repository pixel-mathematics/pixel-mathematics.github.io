import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useMemo, useState } from "react"
import { SearchIcon } from "lucide-react"
import type { LessonWithCourseAndChapter } from "@/types"
import Fuse from "fuse.js/min-basic"
import { formatDate } from "@/lib/utils"
import { ScrollTextIcon, ClockIcon, KeyRoundIcon } from "lucide-react"

interface Props {
  data: {
    lessons: LessonWithCourseAndChapter[]
  }
}

export function Search({ data: { lessons } }: Props) {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState("")

  const fuseLessons = useMemo(
    () =>
      new Fuse(lessons, {
        keys: ["id"],
        ignoreLocation: true,
        minMatchCharLength: 2,
        threshold: 0.3,
      }),
    [lessons]
  )

  const searchResults = useMemo(() => {
    if (!keyword) return { lessons: [] }
    return { lessons: fuseLessons.search(keyword).map((result) => result.item) }
  }, [keyword, fuseLessons])

  function handleSearchInputChange(value: string) {
    setKeyword(value)
  }

  return (
    <div>
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-muted md:h-9 md:w-9"
        onClick={() => {
          setOpen(true)
          setKeyword("")
        }}
      >
        <SearchIcon className="size-6 md:size-[18px]" />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Tìm mã bài học..."
            onValueChange={handleSearchInputChange}
          />
          <CommandList>
            <CommandGroup heading="Bài học">
              <CommandEmpty className="text-lg">
                Không tìm thấy kết quả nào.
              </CommandEmpty>
              {searchResults?.lessons.map((lesson) => (
                <CommandItem
                  key={lesson.id}
                  value={lesson.id}
                  onSelect={() => {
                    setOpen(false)
                  }}
                  className="grid grid-cols-1 gap-0 p-0 data-selected:bg-white"
                >
                  <a
                    href={`/courses/${lesson.chapters.courses.id}?chapter_id=${lesson.chapters.id}&lesson_id=${lesson.id}`}
                    className="flex-1"
                  >
                    <div className="flex flex-col items-start gap-2 rounded-md border px-3 py-2.5 text-base md:flex-row md:items-center">
                      <div className="flex flex-col items-start gap-2 font-medium md:flex-row md:items-center">
                        <span className="flex h-6 w-20 items-center justify-center rounded-sm bg-primary/10 text-sm font-semibold text-nowrap text-primary uppercase">
                          {lesson.id}
                        </span>
                        <span className="block max-w-[80vw] truncate text-nowrap md:max-w-[400px]">
                          {lesson.title}
                        </span>
                      </div>
                      <div className="ml-auto grid grid-cols-3 text-sm">
                        <div className="flex items-center gap-1 font-medium text-primary uppercase">
                          <KeyRoundIcon size={14} />
                          {lesson.chapters.courses.id}
                        </div>
                        <div className="flex items-center gap-1 font-medium text-pink-700 uppercase">
                          <ScrollTextIcon size={14} />
                          {lesson.chapters.id}
                        </div>
                        <div className="flex items-center gap-1 text-foreground/60">
                          <ClockIcon size={14} />
                          <span>{formatDate(lesson.updated_on)}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
