'use client';

// KAGE VAULT — VaultPage | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useState } from 'react';
import VaultDepositForm from '@/app/components/dapp/VaultDepositForm';
import VaultWithdrawForm from '@/app/components/dapp/VaultWithdrawForm';
import { useStarknetWallet } from '@/hooks/useStarknetWallet';

type VaultTab = 'deposit' | 'withdraw';

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState<VaultTab>('deposit');
  const starknetWallet = useStarknetWallet();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-white">Vault</h1>
        <p className="text-brand-blue-gray">Deposit atau withdraw posisi shielded Anda.</p>
      </div>

      <div className="inline-flex items-center gap-1 rounded-full border border-navy-border bg-navy-surface/60 p-1">
        <button
          type="button"
          onClick={() => setActiveTab('deposit')}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            activeTab === 'deposit' ? 'bg-navy-border text-white' : 'text-brand-blue-gray hover:text-white'
          }`}
        >
          Deposit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('withdraw')}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            activeTab === 'withdraw' ? 'bg-navy-border text-white' : 'text-brand-blue-gray hover:text-white'
          }`}
        >
          Withdraw
        </button>
      </div>

      {!starknetWallet.isConnected && (
        <p className="text-sm font-mono text-red-400">Connect Starknet wallet before using vault forms.</p>
      )}

      {activeTab === 'deposit' ? <VaultDepositForm /> : <VaultWithdrawForm />}
    </section>
  );
}
