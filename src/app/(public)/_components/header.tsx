"use client";

import { useMobile } from "@/hooks/use-mobile";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";

import { AuthButton } from "./auth-button";
import { MobileNav } from "./mobile-nav";
import { Nav } from "./nav";

export function Header() {
  const isMobile = useMobile();

  return (
    <header className="bg-background sticky top-0 z-10 shadow-lg">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Logo />
        <div className="flex items-center gap-4 md:gap-0">
          {isMobile ? <MobileNav /> : <Nav />}
          {!isMobile && (
            <div className="ml-3.5">
              <AuthButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
