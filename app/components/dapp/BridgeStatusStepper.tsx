'use client';

// KAGE VAULT — BridgeStatusStepper | Match landing page design system
import React from 'react';
import { CheckCircle2, CircleDot } from 'lucide-react';

export type BridgeStep = {
  step: number;
  label: string;
  status: 'complete' | 'active' | 'pending';
  time: string;
};

interface BridgeStatusStepperProps {
  steps: BridgeStep[];
}

export const BridgeStatusStepper: React.FC<BridgeStatusStepperProps> = ({ steps }) => {
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-surface p-5 sm:p-6">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';

          return (
            <div key={step.step} className="relative pl-9">
              {index < steps.length - 1 && <div className="absolute left-[11px] top-6 h-10 w-px bg-navy-border" />}

              <div className="absolute left-0 top-0.5">
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <CircleDot className={`w-5 h-5 ${isActive ? 'text-brand-orange animate-pulse' : 'text-brand-muted'}`} />
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <p className={`font-medium ${isActive ? 'text-white' : 'text-brand-blue-gray'}`}>{step.step}. {step.label}</p>
                <span className="text-xs font-mono text-brand-muted">{step.time || 'pending'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BridgeStatusStepper;
