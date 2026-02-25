'use client';

// KAGE VAULT — VaultWithdrawForm | Match landing page design system
import React, { useMemo, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import ZKProofTerminal from './ZKProofTerminal';

type ProofState = 'idle' | 'generating' | 'verified';

export const VaultWithdrawForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [proofState, setProofState] = useState<ProofState>('idle');

  const statusLabel = useMemo(() => {
    if (proofState === 'generating') return 'Generating';
    if (proofState === 'verified') return 'Verified';
    return 'Idle';
  }, [proofState]);

  const handleWithdraw = () => {
    setProofState('generating');
  };

  const handleTerminalClose = () => {
    setProofState('verified');
  };

  return (
    <>
      <Card className="space-y-5" shimmerBorder>
        <h3 className="font-display text-2xl font-bold text-white">Withdraw from Vault</h3>

        <label className="block space-y-2">
          <span className="text-sm font-mono uppercase tracking-wider text-brand-blue-gray">Amount to Withdraw</span>
          <input
            type="number"
            min="0"
            step="0.0001"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.0000"
            className="w-full rounded-xl border border-navy-border bg-navy-deep px-4 py-3 text-white placeholder:text-brand-muted outline-none"
          />
        </label>

        <div className="rounded-xl border border-navy-border bg-navy-deep/60 p-4 space-y-2">
          <p className="text-sm text-brand-blue-gray">Zero-Knowledge Proof Status</p>
          <Tag variant={proofState === 'verified' ? 'green' : 'blue'}>{statusLabel}</Tag>
        </div>

        <Button className="w-full" size="lg" onClick={handleWithdraw}>
          Generate Proof &amp; Withdraw
        </Button>

        {/* TODO: call WASM prover then withdraw_shielded() */}
      </Card>

      <ZKProofTerminal isOpen={proofState === 'generating'} onClose={handleTerminalClose} />
    </>
  );
};

export default VaultWithdrawForm;
