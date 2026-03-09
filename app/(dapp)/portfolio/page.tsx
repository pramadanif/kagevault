'use client';

// KAGE VAULT — PortfolioPage | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import ShieldedBalanceCard from '@/app/components/dapp/ShieldedBalanceCard';
import TxHistoryTable from '@/app/components/dapp/TxHistoryTable';
import { useStarknetWallet } from '@/hooks/useStarknetWallet';
import { fetchVaultEvents } from '@/lib/starknet';

type TxRow = {
  type: 'deposit' | 'withdrawal';
  nullifier: string;
  timestamp: string;
  txHash: string;
};

export default function PortfolioPage() {
  const wallet = useStarknetWallet();
  const [rows, setRows] = useState<TxRow[]>([]);

  useEffect(() => {
    if (!wallet.starknetAddress) {
      setRows([]);
      return;
    }

    const loadEvents = async () => {
      const events = await fetchVaultEvents(wallet.starknetAddress);
      setRows(
        events.map((eventItem) => ({
          type: eventItem.type === 'ShieldedWithdrawal' ? 'withdrawal' : 'deposit',
          nullifier: eventItem.nullifier,
          timestamp: eventItem.timestamp,
          txHash: eventItem.txHash,
        }))
      );
    };

    void loadEvents();
  }, [wallet.starknetAddress]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-white">Portfolio</h1>
        <p className="text-brand-blue-gray">Shielded positions dan riwayat yield.</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <ShieldedBalanceCard />
          <TxHistoryTable rows={rows} />
        </div>

        <Card shimmerBorder className="space-y-2">
          <p className="text-sm text-brand-blue-gray">Accrued Yield</p>
          <p className="font-display text-3xl text-white">●●●● sBTC</p>
          <p className="text-sm text-brand-blue-gray">4.2% APY</p>
        </Card>
      </div>
    </section>
  );
}
