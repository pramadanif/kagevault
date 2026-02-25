'use client';

// KAGE VAULT — TxHistoryTable | Match landing page design system
import React from 'react';

type TxHistoryRow = {
  id: string;
  type: string;
  amount: string;
  timestamp: string;
  status: string;
};

interface TxHistoryTableProps {
  rows: TxHistoryRow[];
}

export const TxHistoryTable: React.FC<TxHistoryTableProps> = ({ rows }) => {
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="bg-navy-deep/70 border-b border-navy-border">
            <tr className="text-xs font-mono uppercase tracking-wider text-brand-blue-gray">
              <th className="px-4 py-3">Tx</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-navy-border/50 last:border-b-0">
                <td className="px-4 py-3 font-mono text-sm text-white">{row.id}</td>
                <td className="px-4 py-3 text-brand-blue-gray capitalize">{row.type}</td>
                <td className="px-4 py-3 text-white">{row.amount}</td>
                <td className="px-4 py-3 text-brand-muted">{row.timestamp}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-green-500/40 bg-green-500/10 px-2 py-1 text-[11px] uppercase tracking-wider text-green-400">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TxHistoryTable;
