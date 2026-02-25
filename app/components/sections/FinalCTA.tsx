'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, Lock, ShieldCheck, Zap } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-32 bg-navy-surface relative overflow-hidden border-t border-navy-border">
      {/* Decorative Kanji */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-display font-black text-white/[0.04] select-none pointer-events-none leading-none">
        影
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-display text-4xl md:text-[56px] leading-tight font-bold text-white mb-6">
          Ready to shield your Bitcoin yield?
        </h2>
        
        <p className="text-xl text-brand-blue-gray mb-12 max-w-2xl mx-auto">
          Connect your Xverse wallet and deploy capital with institutional-grade privacy today.
        </p>
        
        <Button size="lg" className="w-full md:w-[360px] group mb-10 text-lg">
          Enter Kage Vault
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-mono text-brand-blue-gray">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-orange" /> Non-custodial
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-orange" /> ZK-Verified
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-orange" /> &lt; 2s Proof Time
          </span>
        </div>
      </div>
    </section>
  );
};
