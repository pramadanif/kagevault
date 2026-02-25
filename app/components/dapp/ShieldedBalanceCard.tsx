'use client';

// KAGE VAULT — ShieldedBalanceCard | Match landing page design system
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';

interface ShieldedBalanceCardProps {
  balance?: string;
  accruedYield?: string;
}

export const ShieldedBalanceCard: React.FC<ShieldedBalanceCardProps> = ({
  balance = '0.50000 sBTC',
  accruedYield = '0.00234 sBTC',
}) => {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card shimmerBorder className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-white">Your Shielded Balance</h3>
        <button
          type="button"
          onClick={() => setRevealed((prev) => !prev)}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-navy-border bg-navy-deep text-brand-blue-gray hover:text-white transition-colors"
          aria-label="Toggle shielded balance visibility"
        >
          {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-navy-border bg-navy-deep p-4">
        {loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        )}
        <p className="font-display text-3xl font-bold text-white relative z-10">
          {revealed ? balance : '●●●●● sBTC'}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-brand-blue-gray">Accrued Yield</span>
        <Tag variant="green">+{accruedYield}</Tag>
      </div>
    </Card>
  );
};

export default ShieldedBalanceCard;
