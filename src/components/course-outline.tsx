import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ClockIcon, HourglassIcon, PaperclipIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Props {
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

export function CourseOutline({ chapters }: Props) {
  return (
    <div>
      <Tabs defaultValue="chapters">
        <TabsList>
          <TabsTrigger
            value="chapters"
            className="px-6 py-2 text-lg font-bold uppercase"
          >
            Chương trình học
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="px-6 py-2 text-lg font-bold uppercase"
          >
            Tài liệu tham khảo
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          <Accordion defaultValue={[chapters[0].id]}>
            {chapters.map((chapter) => (
              <AccordionItem value={chapter.id}>
                <AccordionTrigger className="text-lg">
                  <span className="mr-2 text-primary uppercase">
                    {chapter.id}
                  </span>{" "}
                  <span>{chapter.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="ml-6 flex flex-col items-stretch gap-2">
                    {chapter.lessons.map((lesson) => (
                      <div className="flex items-center rounded-md border px-4 py-2 text-base odd:bg-primary/5">
                        <div className="font-medium">
                          <span className="mr-2 font-bold uppercase">
                            {lesson.id}
                          </span>
                          <span>{lesson.title}</span>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <PaperclipIcon size={16} />
                            <div className="flex items-center gap-1">
                              {lesson.lesson_attachments.map((file) => (
                                <a href={file.file_url} target="_blank">
                                  <Button size="xs">{file.file_name}</Button>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <ClockIcon size={16} />
                            {formatDate(lesson.updated_at, "dd/MM")}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-destructive">
                            <HourglassIcon size={16} />
                            {formatDate(lesson.due_date, "dd/MM")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="documents"></TabsContent>
      </Tabs>
    </div>
  )
}
