import { api } from "@/lib/api";

export type TransactionsSummary = {
  balance: number;
  totalIn: number;
  totalOut: number;
  count: number;
};

export type Transaction = {
  id: number;
  type: "in" | "out";
  value: number;
  counterparty: string;
  createdAt: string;
};

export type CreateTransactionInput = {
  type: "in" | "out";
  value: number;
  counterparty: string;
};

export async function getTransactionsSummary() {
  const { data } = await api.get<TransactionsSummary>("/transactions/summary");
  return data;
}

export async function getTransactions() {
  const { data } = await api.get<Transaction[]>("/transactions");
  return data;
}

export async function createTransaction(payload: CreateTransactionInput) {
  const { data } = await api.post<Transaction>("/transactions", payload);
  return data;
}