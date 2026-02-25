'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { Lock, ShieldCheck, ArrowRight, Bitcoin, Network } from 'lucide-react';

export const FeatureBento = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-32 relative" id="architecture">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3E468A_1px,transparent_1px),linear-gradient(to_bottom,#3E468A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.02]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="font-mono text-brand-orange text-sm tracking-wider uppercase mb-4 block">Architecture</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Built Different. Proven On-Chain.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card A - Large (Code Snippet) */}
          <div className="md:col-span-2 h-full">
            <Card shimmerBorder className="group flex flex-col p-0 overflow-hidden min-h-[320px] h-full">
              <div className="p-6 pb-4 border-b border-navy-border/50 bg-navy-surface/50">
                <h3 className="text-2xl font-display font-bold text-white mb-1">Native Finite Field Arithmetic</h3>
                <p className="text-brand-blue-gray text-sm">Optimized for Cairo's algebraic structure.</p>
              </div>
              <div className="flex-1 bg-[#0D1117] relative overflow-hidden flex flex-col">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-brand-muted">shield.cairo</span>
                </div>
                {/* Code */}
                <div className="p-4 font-mono text-sm leading-relaxed overflow-hidden relative flex-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-orange/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <div className="flex">
                    <div className="flex flex-col text-brand-muted/50 pr-4 select-none text-right border-r border-white/5 mr-4">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                    <pre className="relative z-10 text-brand-blue-gray overflow-x-auto">
                      <span className="text-[#FF7B72]">fn</span> <span className="text-[#D2A8FF]">deposit_shielded</span>(proof: <span className="text-[#79C0FF]">Proof</span>, ciphertext: <span className="text-[#79C0FF]">Ciphertext</span>) {'{\n'}
                      <span className="text-[#8B949E]">{'  '}// Twisted ElGamal encryption</span>{'\n'}
                      <span className="text-[#8B949E]">{'  '}// Plaintext never stored on-chain</span>{'\n'}
                      {'  '}<span className="text-[#D2A8FF]">verify_range_proof</span>(proof){'\n'}
                      {'}'}
                      <motion.span 
                        animate={{ opacity: [1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-brand-orange ml-1 align-middle"
                      />
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Card B - Medium (Encryption) */}
          <div className="md:col-span-1 h-full">
            <Card shimmerBorder className="flex flex-col items-center justify-center text-center group relative overflow-hidden min-h-[320px] h-full">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20" />
              
              <div className="relative mb-8 mt-4">
                <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                
                {/* Rotating Dashed Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-dashed border-brand-orange/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border border-dashed border-navy-border/50 rounded-full"
                />

                <div className="w-16 h-16 rounded-full bg-navy-deep border border-brand-orange/50 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(243,89,23,0.2)] group-hover:shadow-[0_0_50px_rgba(243,89,23,0.4)] transition-shadow duration-500">
                  <Lock className="w-8 h-8 text-brand-orange" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2 relative z-10">Twisted ElGamal</h3>
              <p className="text-brand-blue-gray text-sm relative z-10">Keys derived from Starknet signatures. Bulletproofs-style range proofs.</p>
            </Card>
          </div>

          {/* Card C - Medium (ZK Proofs) */}
          <div className="md:col-span-1 h-full">
            <Card shimmerBorder className="flex flex-col justify-between group relative overflow-hidden min-h-[320px] h-full">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="relative w-14 h-14 rounded-xl bg-navy-deep border border-navy-border flex items-center justify-center overflow-hidden">
                  <ShieldCheck className="w-7 h-7 text-white relative z-10" />
                  {/* Scanning Laser Effect */}
                  <motion.div 
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.8)] z-20"
                  />
                </div>
                <Tag variant="blue" className="shadow-[0_0_15px_rgba(160,171,219,0.2)]">QUANTUM-RESISTANT</Tag>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold text-white mb-2">Native Cairo STARKs</h3>
                <p className="text-brand-blue-gray text-sm">Relies on hash functions, not elliptic curves. Cheapest verification for complex ElGamal additions.</p>
              </div>
            </Card>
          </div>

          {/* Card D - Large (Bridge) */}
          <div className="md:col-span-2 h-full">
            <Card shimmerBorder className="flex flex-col justify-between group relative overflow-hidden min-h-[320px] h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Base-Layer Bitcoin</h3>
                <p className="text-brand-blue-gray">Starknet treats BTC as base-layer money. Cross-chain L1 ↔ L2 via Atomiq HTLCs.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 relative z-10">
                {/* L1 Node */}
                <div className="relative w-full sm:w-auto shrink-0">
                  <div className="absolute inset-0 bg-brand-orange/20 blur-xl rounded-full" />
                  <div className="bg-navy-deep px-4 py-3 sm:px-6 sm:py-4 rounded-xl border border-navy-border font-mono text-white flex items-center justify-center gap-2 sm:gap-3 relative z-10 text-sm sm:text-base">
                    <Bitcoin className="w-5 h-5 text-brand-orange" />
                    BTC L1
                  </div>
                </div>

                {/* Animated Bridge */}
                <div className="flex-1 relative w-full sm:w-auto h-12 flex items-center justify-center min-w-[60px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="hidden sm:block w-full h-px border-t-2 border-dashed border-navy-border" />
                    <div className="sm:hidden h-full w-px border-l-2 border-dashed border-navy-border" />
                  </div>
                  
                  {/* Moving Particles (Desktop) */}
                  {mounted && (
                    <div className="hidden sm:block">
                      <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-orange shadow-[0_0_15px_rgba(243,89,23,0.8)]"
                        animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                  
                  {/* Center Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-navy-surface px-2 sm:px-3 py-1 rounded-full border border-navy-border text-[10px] sm:text-xs font-mono text-brand-blue-gray uppercase tracking-wider flex items-center gap-1 sm:gap-2 whitespace-nowrap z-10">
                    <ArrowRight className="w-3 h-3 hidden sm:block" />
                    Atomiq HTLC
                  </div>
                </div>

                {/* L2 Node */}
                <div className="relative w-full sm:w-auto shrink-0">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                  <div className="bg-navy-deep px-4 py-3 sm:px-6 sm:py-4 rounded-xl border border-brand-orange/50 text-brand-orange font-mono shadow-[0_0_20px_rgba(243,89,23,0.15)] flex items-center justify-center gap-2 sm:gap-3 relative z-10 text-sm sm:text-base">
                    <Network className="w-5 h-5" />
                    Starknet L2
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
