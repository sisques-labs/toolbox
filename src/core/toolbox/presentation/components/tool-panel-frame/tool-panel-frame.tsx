import type { ReactNode } from 'react';

export function ToolPanelFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col gap-3.5 overflow-auto bg-white p-5 dark:bg-slate-900">
      {children}
    </div>
  );
}
