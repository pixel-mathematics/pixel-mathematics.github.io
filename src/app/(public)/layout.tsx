import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header
        navItems={[
          {
            href: "/",
            label: "Trang chủ",
          },
          {
            href: "/contact",
            label: "Liên hệ",
          },
        ]}
      />
      <main className="min-h-svh">{children}</main>
      <Footer />
    </>
  );
}
