import { AppShell } from "@/components/layout/AppShell";
import { TransactionsPanel } from "@/components/transacoes/TransactionsPanel";

export default function TransacoesPage() {
  return (
    <AppShell>
      <TransactionsPanel />
    </AppShell>
  );
}