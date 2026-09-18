import Link from "next/link";

import { Button } from "@/components/ui/button";

export function DashboardNav() {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <Link href="/dashboard">
            <Button variant="ghost">Góc học tập</Button>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/schedule">
            <Button variant="ghost">Thời khóa biểu</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
