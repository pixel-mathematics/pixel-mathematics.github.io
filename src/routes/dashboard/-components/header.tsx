import { Link, useLoaderData } from "@tanstack/react-router";
import { Container } from "@/components/shared/container";
import { LogoIcon } from "@/components/shared/custom-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNav } from "./mobile-nav";
import { Nav } from "./nav";
import { Search } from "./search";

export function Header() {
  const { lessons } = useLoaderData({ from: "/dashboard" });
  const isMobile = useIsMobile();

  return (
    <header className="bg-background sticky top-0 z-10 shadow-lg">
      <Container className="flex h-18 items-center justify-between md:h-20">
        <Link to="/">
          <div className="flex items-center gap-2">
            <LogoIcon className="size-10" />
            <div className="hidden text-3xl font-bold tracking-tight lg:block">
              <span className="text-primary">Pixel</span> Mathematics
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-0">
          <Search data={{ lessons }} />
          {isMobile ? <MobileNav /> : <Nav />}
        </div>
      </Container>
    </header>
  );
}
