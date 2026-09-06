import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { LessonListItem } from "./lesson-list-item"

interface Props {
  course: {
    id: string
    title: string
    description: string
    start_date: Date
    updated_at: Date
    status: string
    chapters: {
      id: string
      title: string
      sort_order?: number
      lessons: {
        id: string
        title: string
        class_date: Date
        updated_at: Date
        due_date: Date
        lesson_attachments: {
          id: string
          file_name: string
          file_url: string
          file_type?: string
        }[]
      }[]
    }[]
  }
  chapter_id?: string | null
  lesson_id?: string | null
}

export function CourseOutline({
  course: { id, title, chapters },
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
            className="px-4 text-lg font-bold uppercase"
          >
            Chương trình học
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="px-4 text-lg font-bold uppercase"
          >
            Tài liệu tham khảo
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
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6.5 items-center rounded-sm bg-primary px-2 text-base font-semibold text-primary-foreground uppercase">
                        {chapter.id}
                      </span>{" "}
                      <span className="truncate text-primary uppercase">
                        {chapter.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-14 flex flex-col items-stretch gap-2">
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
        <TabsContent value="documents"></TabsContent>
      </Tabs>
    </div>
  )
}
