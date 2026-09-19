import { AdminFooter } from "./_components/admin-footer";
import { AdminHeader } from "./_components/admin-header";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <AdminHeader />
      <main className="min-h-svh">{children}</main>
      <AdminFooter />
    </>
  );
}
