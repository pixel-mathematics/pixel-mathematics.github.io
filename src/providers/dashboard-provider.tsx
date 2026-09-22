"use client";

import { createContext, ReactNode, useContext } from "react";
import type { UserProfile } from "@/data/auth/queries";

interface DashboardData {
  profile: UserProfile | null;
}

const DashboardContext = createContext<DashboardData>({
  profile: null,
});

export function DashboardProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: DashboardData;
}) {
  return <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>;
}

// Hook tùy chỉnh để sử dụng ở bất kỳ Client Component nào
export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboardContext phải được sử dụng trong DashboardProvider");
  }
  return context;
}
