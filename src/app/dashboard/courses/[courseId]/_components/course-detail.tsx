import type { StudentCourseDetail } from "@/data/courses/queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CourseDecks } from "./course-decks";
import { CourseDocuments } from "./course-documents";
import { CourseLessons } from "./course-lessons";

interface Props {
  course: StudentCourseDetail;
}

export function CourseDetail({ course: { chapters, documents, flashcard_decks } }: Props) {
  return (
    <div>
      <Tabs defaultValue="chapters">
        <TabsList>
          <TabsTrigger value="chapters" className="px-4 text-base font-bold">
            {" "}
            Bài học
          </TabsTrigger>
          <TabsTrigger value="decks" className="px-4 text-base font-bold">
            Bộ thẻ
          </TabsTrigger>
          <TabsTrigger value="documents" className="px-4 text-base font-bold">
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
