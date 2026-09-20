import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "@/styles/globals.css";

import { getUserProfile } from "@/data/auth/queries";
import { RootProvider } from "@/providers/root-provider";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Pixel Mathematics",
  description: "Dạy Toán bản chất và tư duy",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const profile = await getUserProfile();

  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", fontSans.variable)}>
      <body className="overflow-x-hidden overscroll-none">
        <RootProvider data={{ profile }}>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
