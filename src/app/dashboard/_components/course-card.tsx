import Link from "next/link";
import type { StudentCourse } from "@/data/courses/queries";
import { BookIcon, KeyRoundIcon } from "lucide-react";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  course: StudentCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg font-bold duration-300 md:text-xl">
            {course.title}
          </CardTitle>
          <CardDescription className="truncate text-base">{course.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex w-full items-center justify-between text-base">
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
        </CardFooter>
      </Card>
    </Link>
  );
}
