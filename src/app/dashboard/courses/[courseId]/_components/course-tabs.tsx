"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

interface CourseTabsProps {
  courseId: string;
}

export function CourseTabs({ courseId }: CourseTabsProps) {
  const pathname = usePathname();

  return (
    <Container>
      <div className="border-border my-4 flex h-10 items-center border-b">
        <CourseTabLink
          href={`/dashboard/courses/${courseId}/lessons`}
          active={pathname.includes("/lessons")}
        >
          Bài học
        </CourseTabLink>
        <CourseTabLink
          href={`/dashboard/courses/${courseId}/decks`}
          active={pathname.includes("/decks")}
        >
          Bộ thẻ
        </CourseTabLink>
        <CourseTabLink
          href={`/dashboard/courses/${courseId}/documents`}
          active={pathname.includes("/documents")}
        >
          Tài liệu
        </CourseTabLink>
      </div>
    </Container>
  );
}

function CourseTabLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "not-last: border-border relative flex h-full flex-1 items-center justify-center font-medium not-last:border-r after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-transparent",
        active && "after:bg-primary text-primary bg-primary/5"
      )}
    >
      {children}
    </Link>
  );
}
