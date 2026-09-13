import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StudentCourseDetail } from "@/queries/courses";
import { DocumentListItem } from "./document-list-item";
import { LessonListItem } from "./lesson-list-item";

interface Props {
  course: StudentCourseDetail;
}

export function CourseDetail({ course: { chapters, documents } }: Props) {
  const url = new URL(window.location.href);
  const chapter_id = url.searchParams.get("chapter_id");
  const handleChapterOpenChange = (open: boolean, id: string) => {
    if (open) {
      const url = new URL(window.location.href);
      url.searchParams.set("chapter_id", id);
      url.searchParams.delete("lesson_id");
      window.history.pushState({}, "", url.toString());
    }
  };

  return (
    <div>
      <Tabs defaultValue="chapters">
        <TabsList>
          <TabsTrigger
            value="chapters"
            className="px-4 text-base font-bold uppercase md:text-lg"
          >
            Bài học
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="px-4 text-base font-bold uppercase md:text-lg"
          >
            Tài liệu
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          {chapters.length > 0 ? (
            <Accordion defaultValue={[chapter_id]}>
              {chapters.map((chapter) => (
                <AccordionItem
                  value={chapter.id}
                  key={chapter.id}
                  onOpenChange={(open: boolean) =>
                    handleChapterOpenChange(open, chapter.id)
                  }
                >
                  <AccordionTrigger className="flex cursor-pointer items-center text-base md:text-lg">
                    <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                      <span className="bg-primary text-primary-foreground flex h-6 w-16 items-center justify-center rounded-sm text-sm font-semibold text-nowrap uppercase">
                        {chapter.id}
                      </span>{" "}
                      <span className="text-primary max-w-[80vw] truncate uppercase md:max-w-full">
                        {chapter.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-0 flex flex-col items-stretch gap-2 md:ml-14">
                      {chapter.lessons.map((lesson) => (
                        <LessonListItem
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
