import { redirect } from "next/navigation";
import { getUserProfile } from "@/data/auth/queries";
import { getStudentCourses, getStudentLessons } from "@/data/courses/queries";

import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Hero } from "@/components/shared/hero";
import { ReusableBreadcrumb } from "@/components/shared/reusable-breadcrumb";

import { CourseCard } from "./_components/course-card";
import { LessonItem } from "./_components/lesson-item";

export default async function DashboardPage() {
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/");
  }

  const courses = await getStudentCourses(profile.id);
  const lessons = await getStudentLessons(profile.id);

  return (
    <>
      <section className="w-full overflow-hidden">
        <Hero
          text="Pixel"
          highlightText="Mathematics"
          quote={`"The more I learn, the less I realize I know"`}
        />
      </section>
      <Container className="mt-6">
        <ReusableBreadcrumb items={[{ href: "/dashboard", label: "Góc học tập" }]} />
      </Container>
      <section className="my-6">
        <Container>
          <Heading>Khóa học PIXEL2027</Heading>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>
      <Separator />
      <section className="my-6">
        <Container>
          <Heading>Bài học gần đây</Heading>
          <div className="grid grid-cols-1 gap-2">
            {lessons.length > 0 ? (
              lessons.slice(0, 8).map((lesson) => <LessonItem key={lesson.id} lesson={lesson} />)
            ) : (
              <p className="text-muted-foreground">Chưa có bài học nào được cập nhật</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
