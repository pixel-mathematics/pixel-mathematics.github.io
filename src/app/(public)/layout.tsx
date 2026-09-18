import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="min-h-svh">{children}</main>
      <Footer />
    </>
  );
}
