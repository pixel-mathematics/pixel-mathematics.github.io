import Link from "next/link";

import { Button } from "@/components/ui/button";

interface NavProps {
  items: { href: string; label: string }[];
}

export function Nav({ items }: NavProps) {
  return (
    <nav>
      <ul className="flex items-center">
        {items.map(({ href, label }) => (
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
