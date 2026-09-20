import { getCourseDocuments } from "@/data/courses/queries";

import { Container } from "@/components/shared/container";

import { CourseDocuments } from "../_components/course-documents";

export default async function CourseDocumentsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const documents = await getCourseDocuments(courseId);

  return (
    <Container className="mt-2">
      <CourseDocuments documents={documents} />
    </Container>
  );
}
