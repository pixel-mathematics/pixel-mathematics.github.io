import { Link } from "@tanstack/react-router";
import { BookIcon, KeyRoundIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StudentCourse } from "@/queries/courses";

interface CourseCardProps {
  course: StudentCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/dashboard/courses/${course.id}`}>
      <Card className="group border-primary/0 border-1 duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="group-hover:text-primary text-lg font-semibold uppercase duration-300">
            {course.title}
          </CardTitle>
          <CardDescription className="truncate">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex w-full items-center justify-between gap-4">
            <div className="text-primary flex items-center gap-1 font-semibold uppercase">
              <KeyRoundIcon size={16} />
              {course.id}
            </div>
            <div className="flex items-center gap-1 font-semibold">
              <BookIcon size={16} />
              {course.subjects?.title}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
