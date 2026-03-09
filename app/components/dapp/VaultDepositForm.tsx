'use client';

// KAGE VAULT — VaultDepositForm | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useEffect, useMemo, useState } from 'react';
import { Bitcoin } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import ZKProofTerminal from './ZKProofTerminal';
import { useKageVault } from '@/hooks/useKageVault';
import { useStarknetWallet } from '@/hooks/useStarknetWallet';
import { useZKProof } from '@/hooks/useZKProof';
import { CONTRACTS } from '@/lib/constants';
import { getWbtcContract, provider, readWbtcAllowance, waitForTx } from '@/lib/starknet';

type DepositStep = 'approve' | 'generate-proof' | 'deposit';

export const VaultDepositForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [gasEstimate, setGasEstimate] = useState('...');
  const [approvalReady, setApprovalReady] = useState(false);
  const [step, setStep] = useState<DepositStep>('approve');
  const [proofOverlayOpen, setProofOverlayOpen] = useState(false);
  const [latestHash, setLatestHash] = useState('');
  const [generatedProof, setGeneratedProof] = useState<Awaited<ReturnType<typeof zkProof.generateProof>> | null>(null);

  const starknetWallet = useStarknetWallet();
  const kageVault = useKageVault();
  const zkProof = useZKProof();

  const mockFee = useMemo(() => {
    const parsed = Number(amount || 0);
    return Number.isFinite(parsed) ? (0.00012 + parsed * 0.00003).toFixed(6) : '0.000120';
  }, [amount]);

  useEffect(() => {
    const readGasPrice = async () => {
      const gasPrice = await provider.getGasPrices();
      const value = gasPrice.l1GasPrice || 0n;
      setGasEstimate(`${value.toString()} wei`);
    };

    void readGasPrice();
  }, []);

  useEffect(() => {
    const checkAllowance = async () => {
      if (!starknetWallet.account || !starknetWallet.starknetAddress || !amount) {
        setApprovalReady(false);
        return;
      }

      const parsedAmount = BigInt(Math.floor(Number(amount) * 1e8));
      const allowanceValue = await readWbtcAllowance(starknetWallet.starknetAddress);

      setApprovalReady(allowanceValue >= parsedAmount && parsedAmount > 0n);
      setStep(allowanceValue >= parsedAmount ? 'generate-proof' : 'approve');
    };

    void checkAllowance();
  }, [amount, starknetWallet.account, starknetWallet.starknetAddress]);

  const ctaLabel =
    step === 'approve' ? 'Approve wBTC' : step === 'generate-proof' ? 'Generating ZK Proof...' : 'Deposit to Vault';

  const handleSubmit = async () => {
    if (!starknetWallet.starknetAddress || !amount || Number(amount) < 0.00001) return;

    const parsedAmount = BigInt(Math.floor(Number(amount) * 1e8));

    if (!approvalReady || step === 'approve') {
      if (!starknetWallet.account) return;
      const wbtc = getWbtcContract(starknetWallet.account);
      const approveTx = await (
        wbtc as unknown as { approve: (spender: string, value: bigint) => Promise<{ transaction_hash: string }> }
      ).approve(CONTRACTS.KAGE_VAULT, parsedAmount);
      await waitForTx(approveTx.transaction_hash);
      setStep('generate-proof');
      setApprovalReady(true);
      return;
    }

    if (step === 'generate-proof') {
      setProofOverlayOpen(true);
      const currentBalance = await kageVault.readBalance(starknetWallet.starknetAddress);
      const proof = await zkProof.generateProof({
        amount: parsedAmount,
        userPublicKeyX: '0x1234',
        userPublicKeyY: '0x5678',
        currentBalanceCipher: currentBalance,
      });
      setGeneratedProof(proof);
      setProofOverlayOpen(false);
      setStep('deposit');
      return;
    }

    if (step === 'deposit' && generatedProof) {
      const txHash = await kageVault.deposit(parsedAmount, generatedProof, generatedProof.new_balance_cipher);
      setLatestHash(txHash);
    }
  };

  return (
    <>
      <Card className="space-y-5" shimmerBorder>
        <h3 className="font-display text-2xl font-bold text-white">Deposit to Vault</h3>

        <label className="block space-y-2">
          <span className="text-sm font-mono uppercase tracking-wider text-brand-blue-gray">BTC Amount</span>
          <div className="flex items-center gap-3 bg-navy-deep border border-navy-border rounded-xl px-4 py-3">
            <Bitcoin className="w-4 h-4 text-brand-orange" />
            <input
              type="number"
              min="0.00001"
              step="0.00000001"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00000000"
              className="w-full bg-transparent outline-none text-white placeholder:text-brand-muted"
            />
          </div>
        </label>

        <div className="rounded-xl border border-navy-border bg-navy-deep/60 px-4 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-brand-blue-gray">Estimated Gas (Sepolia)</span>
            <span className="font-mono text-sm text-white">{gasEstimate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-brand-blue-gray">Fallback Estimate</span>
            <span className="font-mono text-sm text-white">{mockFee} BTC</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-brand-blue-gray">wBTC Approval</span>
            <span className={`font-mono text-sm ${approvalReady ? 'text-green-400' : 'text-brand-muted'}`}>
              {approvalReady ? 'Approved' : 'Not Approved'}
            </span>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit}
          disabled={!starknetWallet.isConnected || Number(amount) < 0.00001 || kageVault.isDepositing || kageVault.isWithdrawing}
        >
          {kageVault.isDepositing ? 'Submitting...' : ctaLabel}
        </Button>

        <p className="text-xs text-brand-blue-gray">Your amount will be stored as encrypted ciphertext on-chain</p>
        {!starknetWallet.isConnected && (
          <p className="text-xs font-mono text-red-400">Connect Starknet wallet to continue.</p>
        )}
        {kageVault.error && <p className="text-xs font-mono text-red-400">{kageVault.error}</p>}

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

        {/* TODO: call deposit_shielded() Cairo contract function */}
      </Card>

      <ZKProofTerminal isOpen={proofOverlayOpen} onClose={() => setProofOverlayOpen(false)} proofHash={zkProof.proofHash} />
    </>
  );
};

export default VaultDepositForm;
