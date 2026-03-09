'use client';

// KAGE VAULT — BridgeStatusStepper | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React from 'react';
import { Bitcoin, CheckCircle2, CircleDot, Lock, Network, Shield } from 'lucide-react';

export type BridgeStep = {
  step: number;
  label: string;
  status: 'complete' | 'active' | 'pending';
  timestamp?: string;
  btcTxHash?: string;
  atomiqSwapId?: string;
  starknetTxHash?: string;
};

interface BridgeStatusStepperProps {
  steps: BridgeStep[];
}

export const BridgeStatusStepper: React.FC<BridgeStatusStepperProps> = ({ steps }) => {
  const iconByStep = {
    1: Bitcoin,
    2: Lock,
    3: Network,
    4: Shield,
  } as const;

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-surface p-5 sm:p-6">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';
          const Icon = iconByStep[step.step as 1 | 2 | 3 | 4] || CircleDot;

          return (
            <div key={step.step} className="relative pl-9">
              {index < steps.length - 1 && <div className="absolute left-[11px] top-6 h-10 w-px bg-navy-border" />}

              <div className="absolute left-0 top-0.5">
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-orange animate-pulse' : 'text-brand-muted'}`} />
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <p className={`font-medium ${isActive ? 'text-white' : 'text-brand-blue-gray'}`}>{step.step}. {step.label}</p>
                <span className="text-xs font-mono text-brand-muted">{step.timestamp || 'pending'}</span>
              </div>

              <div className="mt-1 text-xs font-mono text-brand-muted space-y-1">
                {step.btcTxHash && (
                  <a
                    href={`https://mempool.space/testnet4/tx/${step.btcTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-blue-gray hover:text-white"
                  >
                    BTC Tx: {step.btcTxHash.slice(0, 10)}...{step.btcTxHash.slice(-6)}
                  </a>
                )}
                {step.atomiqSwapId && <p>Atomiq Swap: {step.atomiqSwapId}</p>}
                {step.starknetTxHash && (
                  <a
                    href={`https://sepolia.starkscan.co/tx/${step.starknetTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-blue-gray hover:text-white"
                  >
                    Starknet Tx: {step.starknetTxHash.slice(0, 10)}...{step.starknetTxHash.slice(-6)}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BridgeStatusStepper;
