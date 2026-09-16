import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SignInButton } from "./sign-in-button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          size="lg"
          variant="ghost"
          className="bg-transparent px-0 hover:bg-transparent"
        >
          <div className="relative h-4 w-6">
            <span
              className={cn(
                "bg-foreground absolute top-0 left-0 block h-1 w-full origin-center rounded-full duration-150",
                open ? "translate-y-1.5 rotate-45" : ""
              )}
            ></span>
            <span
              className={cn(
                "bg-foreground absolute bottom-0 left-0 block h-1 w-full origin-center rounded-full duration-150",
                open ? "-translate-y-1.5 -rotate-45" : ""
              )}
            ></span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 w-svw -translate-x-1" align="end">
        <div>
          <nav>
            <ul className="flex flex-col items-stretch">
              <li>
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 text-xl font-medium"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center px-4 py-2 text-xl font-medium"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <SignInButton />
              </li>
            </ul>
          </nav>
        </div>
      </PopoverContent>
    </Popover>
  );
}
