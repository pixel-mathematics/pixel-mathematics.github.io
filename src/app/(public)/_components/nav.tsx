import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Nav() {
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
  { href: "/", label: "Trang chủ" },
  { href: "/contact", label: "Liên hệ" },
];
