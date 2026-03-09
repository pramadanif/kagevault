'use client';

// KAGE VAULT — VaultWithdrawForm | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useMemo, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import ZKProofTerminal from './ZKProofTerminal';
import { useStarknetWallet } from '@/hooks/useStarknetWallet';
import { useKageVault } from '@/hooks/useKageVault';
import { useZKProof } from '@/hooks/useZKProof';
import ShieldedBalanceCard from './ShieldedBalanceCard';

type ProofState = 'idle' | 'generating' | 'verified';

export const VaultWithdrawForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [proofState, setProofState] = useState<ProofState>('idle');
  const [latestHash, setLatestHash] = useState('');

  const starknetWallet = useStarknetWallet();
  const kageVault = useKageVault();
  const zkProof = useZKProof();

  const statusLabel = useMemo(() => {
    if (proofState === 'generating') return 'Generating';
    if (proofState === 'verified') return 'Verified';
    return 'Idle';
  }, [proofState]);

  const handleWithdraw = async () => {
    if (!starknetWallet.starknetAddress || Number(amount) <= 0) return;

    setProofState('generating');

    const parsedAmount = BigInt(Math.floor(Number(amount) * 1e8));
    const currentBalance = await kageVault.readBalance(starknetWallet.starknetAddress);

    const proof = await zkProof.generateProof({
      amount: parsedAmount,
      userPublicKeyX: '0x1234',
      userPublicKeyY: '0x5678',
      currentBalanceCipher: currentBalance,
    });

    const txHash = await kageVault.withdraw(proof, starknetWallet.starknetAddress, parsedAmount);
    setLatestHash(txHash);
    setProofState('verified');
  };

  const handleTerminalClose = () => {
    setProofState('verified');
  };

  return (
    <>
      <Card className="space-y-5" shimmerBorder>
        <h3 className="font-display text-2xl font-bold text-white">Withdraw from Vault</h3>

        <ShieldedBalanceCard />

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

        {latestHash && (
          <a
            href={`https://sepolia.starkscan.co/tx/${latestHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-blue-gray hover:text-white"
          >
            View Starknet Tx: {latestHash.slice(0, 10)}...{latestHash.slice(-6)}
          </a>
        )}

        {!starknetWallet.isConnected && (
          <p className="text-xs font-mono text-red-400">Connect Starknet wallet to continue.</p>
        )}
        {kageVault.error && <p className="text-xs font-mono text-red-400">{kageVault.error}</p>}

        {/* TODO: call WASM prover then withdraw_shielded() */}
      </Card>

      <ZKProofTerminal isOpen={proofState === 'generating'} onClose={handleTerminalClose} proofHash={zkProof.proofHash} />
    </>
  );
};

export default VaultWithdrawForm;
