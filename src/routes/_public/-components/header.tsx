import { Link } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { Container } from "@/components/shared/container";
import { LogoIcon } from "@/components/shared/custom-icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 shadow-lg">
      <Container className="flex h-18 items-center justify-between md:h-20">
        <a href="/">
          <div className="flex items-center gap-2">
            <LogoIcon className="size-10" />
            <div className="hidden text-3xl font-bold tracking-tight lg:block">
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
                    <Button variant="ghost" size="lg">
                      Trang chủ
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <Button variant="ghost" size="lg">
                      Liên hệ
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/auth/sign-in">
                    <Button size="lg">Đăng nhập</Button>
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
                <div className="mt-18 ml-4">
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
                          to="/contact"
                          className="flex h-12 items-center text-2xl font-semibold"
                        >
                          Liên hệ
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/auth/sign-in"
                          className="text-primary flex h-12 items-center text-2xl font-semibold"
                        >
                          Đăng nhập
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </Container>
    </header>
  );
}
