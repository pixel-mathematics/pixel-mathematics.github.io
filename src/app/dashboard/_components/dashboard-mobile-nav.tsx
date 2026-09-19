import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { CurrentUser } from "./current-user";

export function DashboardMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            className="relative size-7 bg-transparent px-0 hover:bg-transparent aria-expanded:bg-transparent"
          >
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-[3px] w-full origin-center rounded-full duration-150",
                open ? "rotate-45" : "top-[6.33px]"
              )}
            ></span>
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-[3px] w-full origin-center rounded-full duration-150",
                open ? "-rotate-45" : "top-[15.67px]"
              )}
            ></span>
          </Button>
        }
      />
      <PopoverContent
        className="mt-[15px] h-[calc(100svh-63px)] w-svw -translate-x-1 rounded-none p-0"
        align="end"
      >
        <div className="h-full px-4 text-base">
          <nav className="h-full">
            <ul className="flex flex-col items-stretch">
              {navLinks.map(({ href, label }, index) => (
                <li
                  key={href}
                  className="border-border animate-in fade-in-0 slide-in-from-bottom-8 fill-mode-both border-b duration-500"
                  style={{ animationDelay: `${150 + index * 100}ms` }}
                >
                  <Link
                    href={href}
                    className="flex h-12 items-center font-medium"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="bg-primary/10 flex items-center p-4">
          <CurrentUser />
        </div>
      </PopoverContent>
    </Popover>
  );
}

const navLinks = [
  {
    label: "Góc học tập",
    href: "/dashboard",
  },
  {
    label: "Thời khóa biểu",
    href: "/dashboard/schedule",
  },
  {
    label: "Tài khoản",
    href: "/dashboard/account",
  },
];
