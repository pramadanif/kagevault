'use client';

// KAGE VAULT — useBridgeStatus | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import { useEffect, useRef, useState } from 'react';
import { ATOMIQ_API } from '@/lib/constants';

export type BridgeStepStatus = 'pending' | 'active' | 'complete';

export type BridgeStep = {
  step: 1 | 2 | 3 | 4;
  label: string;
  status: BridgeStepStatus;
  timestamp?: string;
  btcTxHash?: string;
  atomiqSwapId?: string;
  starknetTxHash?: string;
};

export function useBridgeStatus(btcTxHash: string | null) {
  const [steps, setSteps] = useState<BridgeStep[]>([
    { step: 1, label: 'BTC Sent on Bitcoin L1', status: 'pending' },
    { step: 2, label: 'HTLC Contract Locked (Atomiq)', status: 'pending' },
    { step: 3, label: 'wBTC Minted on Starknet Sepolia', status: 'pending' },
    { step: 4, label: 'sBTC Shielded in Kage Vault', status: 'pending' },
  ]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const defaultSteps = (): BridgeStep[] => [
    { step: 1, label: 'BTC Sent on Bitcoin L1', status: 'pending' },
    { step: 2, label: 'HTLC Contract Locked (Atomiq)', status: 'pending' },
    { step: 3, label: 'wBTC Minted on Starknet Sepolia', status: 'pending' },
    { step: 4, label: 'sBTC Shielded in Kage Vault', status: 'pending' },
  ];

  const pollStatus = async () => {
    if (!btcTxHash) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${ATOMIQ_API}/swap/btc-starknet/${btcTxHash}`, {
        signal: AbortSignal.timeout(10000),
      });

      const nextSteps = defaultSteps();
      let nextCurrent = 1;

      if (response.ok) {
        const swap = (await response.json()) as Record<string, string>;

        nextSteps[0].status = 'complete';
        nextSteps[0].btcTxHash = btcTxHash;
        nextSteps[0].timestamp = swap.createdAt ? new Date(swap.createdAt).toLocaleTimeString() : undefined;
        nextCurrent = 2;

        if (swap.htlcTxHash || swap.status === 'locked' || swap.status === 'completed') {
          nextSteps[1].status = 'complete';
          nextSteps[1].atomiqSwapId = swap.swapId;
          nextSteps[1].timestamp = swap.lockedAt ? new Date(swap.lockedAt).toLocaleTimeString() : undefined;
          nextCurrent = 3;
        } else {
          nextSteps[1].status = 'active';
        }

        if (swap.starknetMintTxHash || swap.status === 'completed') {
          nextSteps[2].status = 'complete';
          nextSteps[2].starknetTxHash = swap.starknetMintTxHash;
          nextSteps[2].timestamp = swap.mintedAt ? new Date(swap.mintedAt).toLocaleTimeString() : undefined;
          nextCurrent = 4;
        } else if (nextCurrent === 3) {
          nextSteps[2].status = 'active';
        }

        if (swap.status === 'completed' && swap.vaultDepositTxHash) {
          nextSteps[3].status = 'complete';
          nextSteps[3].starknetTxHash = swap.vaultDepositTxHash;
        } else if (nextCurrent === 4) {
          nextSteps[3].status = 'active';
        }
      } else {
        nextSteps[0].status = 'active';
      }

      setSteps(nextSteps);
      setCurrentStep(nextCurrent);
    } catch {
      setError('Checking bridge status... (Atomiq API may have CORS restrictions from browser)');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!btcTxHash) {
      setSteps(defaultSteps());
      setCurrentStep(1);
      setError('');
      return;
    }

    void pollStatus();
    intervalRef.current = setInterval(pollStatus, 15000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [btcTxHash]);

  return {
    steps,
    currentStep,
    isLoading,
    error,
    refresh: pollStatus,
  };
}
