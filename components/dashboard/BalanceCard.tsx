import { Wallet } from "lucide-react";

type BalanceCardProps = {
  value: number;
};

export function BalanceCard({ value }: BalanceCardProps) {
  const formatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="w-[320px] rounded-2xl bg-[#0e3b2e] shadow-lg border border-white/10 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f6f54]">
          <Wallet className="h-5 w-5 text-white" />
        </div>

        <span className="text-white font-medium">Saldo Atual</span>
      </div>

      <div className="flex items-center justify-center py-10">
        <span className="text-2xl font-semibold text-white">{formatted}</span>
      </div>
    </div>
  );
}