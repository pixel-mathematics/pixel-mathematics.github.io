import { Link, useLoaderData } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { Container } from "@/components/container";
import { LogoIcon } from "@/components/custom-icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Search } from "./search";

export function Header() {
  const { lessons } = useLoaderData({ from: "/dashboard" });

  return (
    <header className="bg-background sticky top-0 z-10 shadow-lg">
      <Container className="flex h-20 items-center justify-between md:h-24">
        <a href="/">
          <div className="flex items-center gap-4">
            <LogoIcon className="size-10" />
            <div className="hidden text-3xl font-bold tracking-tight md:block">
              <span className="text-primary">Pixel</span> Mathematics
            </div>
          </div>
        </a>
        <div className="flex items-center gap-4 md:gap-0">
          <Search data={{ lessons }} />
          <div className="hidden md:block">
            <nav>
              <ul className="flex items-center">
                <li>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="lg" className="text-lg">
                      Dashboard
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/schedule">
                    <Button variant="ghost" size="lg" className="text-lg">
                      Lịch học
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex md:hidden">
            <Drawer swipeDirection="right">
              <DrawerTrigger>
                <Button size="lg" variant="ghost" className="px-0">
                  <MenuIcon className="size-8" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="px-6 py-8">
                  <nav>
                    <ul className="flex flex-col items-stretch gap-2">
                      <li>
                        <Link
                          to="/dashboard"
                          className="flex h-12 items-center text-2xl font-semibold"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/schedule"
                          className="flex h-12 items-center text-2xl font-semibold"
                        >
                          Lịch học
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <DrawerFooter>
                  <DrawerClose
                    render={<Button variant="outline">Đóng</Button>}
                  />
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </Container>
    </header>
  );
}
