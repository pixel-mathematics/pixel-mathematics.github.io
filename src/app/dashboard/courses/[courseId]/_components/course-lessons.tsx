"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { StudentCourseDetail } from "@/data/courses/queries";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChapterLessonItem } from "./chapter-lesson-item";

interface CourseLessonsProps {
  chapters: StudentCourseDetail["chapters"];
}

export function CourseLessons({ chapters }: CourseLessonsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const chapterId = searchParams.get("chapterId");

  const [selectedChapterId, setSelectedChapterId] = useState(chapterId);

  const handleChapterChange = (chapterIds: string[]) => {
    const activeChapterId = chapterIds[0];
    setSelectedChapterId(activeChapterId);
    const params = new URLSearchParams(searchParams.toString());

    if (activeChapterId) {
      params.set("chapterId", activeChapterId);
    } else {
      params.delete("chapterId");
    }

    window.history.replaceState(
      null,
      "",
      params.toString() ? `${pathname}?${params.toString()}` : pathname
    );
  };

  return chapters.length > 0 ? (
    <Accordion value={[selectedChapterId]} onValueChange={handleChapterChange} className="gap-2">
      {chapters.map((chapter) => (
        <AccordionItem className="not-last:border-b-[0px]" value={chapter.id} key={chapter.id}>
          <AccordionTrigger className="border-primary/30 **:data-[slot=accordion-trigger-icon]:text-primary flex cursor-pointer items-center overflow-hidden rounded-md p-2 hover:no-underline **:data-[slot=accordion-trigger-icon]:size-4.5 md:p-0 md:pr-3">
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
              <span className="bg-primary text-primary-foreground flex h-7 w-18 items-center justify-center rounded-md text-sm font-medium text-nowrap uppercase md:h-11 md:rounded-none">
                {chapter.id}
              </span>{" "}
              <span className="text-primary max-w-[80svw] truncate text-left text-base font-medium text-nowrap md:max-w-[480px] lg:max-w-[720px]">
                {chapter.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <div className="ml-0 flex flex-col items-stretch gap-2 md:ml-14">
              {chapter.lessons.map((lesson) => (
                <ChapterLessonItem
                  key={lesson.id}
                  lesson={lesson}
                  chapter={{
                    id: chapter.id,
                    title: chapter.title,
                    course_id: chapter.course_id,
                  }}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <p className="text-muted-foreground text-base">Chưa cập nhật bài học.</p>
  );
}
