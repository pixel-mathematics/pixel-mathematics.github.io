"use client";

import { createContext, ReactNode, useContext } from "react";
import type { UserProfile } from "@/data/auth/queries";

interface RootData {
  profile: UserProfile | null;
}

const RootContext = createContext<RootData>({
  profile: null,
});

export function RootProvider({ children, data }: { children: ReactNode; data: RootData }) {
  return <RootContext.Provider value={data}>{children}</RootContext.Provider>;
}

// Hook tùy chỉnh để sử dụng ở bất kỳ Client Component nào
export function useRootContext() {
  const context = useContext(RootContext);
  if (context === undefined) {
    throw new Error("useDataContext phải được sử dụng trong RootProvider");
  }
  return context;
}
