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
    <Accordion defaultValue={[search.chapterId]}>
      {chapters.map((chapter) => (
        <AccordionItem
          value={chapter.id}
          key={chapter.id}
          onOpenChange={(open: boolean) =>
            handleChapterOpenChange(open, chapter.id)
          }
        >
          <AccordionTrigger className="flex cursor-pointer items-center py-4 hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5">
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
              <span className="bg-primary text-primary-foreground flex h-8 w-22 items-center justify-center rounded-sm text-base font-semibold text-nowrap uppercase">
                {chapter.id}
              </span>{" "}
              <span className="text-primary max-w-[80vw] truncate text-lg font-medium md:max-w-[800px] md:text-xl">
                {chapter.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
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
