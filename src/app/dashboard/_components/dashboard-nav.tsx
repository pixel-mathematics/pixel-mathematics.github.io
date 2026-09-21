import Link from "next/link";

import { Button } from "@/components/ui/button";

export function DashboardNav() {
  return (
    <nav>
      <ul className="flex items-center">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>
              <Button variant="ghost">{label}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const navItems = [
  { href: "/dashboard", label: "Góc học tập" },
  { href: "/dashboard/courses", label: "Khóa học" },
  { href: "/dashboard/schedule", label: "Thời khóa biểu" },
];
