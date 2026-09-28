import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header navItems={[{ href: "/dashboard", label: "Góc học tập" }]} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
