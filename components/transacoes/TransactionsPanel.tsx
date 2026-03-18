"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ChevronDown,
} from "lucide-react";
import { getTransactions } from "@/services/transactions";

const INITIAL_VISIBLE_COUNT = 5;
const LOAD_MORE_STEP = 5;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("pt-BR");
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function TransactionsPanel() {
  const [search, setSearch] = useState("");
  const [movementType, setMovementType] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  function handleSearchChange(value: string) {
    setSearch(value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleMovementTypeChange(value: string) {
    setMovementType(value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  }

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = normalizeSearchValue(search);

    return transactions.filter((transaction) => {
      const label =
        transaction.type === "out" ? "Pix Enviado" : "Pix Recebido";

      const normalizedCounterparty = normalizeSearchValue(
        transaction.counterparty,
      );
      const normalizedLabel = normalizeSearchValue(label);

      const matchesSearch =
        normalizedSearch.length === 0 ||
        normalizedCounterparty.includes(normalizedSearch) ||
        normalizedLabel.includes(normalizedSearch);

      const matchesType =
        movementType === "all" || transaction.type === movementType;

      return matchesSearch && matchesType;
    });
  }, [transactions, search, movementType]);

  const visibleTransactions = useMemo(() => {
    return filteredTransactions.slice(0, visibleCount);
  }, [filteredTransactions, visibleCount]);

  const hasMoreToShow = visibleCount < filteredTransactions.length;

  return (
    <div className="flex flex-col gap-6 text-white">
      <h1 className="text-2xl font-semibold">Transações</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select className="h-11 min-w-[180px] appearance-none rounded-lg border border-white/10 bg-[#193d34] px-4 pr-12 text-white outline-none focus:border-[#4da765] focus:ring-2 focus:ring-[#4da765]/30">
                <option className="bg-[#193d34] text-white">
                  Últimos 30 dias
                </option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
              />
            </div>

            <div className="relative">
              <select
                value={movementType}
                onChange={(e) => handleMovementTypeChange(e.target.value)}
                className="h-11 min-w-[240px] appearance-none rounded-lg border border-white/10 bg-[#193d34] px-4 pr-12 text-white outline-none focus:border-[#4da765] focus:ring-2 focus:ring-[#4da765]/30"
              >
                <option className="bg-[#193d34] text-white" value="all">
                  Tipo de movimentação
                </option>
                <option className="bg-[#193d34] text-white" value="in">
                  Entradas
                </option>
                <option className="bg-[#193d34] text-white" value="out">
                  Saídas
                </option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
              />
            </div>

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-11 min-w-[260px] flex-1 rounded-lg border border-white/10 bg-[#143a31] px-4 text-white placeholder:text-white/60 outline-none focus:border-[#4da765] focus:ring-2 focus:ring-[#4da765]/30"
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-[2fr_1fr_1.4fr_1.2fr] bg-white/5 px-4 py-4 text-sm font-semibold text-white/90">
              <span>Movimentações Realizadas</span>
              <span>Valor</span>
              <span>Recebedor/Pagador</span>
              <span>Data / Hora</span>
            </div>

            {isLoading ? (
              <div className="px-4 py-6 text-white/70">Carregando...</div>
            ) : isError ? (
              <div className="px-4 py-6 text-red-300">
                Erro ao carregar transações.
              </div>
            ) : visibleTransactions.length === 0 ? (
              <div className="px-4 py-6 text-white/70">
                Nenhuma transação encontrada.
              </div>
            ) : (
              visibleTransactions.map((transaction) => {
                const isOut = transaction.type === "out";

                return (
                  <div
                    key={transaction.id}
                    className="grid grid-cols-[2fr_1fr_1.4fr_1.2fr] items-center border-t border-white/10 px-4 py-5 text-base transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isOut
                            ? "bg-red-500/20 text-red-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {isOut ? (
                          <ArrowUpRight size={16} />
                        ) : (
                          <ArrowDownLeft size={16} />
                        )}
                      </span>

                      {isOut ? "Pix Enviado" : "Pix Recebido"}
                    </span>

                    <span
                      className={`font-medium ${
                        isOut ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {isOut ? "-" : "+"} {formatCurrency(transaction.value)}
                    </span>

                    <span>{transaction.counterparty}</span>

                    <span className="text-white/80">
                      {formatDateTime(transaction.createdAt)}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {hasMoreToShow && !isLoading && !isError && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-lg border border-white/20 bg-transparent px-8 py-3 text-white transition hover:border-emerald-400 hover:bg-emerald-500/20"
              >
                Carregar mais
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}