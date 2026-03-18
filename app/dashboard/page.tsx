"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { getTransactionsSummary } from "@/services/transactions";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions-summary"],
    queryFn: getTransactionsSummary,
  });

  const balanceValue = data?.balance ?? 0;

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-white">
          Olá, Werbert 👋
        </h1>

        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <BalanceCard value={balanceValue} />

            {isLoading && (
              <span className="text-sm text-white/60">Carregando saldo...</span>
            )}

            {isError && (
              <span className="text-sm text-red-300">
                Erro ao atualizar saldo.
              </span>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}