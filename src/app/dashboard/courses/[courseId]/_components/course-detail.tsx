import type { StudentCourseDetail } from "@/data/courses/queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/shared/heading";

import { CourseDecks } from "./course-decks";
import { CourseDocuments } from "./course-documents";
import { CourseLessons } from "./course-lessons";

interface Props {
  course: StudentCourseDetail;
}

export function CourseDetail({ course: { title, chapters, documents, flashcard_decks } }: Props) {
  return (
    <div>
      <Tabs defaultValue="chapters">
        <TabsList variant="line">
          <TabsTrigger
            value="chapters"
            className="after:bg-primary group-data-[variant=line]/tabs-list:data-active:text-primary px-4 text-base font-medium"
          >
            Bài học
          </TabsTrigger>
          <TabsTrigger
            value="decks"
            className="after:bg-primary group-data-[variant=line]/tabs-list:data-active:text-primary px-4 text-base font-medium"
          >
            Bộ thẻ
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="after:bg-primary group-data-[variant=line]/tabs-list:data-active:text-primary px-4 text-base font-medium"
          >
            Tài liệu
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          <div className="mt-2">
            <Heading>Bài học {title}</Heading>
            <CourseLessons chapters={chapters} />
          </div>
        </TabsContent>
        <TabsContent value="decks">
          <div className="mt-2">
            <Heading>Bộ thẻ {title}</Heading>
            <CourseDecks decks={flashcard_decks} />
          </div>
        </TabsContent>
        <TabsContent value="documents">
          <div className="mt-2">
            <Heading>Tài liệu {title}</Heading>
            <CourseDocuments documents={documents} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
