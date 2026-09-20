import { getCourseChapters } from "@/data/courses/queries";

import { Container } from "@/components/shared/container";

import { CourseLessons } from "../_components/course-lessons";

export default async function CourseLessonsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const chapters = await getCourseChapters(courseId);

  return (
    <Container className="mt-2">
      <CourseLessons chapters={chapters} />
    </Container>
  );
}
