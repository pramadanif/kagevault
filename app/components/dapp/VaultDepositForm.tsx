'use client';

// KAGE VAULT — VaultDepositForm | Match landing page design system
import React, { useMemo, useState } from 'react';
import { Bitcoin } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const VaultDepositForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');

  const mockFee = useMemo(() => {
    const parsed = Number(amount || 0);
    return Number.isFinite(parsed) ? (0.00012 + parsed * 0.00003).toFixed(6) : '0.000120';
  }, [amount]);

  return (
    <Card className="space-y-5" shimmerBorder>
      <h3 className="font-display text-2xl font-bold text-white">Deposit to Vault</h3>

      <label className="block space-y-2">
        <span className="text-sm font-mono uppercase tracking-wider text-brand-blue-gray">BTC Amount</span>
        <div className="flex items-center gap-3 bg-navy-deep border border-navy-border rounded-xl px-4 py-3">
          <Bitcoin className="w-4 h-4 text-brand-orange" />
          <input
            type="number"
            min="0"
            step="0.0001"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.0000"
            className="w-full bg-transparent outline-none text-white placeholder:text-brand-muted"
          />
        </div>
      </label>

      <div className="flex items-center justify-between rounded-xl border border-navy-border bg-navy-deep/60 px-4 py-3">
        <span className="text-sm text-brand-blue-gray">Estimated Gas Fee</span>
        <span className="font-mono text-sm text-white">{mockFee} BTC</span>
      </div>

      <Button className="w-full" size="lg">
        Deposit &amp; Shield
      </Button>

      <p className="text-xs text-brand-blue-gray">Your amount will be encrypted on-chain</p>

      {/* TODO: call deposit_shielded() Cairo contract function */}
    </Card>
  );
};

export default VaultDepositForm;
