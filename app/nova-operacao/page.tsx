import { AppShell } from "@/components/layout/AppShell";
import { NewOperationPanel } from "@/components/nova-operacao/NewOperationPanel";

export default function NovaOperacaoPage() {
  return (
    <AppShell>
      <NewOperationPanel />
    </AppShell>
  );
}