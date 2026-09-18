import Link from "next/link";
import type { StudentCourse } from "@/data/courses/queries";
import { BookIcon, KeyRoundIcon } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  course: StudentCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <Card className="border-border border-1 duration-300">
        <CardHeader>
          <CardTitle className="text-primary text-lg font-bold uppercase duration-300 md:text-xl">
            {course.title}
          </CardTitle>
          <CardDescription className="truncate text-base">{course.description}</CardDescription>
        </CardHeader>
        <div className="flex w-full items-center justify-between px-4 text-base">
          <div className="ml-auto flex items-center gap-4">
            <div className="text-primary flex items-center gap-1 font-medium uppercase">
              <KeyRoundIcon className="size-4.5" />
              {course.id}
            </div>
            <div className="text-muted-foreground flex items-center gap-1 font-medium">
              <BookIcon className="size-4.5" />
              {course.subjects?.title}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
