import { Suspense } from "react";

import { CourseHeader } from "./_components/course-header";
import { CourseHeaderSkeleton } from "./_components/course-header-skeleton";

export default async function CourseLayout({
  children,
  params,
}: LayoutProps<"/"> & {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <>
      <Suspense fallback={<CourseHeaderSkeleton />}>
        <CourseHeader courseId={courseId} />
      </Suspense>
      {children}
    </>
  );
}
