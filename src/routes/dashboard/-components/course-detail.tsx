import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StudentCourseDetail } from "@/queries/courses";
import { CourseDecks } from "./course-decks";
import { CourseDocuments } from "./course-documents";
import { CourseLessons } from "./course-lessons";

interface Props {
  course: StudentCourseDetail;
}

export function CourseDetail({
  course: { chapters, documents, flashcard_decks },
}: Props) {
  return (
    <div>
      <Tabs defaultValue="chapters">
        <TabsList className="group-data-horizontal/tabs:h-10">
          <TabsTrigger
            value="chapters"
            className="px-8 text-base font-bold uppercase md:text-lg"
          >
            Bài học
          </TabsTrigger>
          <TabsTrigger
            value="decks"
            className="px-8 text-base font-bold uppercase md:text-lg"
          >
            Bộ thẻ
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="px-8 text-base font-bold uppercase md:text-lg"
          >
            Tài liệu
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          <CourseLessons chapters={chapters} />
        </TabsContent>
        <TabsContent value="decks">
          <CourseDecks decks={flashcard_decks} />
        </TabsContent>
        <TabsContent value="documents">
          <CourseDocuments documents={documents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
