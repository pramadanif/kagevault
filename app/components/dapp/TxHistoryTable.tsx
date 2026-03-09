'use client';

// KAGE VAULT — TxHistoryTable | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React from 'react';

type TxHistoryRow = {
  type: 'deposit' | 'withdrawal';
  nullifier: string;
  timestamp: string;
  txHash: string;
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
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Nullifier</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Starknet Tx</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.nullifier}-${index}`} className="border-b border-navy-border/50 last:border-b-0">
                <td className="px-4 py-3 text-brand-blue-gray capitalize">{row.type}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-green-500/40 bg-green-500/10 px-2 py-1 text-[11px] uppercase tracking-wider text-green-400">
                    Shielded
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-sm text-white">
                  {row.nullifier.slice(0, 6)}...{row.nullifier.slice(-4)}
                </td>
                <td className="px-4 py-3 text-white">●●●●● sBTC</td>
                <td className="px-4 py-3 text-brand-muted">{row.timestamp}</td>
                <td className="px-4 py-3">
                  <a
                    href={`https://sepolia.starkscan.co/tx/${row.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-brand-blue-gray hover:text-white"
                  >
                    {row.txHash.slice(0, 10)}...{row.txHash.slice(-6)}
                  </a>
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
