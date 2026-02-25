'use client';

// KAGE VAULT — YieldMeter | Match landing page design system
import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';

interface YieldMeterProps {
  apy: string;
}

export const YieldMeter: React.FC<YieldMeterProps> = ({ apy }) => {
  const widthClasses = ['w-1/3', 'w-2/5', 'w-1/2', 'w-3/5', 'w-2/3', 'w-3/4', 'w-4/5'];
  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressIndex((prev) => (prev + 1) % widthClasses.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [widthClasses.length]);

  return (
    <Card className="space-y-4" shimmerBorder>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-white">Yield Meter</h3>
        <span className="font-mono text-sm text-brand-orange">APY {apy}</span>
      </div>

      <div className="h-2.5 rounded-full bg-navy-deep overflow-hidden">
        <div className={`h-full bg-brand-orange relative transition-all duration-700 ${widthClasses[progressIndex]}`}>
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </div>
      </div>

      <p className="text-sm text-brand-blue-gray">Shielded yield is accumulating privately and compounding on strategy rotation.</p>
    </Card>
  );
};

export default YieldMeter;
