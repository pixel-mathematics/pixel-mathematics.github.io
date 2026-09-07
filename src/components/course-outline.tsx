import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { LessonListItem } from "./lesson-list-item"
import type { CourseWithMaterials } from "@/types"
import { DocumentListItem } from "./document-list-item"

interface Props {
  course: CourseWithMaterials
  chapter_id?: string | null
  lesson_id?: string | null
}

export function CourseOutline({
  course: { id, title, chapters, documents },
  chapter_id,
  lesson_id,
}: Props) {
  const handleChapterOpenChange = (open: boolean, id: string) => {
    if (open) {
      const url = new URL(window.location.href)
      url.searchParams.set("chapter_id", id)
      url.searchParams.delete("lesson_id")
      window.history.pushState({}, "", url.toString())
    }
  }

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
                  <AccordionTrigger className="flex items-center text-base md:text-lg">
                    <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                      <span className="flex h-6 w-16 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-nowrap text-primary-foreground uppercase">
                        {chapter.id}
                      </span>{" "}
                      <span className="max-w-[80vw] truncate text-primary uppercase md:max-w-full">
                        {chapter.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-0 flex flex-col items-stretch gap-2 md:ml-14">
                      {chapter.lessons.map((lesson) => (
                        <LessonListItem
                          lesson_id={lesson_id}
                          lesson={lesson}
                          chapter={{ id: chapter.id, title: chapter.title }}
                          course={{
                            id,
                            title,
                          }}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="p-4">Chưa có bài học nào trong khóa này</p>
          )}
        </TabsContent>
        <TabsContent value="documents">
          <div className="flex flex-col items-stretch gap-2">
            {documents.map((doc) => (
              <DocumentListItem key={doc.id} document={doc} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
