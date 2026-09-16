import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { StudentCourseDetail } from "@/queries/courses";
import { ChapterLessonListItem } from "./chapter-lesson-list-item";

interface CourseLessonsProps {
  chapters: StudentCourseDetail["chapters"];
}

export function CourseLessons({ chapters }: CourseLessonsProps) {
  const search = useSearch({ from: "/dashboard/courses/$courseId" });
  const navigate = useNavigate({ from: "/dashboard/courses/$courseId" });

  const handleChapterOpenChange = (open: boolean, id: string) => {
    if (open) {
      navigate({
        search: {
          chapterId: id,
        },
        resetScroll: false, // prevent scroll to the beginning of the page
        replace: true,
      });
    }
  };
  return chapters.length > 0 ? (
    <Accordion defaultValue={[search.chapterId]} className="gap-2">
      {chapters.map((chapter) => (
        <AccordionItem
          className="not-last:border-b-[0px]"
          value={chapter.id}
          key={chapter.id}
          onOpenChange={(open: boolean) =>
            handleChapterOpenChange(open, chapter.id)
          }
        >
          <AccordionTrigger className="border-primary/30 **:data-[slot=accordion-trigger-icon]:text-primary flex cursor-pointer items-center overflow-hidden rounded-md p-2 hover:no-underline **:data-[slot=accordion-trigger-icon]:size-4.5 md:p-0 md:pr-3">
            <div className="flex flex-col items-start gap-2 text-lg md:flex-row md:items-center">
              <span className="bg-primary text-primary-foreground flex h-7 w-20 items-center justify-center rounded-md text-sm font-semibold text-nowrap uppercase md:h-11 md:rounded-none">
                {chapter.id}
              </span>{" "}
              <span className="text-primary max-w-[80svw] truncate text-left text-nowrap md:max-w-[480px] lg:max-w-[720px]">
                {chapter.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <div className="ml-0 flex flex-col items-stretch gap-2 md:ml-14">
              {chapter.lessons.map((lesson) => (
                <ChapterLessonListItem
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
    <p className="text-muted-foreground p-4 text-base">
      Chưa cập nhật bài học.
    </p>
  );
}
