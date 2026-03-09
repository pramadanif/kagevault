'use client';

// KAGE VAULT — DashboardPage | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import ShieldedBalanceCard from '@/app/components/dapp/ShieldedBalanceCard';
import YieldMeter from '@/app/components/dapp/YieldMeter';
import TVLCounter from '@/app/components/dapp/TVLCounter';
import NetworkBadge from '@/app/components/dapp/NetworkBadge';
import { fetchVaultEvents } from '@/lib/starknet';

export default function DashboardPage() {
  const [depositCount, setDepositCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const readDepositCount = async () => {
      try {
        const events = await fetchVaultEvents();
        const data = events.filter((eventItem) => eventItem.type === 'ShieldedDeposit');
        if (!cancelled) {
          setDepositCount(data.length);
        }
      } catch {
        if (!cancelled) setDepositCount(null);
      }
    };

    void readDepositCount();
    const interval = window.setInterval(readDepositCount, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-brand-blue-gray">Overview protokol shielded yield pada Starknet Sepolia.</p>
        </div>
        <NetworkBadge label="Starknet Sepolia Testnet" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card shimmerBorder>
          <p className="text-sm text-brand-blue-gray">Total Vault TVL</p>
          <TVLCounter />
        </Card>
        <Card shimmerBorder>
          <p className="text-sm text-brand-blue-gray">Total Shielded Deposits</p>
          <p className="font-display text-3xl font-bold text-white mt-2">{depositCount ?? '-'}</p>
        </Card>
        <Card shimmerBorder>
          <p className="text-sm text-brand-blue-gray">Network</p>
          <p className="font-display text-2xl font-bold text-white mt-2">Sepolia Testnet</p>
        </Card>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <ShieldedBalanceCard />
          <YieldMeter apy="4.2%" />
        </div>

        <Card shimmerBorder className="space-y-3">
          <h2 className="font-display text-xl font-bold text-white">Quick Actions</h2>
          <Link href="/vault"><Button className="w-full">Deposit</Button></Link>
          <Link href="/vault"><Button variant="outline" className="w-full">Withdraw</Button></Link>
          <Link href="/bridge"><Button variant="ghost" className="w-full">Bridge</Button></Link>
        </Card>
      </div>
    </section>
  );
}
