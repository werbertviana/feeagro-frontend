import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1600px] items-start gap-3 p-3 sm:gap-4 sm:p-4 lg:gap-6 lg:p-6">
        <div className="h-full shrink-0">
          <AppSidebar />
        </div>

        <main className="flex h-full min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:gap-6">
          <AppHeader />

          <section className="flex-1 overflow-auto rounded-3xl border border-white/10 bg-transparent p-4 sm:p-5 lg:p-6">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}