import { getCourseDecks } from "@/data/courses/queries";

import { Container } from "@/components/shared/container";

import { CourseDecks } from "../_components/course-decks";

export default async function CourseDecksPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const decks = await getCourseDecks(courseId);

  return (
    <Container className="mt-2">
      <CourseDecks decks={decks} />
    </Container>
  );
}
