'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Transactions } from "@prisma/client";
import TransactionForm from '@/components/dashboard/TransactionForm'
import TransactionTable from '@/components/dashboard/TransactionTable'

export default function TransactionsPage() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      if (!session?.user?.email) return;
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    }
    fetchTransactions();
  }, [session]);

  const handleAddTransactions = (newTransaction: Transactions) => {
    setTransactions([newTransaction, ...transactions]);
  };

const handleDeleteTransactions = async (id: string) => {
  try {
    const res = await fetch("/api/transactions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete transaction");
    }

    setTransactions(transactions.filter((t) => t.id !== id));
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete transaction");
  }
};


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Transactions
        </h1>
      </div>

      <div className="mb-10">
        <TransactionForm onAddTransaction={handleAddTransactions} />
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-lg font-medium">
            Loading transactions...
          </div>
        ) : (
          <TransactionTable
            transactions={transactions}
            onDelete={handleDeleteTransactions}
          />
        )}
      </div>
    </div>
  );
}
