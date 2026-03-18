import { Bell, LogOut, User } from "lucide-react";

type AppHeaderProps = {
  userName?: string;
};

export function AppHeader({ userName = "Werbert Viana" }: AppHeaderProps) {
  return (
    <header className="flex h-24 w-full items-center justify-end rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60">
            <User className="h-6 w-6" />
          </div>
          <span className="text-2xl font-semibold">{userName}</span>
        </div>

        <div className="h-12 w-px bg-white/40" />

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10"
        >
          <Bell className="h-6 w-6 text-white" />
        </button>

        <div className="h-12 w-px bg-white/40" />

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10"
        >
          <LogOut className="h-6 w-6 text-white" />
        </button>
      </div>
    </header>
  );
}