"use client";

import { createContext, ReactNode, useContext } from "react";
import type { User } from "@/data/auth/queries";

import { TooltipProvider } from "@/components/ui/tooltip";

interface RootData {
  currentUser: User | null;
}

const RootContext = createContext<RootData>({
  currentUser: null,
});

export function RootProvider({ children, data }: { children: ReactNode; data: RootData }) {
  return (
    <RootContext.Provider value={data}>
      <TooltipProvider>{children}</TooltipProvider>
    </RootContext.Provider>
  );
}

// Hook tùy chỉnh để sử dụng ở bất kỳ Client Component nào
export function useRootContext() {
  const context = useContext(RootContext);
  if (context === undefined) {
    throw new Error("useRootContext phải được sử dụng trong RootProvider");
  }
  return context;
}
