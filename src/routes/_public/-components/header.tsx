import { Link } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { Container } from "@/components/shared/container";
import { LogoIcon } from "@/components/shared/custom-icons";
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
      <Container className="flex h-20 items-center justify-between md:h-24">
        <a href="/">
          <div className="flex items-center gap-2">
            <LogoIcon className="size-10" />
            <div className="hidden text-3xl font-bold tracking-tight md:block">
              <span className="text-primary">Pixel</span> Mathematics
            </div>
          </div>
        </a>
        <div className="flex items-center gap-4 md:gap-0">
          <div className="hidden md:block">
            <nav>
              <ul className="flex items-center">
                <li>
                  <Link to="/">
                    <Button variant="ghost" size="lg" className="text-lg">
                      Trang chủ
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <Button variant="ghost" size="lg" className="text-lg">
                      Về chúng tôi
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
                          to="/"
                          className="flex h-12 items-center text-2xl font-semibold"
                        >
                          Trang chủ
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          className="flex h-12 items-center text-2xl font-semibold"
                        >
                          Về chúng tôi
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
