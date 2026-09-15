import { useLoaderData } from "@tanstack/react-router";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { CurrentUser } from "./current-user";
import { MobileNav } from "./mobile-nav";
import { Nav } from "./nav";
import { Search } from "./search";

export function Header() {
  const { lessons, profile } = useLoaderData({ from: "/dashboard" });
  const isMobile = useIsMobile();

  return (
    <header className="bg-background sticky top-0 z-10 shadow-lg">
      <Container className="flex h-16 items-center md:h-20">
        <Logo />
        <div className="ml-auto flex items-center gap-4 md:gap-0">
          <Search data={{ lessons }} />
          {isMobile ? <MobileNav /> : <Nav />}
        </div>
        {!isMobile && (
          <div className="ml-2.5">
            <CurrentUser profile={profile} />
          </div>
        )}
      </Container>
    </header>
  );
}
