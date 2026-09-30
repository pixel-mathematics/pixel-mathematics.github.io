"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { CurrentUser } from "./current-user";

interface MobileNavProps {
  items: { href: string; label: string }[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
      document.body.style.touchAction = "none";
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.style.touchAction = "";
    };
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            className="relative size-6 bg-transparent px-0 hover:bg-transparent aria-expanded:bg-transparent"
          >
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-[3px] w-full origin-center rounded-full duration-150",
                open ? "rotate-45" : "top-[5px]"
              )}
            ></span>
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-[3px] w-full origin-center rounded-full duration-150",
                open ? "-rotate-45" : "top-[13px]"
              )}
            ></span>
          </Button>
        }
      />
      <PopoverContent
        className="no-scrollbar h-[calc(100dvh-64px)] w-screen -translate-x-[5px] overflow-y-auto rounded-none border-none p-0 shadow-none data-open:animate-none!"
        align="end"
        side="bottom"
        sideOffset={20}
      >
        <div className="h-full px-4 text-base">
          <nav className="h-full">
            <ul className="flex flex-col items-stretch">
              {items.map(({ href, label }, index) => (
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
        <Separator />
        <div className="flex items-center p-4">
          <CurrentUser />
        </div>
      </PopoverContent>
    </Popover>
  );
}
