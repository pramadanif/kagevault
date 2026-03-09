'use client';

// KAGE VAULT — BridgePage | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useMemo, useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import BridgeStatusStepper from '@/app/components/dapp/BridgeStatusStepper';
import { useBridgeStatus } from '@/hooks/useBridgeStatus';

export default function BridgePage() {
  const [btcTxHash, setBtcTxHash] = useState('');
  const bridgeStatus = useBridgeStatus(btcTxHash);

  const normalizedSteps = useMemo(
    () =>
      bridgeStatus.steps.length
        ? bridgeStatus.steps
        : [
            { step: 1, label: 'BTC Sent on Bitcoin L1', status: 'pending' as const },
            { step: 2, label: 'HTLC Contract Locked (Atomiq)', status: 'pending' as const },
            { step: 3, label: 'wBTC Minted on Starknet Sepolia', status: 'pending' as const },
            { step: 4, label: 'sBTC Shielded in Kage Vault', status: 'pending' as const },
          ],
    [bridgeStatus.steps]
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-white">Bridge</h1>
        <p className="text-brand-blue-gray">Tracker status BTC → Starknet shielded flow.</p>
      </div>

      <Card shimmerBorder className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-mono uppercase tracking-wider text-brand-blue-gray">BTC Transaction Hash</span>
          <input
            value={btcTxHash}
            onChange={(event) => setBtcTxHash(event.target.value.trim())}
            placeholder="Enter BTC tx hash"
            className="w-full rounded-xl border border-navy-border bg-navy-deep px-4 py-3 text-white placeholder:text-brand-muted outline-none"
          />
        </label>

        {bridgeStatus.error && <p className="text-xs font-mono text-red-400">{bridgeStatus.error}</p>}
        {bridgeStatus.isLoading && <p className="text-xs font-mono text-brand-blue-gray">Syncing bridge status...</p>}

        <BridgeStatusStepper steps={normalizedSteps} />
      </Card>
    </section>
  );
}
