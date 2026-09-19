import { getUserProfiles } from "@/data/users/admin-queries";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function DemoPage() {
  const userProfiles = await getUserProfiles();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={userProfiles} />
    </div>
  );
}
