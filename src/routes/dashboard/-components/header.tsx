import { Link } from "@tanstack/react-router";
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

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 shadow-lg">
      <Container className="flex h-16 items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-2">
            <LogoIcon size={32} />
            <div className="hidden text-2xl font-bold md:block">
              <span className="text-primary">Pixel</span> Mathematics
            </div>
          </div>
        </a>
        <div className="flex flex-row-reverse items-center gap-2 md:flex-row">
          <div className="hidden md:block">
            <nav>
              <ul className="flex items-center">
                <li>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="lg">
                      Dashboard
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/schedule">
                    <Button variant="ghost" size="lg">
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
                <div className="hover:bg-muted focus:bg-muted flex h-10 w-10 cursor-pointer items-center justify-center rounded-md">
                  <MenuIcon className="size-6" />
                </div>
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
