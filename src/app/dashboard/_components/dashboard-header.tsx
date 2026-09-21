"use client";

import Link from "next/link";

import { useMobile } from "@/hooks/use-mobile";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";

import { CurrentUser } from "./current-user";
import { DashboardMobileNav } from "./dashboard-mobile-nav";
import { DashboardNav } from "./dashboard-nav";

export function DashboardHeader() {
  const isMobile = useMobile();

  return (
    <header className="bg-background sticky top-0 z-10 shadow-lg">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 md:gap-0">
          {isMobile ? <DashboardMobileNav /> : <DashboardNav />}
          {!isMobile && (
            <div className="ml-3.5">
              <CurrentUser />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
