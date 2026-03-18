"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Transações",
    href: "/transacoes",
    icon: ArrowLeftRight,
  },
  {
    label: "Nova Operação",
    href: "/nova-operacao",
    icon: Plus,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-[88px] shrink-0 flex-col rounded-3xl border border-white/10 bg-[#0b241d]/70 px-3 py-6 backdrop-blur-sm sm:flex lg:w-[260px] lg:px-6 lg:py-8">
      <div className="mb-8 flex items-center justify-center lg:mb-10">
        <Image
          src="/logo.svg"
          alt="FeeAgro Logo"
          width={150}
          height={50}
          className="h-auto w-[42px] object-contain lg:w-[150px]"
          priority
        />
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center justify-center gap-3 rounded-2xl px-3 py-3 text-base font-medium transition-all lg:justify-start lg:px-4",
                isActive
                  ? "bg-[#4da765] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "bg-white/5 text-white/90 hover:bg-white/10"
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 shrink-0",
                  isActive ? "text-[#f5c842]" : "text-white"
                )}
              />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}