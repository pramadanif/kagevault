'use client';

import React from 'react';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export const Metrics = () => {
  return (
    <section className="bg-navy-surface py-20 border-y border-brand-orange/30 relative">
      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-4 opacity-50">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="text-brand-orange font-mono text-[10px] leading-none">////</div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pl-12">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-navy-border">
          <div className="py-8 md:py-0 md:px-8 flex flex-col justify-center">
            <div className="font-display font-extrabold text-6xl lg:text-[80px] text-white mb-2">
              <AnimatedCounter value={100} suffix="%" />
            </div>
            <div className="text-brand-blue-gray text-sm uppercase tracking-wider font-mono">On-Chain Verifiability</div>
          </div>
          
          <div className="py-8 md:py-0 md:px-8 flex flex-col justify-center">
            <div className="font-display font-extrabold text-6xl lg:text-[80px] text-white mb-2">
              <AnimatedCounter value={2} prefix="< " suffix="s" />
            </div>
            <div className="text-brand-blue-gray text-sm uppercase tracking-wider font-mono">Client-Side Proving Time</div>
          </div>
          
          <div className="py-8 md:py-0 md:px-8 flex flex-col justify-center">
            <div className="font-display font-extrabold text-6xl lg:text-[80px] text-white mb-2">
              <AnimatedCounter value={0} />
            </div>
            <div className="text-brand-blue-gray text-sm uppercase tracking-wider font-mono">Bytes User Data Leaked</div>
          </div>
        </div>
      </div>
    </section>
  );
};
