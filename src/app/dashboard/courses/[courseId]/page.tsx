import { getStudentCourseDetail } from "@/data/courses/queries";

import { Container } from "@/components/shared/container";
import { Hero } from "@/components/shared/hero";

import { CourseDetail } from "./_components/course-detail";

export default async function DashboardCourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getStudentCourseDetail(courseId);

  return (
    <>
      <section className="w-full overflow-hidden">
        <Hero text="Khóa" highlightText={course.title} quote={course.description ?? ""} />
      </section>
      <section className="my-6">
        <Container>
          <CourseDetail course={course} />
        </Container>
      </section>
    </>
  );
}
