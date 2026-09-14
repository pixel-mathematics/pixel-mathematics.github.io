import { useState } from "react";
import { Link, useLoaderData } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CurrentUser } from "./current-user";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { profile } = useLoaderData({ from: "/dashboard" });

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button size="lg" variant="ghost" className="px-0">
          <MenuIcon className="size-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-18 ml-4">
          <nav>
            <ul className="flex flex-col items-stretch gap-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex h-12 items-center text-2xl font-semibold"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/schedule"
                  className="flex h-12 items-center text-2xl font-semibold"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Lịch học
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <DrawerFooter>
          <CurrentUser profile={profile} setMobileDrawerOpen={setOpen} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
