import { Link } from "@tanstack/react-router";
import { BookIcon, CalendarIcon, KeyRoundIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { StudentCourse } from "@/queries/courses";

interface CourseCardProps {
  course: StudentCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to="/dashboard/courses/$courseId" params={{ courseId: course.id }}>
      <Card className="group border-border border-1 duration-300">
        <CardHeader>
          <CardTitle className="group-hover:text-primary text-xl font-bold uppercase duration-300 md:text-2xl">
            {course.title}
          </CardTitle>
          <CardDescription className="truncate text-lg">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="text-base">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-primary flex items-center gap-1 font-medium uppercase">
                <KeyRoundIcon size={20} />
                {course.id}
              </div>
              <div className="flex items-center gap-1 font-medium">
                <BookIcon size={20} />
                {course.subjects?.title}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
