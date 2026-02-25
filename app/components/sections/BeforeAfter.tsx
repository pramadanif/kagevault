'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export const BeforeAfter = () => {
  const [showShielded, setShowShielded] = useState(false);

  return (
    <section className="py-32" id="privacy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-brand-orange text-sm tracking-wider uppercase mb-4 block">Privacy</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Stop Broadcasting Your Strategy.
          </h2>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-center mb-8">
          <div className="bg-navy-surface p-1 rounded-xl flex">
            <button 
              onClick={() => setShowShielded(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!showShielded ? 'bg-red-500/20 text-red-400' : 'text-brand-blue-gray'}`}
            >
              Standard DeFi
            </button>
            <button 
              onClick={() => setShowShielded(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showShielded ? 'bg-green-500/20 text-green-400' : 'text-brand-blue-gray'}`}
            >
              Kage Vault
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Left Panel */}
          <div className={`relative bg-navy-surface border border-navy-border rounded-2xl overflow-hidden ${showShielded ? 'hidden md:block opacity-50' : 'block'}`}>
            <div className="absolute inset-0 bg-red-500/[0.06]" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-500" />
            
            <div className="relative p-6">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3 text-red-400 font-bold">
                  <AlertTriangle className="w-6 h-6" />
                  Standard DeFi
                </div>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Exposed
                </span>
              </div>

              <div className="font-mono text-sm space-y-4 text-brand-blue-gray">
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Wallet</span>
                  <span className="text-white">0xAb3f...9D2c</span>
                </div>
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Action</span>
                  <span className="text-white">Deposit</span>
                </div>
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Amount</span>
                  <span className="text-red-400 font-bold">50.400000 BTC</span>
                </div>
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Pool</span>
                  <span className="text-white">LP-BTC/USDC</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Strategy</span>
                  <span className="text-red-400">Tracked by Arkham/Nansen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex justify-center">
            <div className="w-12 h-12 rounded-full bg-navy-surface border border-navy-border flex items-center justify-center text-brand-orange">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Right Panel */}
          <div className={`relative bg-navy-surface border border-navy-border rounded-2xl overflow-hidden ${!showShielded ? 'hidden md:block' : 'block'}`}>
            <div className="absolute inset-0 bg-green-500/[0.05]" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-green-500" />
            
            <div className="relative p-6">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3 text-green-400 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                  Kage Vault
                </div>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Shielded ✓
                </span>
              </div>

              <div className="font-mono text-sm space-y-4 text-brand-blue-gray">
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Wallet</span>
                  <span className="text-white bg-white/10 px-2 rounded relative overflow-hidden">
                    ████████████
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                  </span>
                </div>
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Action</span>
                  <span className="text-green-400">[ENCRYPTED]</span>
                </div>
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Amount</span>
                  <span className="text-white bg-white/10 px-2 rounded relative overflow-hidden">
                    ████████ BTC
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                  </span>
                </div>
                <div className="flex justify-between border-b border-navy-border/50 pb-2">
                  <span>Proof</span>
                  <span className="text-green-400">ZK-STARK ✓</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Status</span>
                  <span className="text-green-400">Shielded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
