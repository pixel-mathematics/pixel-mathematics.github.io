"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/providers/dashboard-provider";
import Fuse from "fuse.js/min-basic";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Đóng dialog khi click ra ngoài vùng search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  const { lessons } = useDashboardContext();

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
    <>
      {/* 2. Container chính: Cần z-50 để nổi lên trên lớp nền mờ */}
      <div ref={containerRef} className="relative z-50 w-full max-w-sm">
        {/* Overflow-visible rất quan trọng để cái list kết quả tràn ra ngoài được */}
        <Command className="bg-background overflow-visible shadow-none">
          {/* Input search luôn giữ nguyên vị trí vật lý trên màn hình */}
          <CommandInput
            placeholder="Tìm kiếm mã bài học..."
            onFocus={() => setOpen(true)}
            onValueChange={handleSearchInputChange}
          />

          {/* 3. Box kết quả (Dialog) trượt xuống ngay bên dưới Input */}
          {open && (
            <div className="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-[calc(100%+8px)] left-0 w-full rounded-md border shadow-md outline-none">
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>

                <CommandGroup heading="Bài học">
                  {searchResults?.lessons.map((lesson) => (
                    <CommandItem
                      key={lesson.id}
                      value={lesson.id}
                      onSelect={() => {
                        setOpen(false);
                        router.push(
                          `/dashboard/courses/${lesson.chapters.courses.id}/lessons?chapterId=${lesson.chapter_id}&lessonId=${lesson.id}`
                        );
                      }}
                    >
                      <span className="text-primary font-medium text-nowrap uppercase">
                        {lesson.id}
                      </span>{" "}
                      <span className="truncate">{lesson.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </div>
          )}
        </Command>
      </div>
    </>
  );
}
