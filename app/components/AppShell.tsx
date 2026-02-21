"use client";

import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen w-full bg-[var(--background)]">
      {children}
    </div>
  );
};

export default AppShell;
