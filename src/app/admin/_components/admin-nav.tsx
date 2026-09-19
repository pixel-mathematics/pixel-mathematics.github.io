import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AdminNav() {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <Link href="/">
            <Button variant="ghost">Quản lí</Button>
          </Link>
        </li>
        <li>
          <Link href="/statistics">
            <Button variant="ghost">Thống kê</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
