'use client';

// KAGE VAULT — TVLCounter | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { readTotalTVL } from '@/lib/starknet';

const SATS_PER_BTC = 100000000;

const formatBtc = (value: bigint) => {
  const integer = Number(value / BigInt(SATS_PER_BTC));
  const fraction = Number(value % BigInt(SATS_PER_BTC));
  return `${integer.toLocaleString()}.${fraction.toString().padStart(8, '0')} wBTC`;
};

export const TVLCounter: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<bigint>(0n);
  const [targetValue, setTargetValue] = useState<bigint>(0n);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const syncTVL = async () => {
      const nextValue = await readTotalTVL();
      setTargetValue(nextValue);
    };

    void syncTVL();
    const interval = window.setInterval(syncTVL, 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (displayValue === targetValue) return;

    const start = displayValue;
    const diff = targetValue - start;
    const duration = 700;
    const startedAt = performance.now();

    const frame = (now: number) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - elapsed) * (1 - elapsed);
      const next = start + BigInt(Math.round(Number(diff) * eased));
      setDisplayValue(next);

      if (elapsed < 1) {
        animationRef.current = window.requestAnimationFrame(frame);
      }
    };

    animationRef.current = window.requestAnimationFrame(frame);
    return () => {
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [displayValue, targetValue]);

  const formatted = useMemo(() => formatBtc(displayValue), [displayValue]);

  return <p className="font-display text-3xl font-bold text-white">{formatted}</p>;
};

export default TVLCounter;
