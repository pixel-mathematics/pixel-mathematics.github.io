import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StudentCourseDetail } from "@/queries/courses";
import { ChapterLessonListItem } from "./chapter-lesson-list-item";
import { DocumentListItem } from "./document-list-item";

interface Props {
  course: StudentCourseDetail;
}

export function CourseDetail({ course: { chapters, documents } }: Props) {
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

  return (
    <div>
      <Tabs defaultValue="chapters">
        <TabsList className="group-data-horizontal/tabs:h-12">
          <TabsTrigger
            value="chapters"
            className="px-8 text-lg font-bold uppercase md:text-xl"
          >
            Bài học
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="px-8 text-lg font-bold uppercase md:text-xl"
          >
            Tài liệu
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          {chapters.length > 0 ? (
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
                      <span className="bg-primary text-primary-foreground flex h-8 w-22 items-center justify-center rounded-sm text-lg font-semibold text-nowrap uppercase">
                        {chapter.id}
                      </span>{" "}
                      <span className="text-primary max-w-[80vw] truncate text-xl font-medium md:max-w-[800px]">
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
            <p className="text-muted-foreground p-4">Chưa cập nhật bài học.</p>
          )}
        </TabsContent>
        <TabsContent value="documents">
          {documents.length > 0 ? (
            <div className="flex flex-col items-stretch gap-2">
              {documents.map((doc) => (
                <DocumentListItem key={doc.id} document={doc} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground p-4">Chưa cập nhật tài liệu.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
