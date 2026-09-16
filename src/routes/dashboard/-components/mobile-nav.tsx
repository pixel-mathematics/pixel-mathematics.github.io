import { useState } from "react";
import { Link, useLoaderData } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CurrentUser } from "./current-user";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { profile } = useLoaderData({ from: "/dashboard" });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            className="relative size-7 bg-transparent px-0 hover:bg-transparent"
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
        className="mt-2 w-svw -translate-x-1 rounded-none"
        align="end"
      >
        <div>
          <nav>
            <ul className="flex flex-col items-stretch">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 text-xl font-medium"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Bảng điều khiển
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/schedule"
                  className="flex items-center px-4 py-2 text-xl font-medium"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Lịch học
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/account"
                  className="flex items-center px-4 py-2 text-xl font-medium"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Tài khoản
                </Link>
              </li>
              <li>
                <CurrentUser profile={profile} />
              </li>
            </ul>
          </nav>
        </div>
      </PopoverContent>
    </Popover>
  );
}
