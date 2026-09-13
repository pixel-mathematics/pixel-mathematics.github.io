import { useMemo, useState } from "react";
import Fuse from "fuse.js/min-basic";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { StudentLesson } from "@/queries/courses";
import { LessonListItem } from "./lesson-list-item";

interface Props {
  data: {
    lessons: StudentLesson[];
  };
}

export function Search({ data: { lessons } }: Props) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fuseLessons = useMemo(
    () =>
      new Fuse(lessons, {
        keys: ["id"],
        ignoreLocation: true,
        minMatchCharLength: 2,
        threshold: 0.3,
      }),
    [lessons]
  );

  const searchResults = useMemo(() => {
    if (!keyword) return { lessons: [] };
    return {
      lessons: fuseLessons.search(keyword).map((result) => result.item),
    };
  }, [keyword, fuseLessons]);

  function handleSearchInputChange(value: string) {
    setKeyword(value);
  }

  return (
    <div>
      <Button
        size="lg"
        variant="ghost"
        className="px-0 text-lg md:px-3"
        onClick={() => {
          setOpen(true);
          setKeyword("");
        }}
      >
        <SearchIcon className="size-7 md:size-5" />
        <span className="hidden md:inline">Tìm kiếm</span>
      </Button>
      <CommandDialog
        className="top-[96px] min-w-full p-2 md:min-w-[960px]"
        open={open}
        onOpenChange={setOpen}
      >
        <Command>
          <CommandInput
            className="text-base"
            placeholder="Tìm mã bài học..."
            onValueChange={handleSearchInputChange}
          />
          <CommandList>
            <CommandGroup
              heading="Bài học"
              className="**:[[cmdk-group-heading]]:text-base"
            >
              <CommandEmpty className="text-lg">
                Không tìm thấy kết quả nào.
              </CommandEmpty>
              {searchResults?.lessons.map((lesson) => (
                <CommandItem
                  key={lesson.id}
                  value={lesson.id}
                  onSelect={() => {
                    setOpen(false);
                  }}
                  className="data-selected:bg-background grid grid-cols-1 gap-0 p-0 text-base"
                >
                  <LessonListItem lesson={lesson} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
