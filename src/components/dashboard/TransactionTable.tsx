'use client';

import { Transactions } from '@prisma/client';
import { FC } from 'react';

type Props = {
  transactions: Transactions[];
  onDelete: (id: string) => void;
};

const TransactionTable: FC<Props> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <table className="min-w-full table-auto text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-xs uppercase text-gray-500">
        <tr>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((txn) => (
          <tr key={txn.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">
              {new Date(txn.DateTime).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 capitalize">{txn.type}</td>
            <td className="px-4 py-2">${txn.amount.toFixed(2)}</td>
            <td className="px-4 py-2">{txn.category || '—'}</td>
            <td className="px-4 py-2">{txn.description}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => onDelete(txn.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
