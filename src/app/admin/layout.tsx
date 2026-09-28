import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header
        navItems={[
          { href: "/admin", label: "Tổng quan" },
          { href: "/admin/management", label: "Quản lí" },
        ]}
      />
      <main className="min-h-svh">{children}</main>
      <Footer />
    </>
  );
}
