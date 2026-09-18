import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <Link href="/">
            <Button variant="ghost">Trang chủ</Button>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <Button variant="ghost">Liên hệ</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
