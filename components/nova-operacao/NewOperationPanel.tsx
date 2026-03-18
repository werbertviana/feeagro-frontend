"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRightLeft } from "lucide-react";
import { createTransaction } from "@/services/transactions";

type Step = 1 | 2 | 3;

type FormValues = {
  valor: string;
  contaDestino: string;
};

export function NewOperationPanel() {
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormValues>({
    valor: "",
    contaDestino: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["transactions-summary"] }),
      ]);

      setConfirmed(true);
    },
    onError: (error) => {
      console.error("Erro ao criar transação:", error);
      setSubmitError("Não foi possível concluir a operação. Tente novamente.");
    },
  });

  function handleChange(field: keyof FormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (submitError) {
      setSubmitError("");
    }
  }

  function validateStep2() {
    const nextErrors: Partial<FormValues> = {};

    if (!form.valor.trim()) {
      nextErrors.valor = "Informe um valor.";
    } else {
      const parsed = Number(form.valor.replace(",", "."));
      if (Number.isNaN(parsed) || parsed <= 0) {
        nextErrors.valor = "Informe um valor válido maior que zero.";
      }
    }

    if (!form.contaDestino.trim()) {
      nextErrors.contaDestino = "Informe a conta destino.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      const isValid = validateStep2();
      if (!isValid) return;
      setStep(3);
    }
  }

  function goBack() {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  }

  function handleConfirm() {
    setSubmitError("");

    const parsedValue = Number(form.valor.replace(",", "."));

    createTransactionMutation.mutate({
      type: "out",
      value: parsedValue,
      counterparty: form.contaDestino.trim(),
    });
  }

  function resetFlow() {
    setStep(1);
    setForm({
      valor: "",
      contaDestino: "",
    });
    setErrors({});
    setConfirmed(false);
    setSubmitError("");
    createTransactionMutation.reset();
  }

  const formattedValue = useMemo(() => {
    const parsed = Number(form.valor.replace(",", "."));
    if (Number.isNaN(parsed)) return "R$ 0,00";

    return parsed.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }, [form.valor]);

  const isSubmitting = createTransactionMutation.isPending;

  return (
    <div className="flex flex-col gap-6 text-white">
      <h1 className="text-2xl font-semibold">Nova Operação</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6 text-sm font-medium text-white/80">
            <StepItem number={1} label="Tipo" active={step === 1} done={step > 1} />
            <StepItem number={2} label="Dados" active={step === 2} done={step > 2} />
            <StepItem number={3} label="Confirmação" active={step === 3} done={confirmed} />
          </div>

          {confirmed ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
              <h2 className="text-xl font-semibold text-emerald-300">
                Operação realizada com sucesso
              </h2>

              <p className="mt-2 text-white/80">Tipo: Transferência</p>
              <p className="text-white/80">Valor: {formattedValue}</p>
              <p className="text-white/80">Conta destino: {form.contaDestino}</p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="rounded-lg border border-white/20 px-6 py-3 text-white transition hover:bg-white/10"
                >
                  Nova operação
                </button>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-black/10 p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <ArrowRightLeft className="h-6 w-6" />
                    </div>

                    <h2 className="text-2xl font-semibold">Transferência</h2>
                  </div>

                  <p className="text-white/75">
                    Realize uma transferência informando valor e conta destino.
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-black/10 p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <ArrowRightLeft className="h-6 w-6" />
                    </div>

                    <h2 className="text-2xl font-semibold">Transferência</h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm text-white/80">Valor</label>
                      <input
                        type="text"
                        value={form.valor}
                        onChange={(e) => handleChange("valor", e.target.value)}
                        placeholder="R$ 0,00"
                        className="h-12 w-full rounded-lg border border-white/10 bg-[#143a31] px-4 text-white outline-none placeholder:text-white/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      />
                      {errors.valor && (
                        <p className="mt-2 text-sm text-red-300">{errors.valor}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/80">
                        Conta destino
                      </label>
                      <input
                        type="text"
                        value={form.contaDestino}
                        onChange={(e) => handleChange("contaDestino", e.target.value)}
                        placeholder="Digite a chave Pix"
                        className="h-12 w-full rounded-lg border border-white/10 bg-[#143a31] px-4 text-white outline-none placeholder:text-white/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      />
                      {errors.contaDestino && (
                        <p className="mt-2 text-sm text-red-300">{errors.contaDestino}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-black/10 p-6">
                  <h2 className="text-2xl font-semibold">Resumo da operação</h2>

                  <div className="mt-6 space-y-4 text-white/90">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-white/70">Tipo</span>
                      <span className="font-medium">Transferência</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-white/70">Valor</span>
                      <span className="font-medium">{formattedValue}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-white/70">Conta destino</span>
                      <span className="font-medium">{form.contaDestino}</span>
                    </div>
                  </div>

                  {submitError && (
                    <p className="mt-4 text-sm text-red-300">{submitError}</p>
                  )}

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="rounded-lg bg-[#4da765] px-6 py-3 font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Confirmando..." : "Confirmar"}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={step === 1 ? resetFlow : goBack}
                  disabled={isSubmitting}
                  className="rounded-lg border border-white/20 px-6 py-3 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={step === 3 || isSubmitting}
                  className="rounded-lg bg-[#4da765] px-6 py-3 font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type StepItemProps = {
  number: number;
  label: string;
  active?: boolean;
  done?: boolean;
};

function StepItem({ number, label, active, done }: StepItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={[
          "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold",
          active
            ? "border-[#f5c842] bg-[#f5c842] text-[#0b241d]"
            : done
              ? "border-emerald-400 bg-emerald-400 text-[#0b241d]"
              : "border-white/20 bg-white/5 text-white/70",
        ].join(" ")}
      >
        {number}
      </div>

      <span className={active ? "text-white" : "text-white/70"}>{label}</span>
    </div>
  );
}