import Link from "next/link";

import { LogoIcon } from "@/components/shared/custom-icons";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main>
      <div className="relative top-[50vh] flex translate-y-[-50%] flex-col items-center gap-6 sm:absolute sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%]">
        <Link href="/">
          <div className="flex items-center gap-2">
            <LogoIcon className="size-16" />
            <div className="font-bold tracking-tight">
              <div className="text-primary text-[2.25rem]">Pixel</div>
              <div className="text-foreground/90 -mt-4 text-[1.75rem]">Mathematics</div>
            </div>
          </div>
        </Link>
        {children}
      </div>
    </main>
  );
}
