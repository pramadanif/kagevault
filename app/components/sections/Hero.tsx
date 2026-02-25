'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
  const title = "Institutional Bitcoin Yield. Absolute Privacy.";
  const titleWords = title.split(" ");

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-navy-surface/40 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-navy-border/30 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-navy-surface/30 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tag variant="orange" className="mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse mr-2" />
              Built for Starknet Re{'{'}define{'}'} Hackathon
            </Tag>
          </motion.div>

          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-tight mb-6">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={`inline-block mr-[0.25em] ${word.includes('Privacy') ? 'text-brand-orange' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xl text-brand-blue-gray max-w-[560px] mb-10 font-body"
          >
            The first fully shielded Bitcoin L1 yield aggregator. 
            Deploy capital with zero-knowledge proofs and homomorphic encryption.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="group">
              Enter App
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Read Documentation
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative lg:ml-auto w-full max-w-[500px]"
        >
          <div className="absolute -bottom-12 -inset-x-12 h-48 bg-brand-orange/20 blur-[80px] rounded-full" />
          
          <div className="animate-float relative bg-navy-deep/90 backdrop-blur-xl border border-navy-border rounded-2xl p-6 shadow-2xl font-mono text-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-navy-border">
              <div className="flex items-center gap-2 text-brand-blue-gray">
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                KAGE VAULT • Protected Interface
              </div>
            </div>

            <div className="mb-8">
              <div className="text-brand-muted mb-2">Total Shielded Balance</div>
              <div className="text-3xl font-display font-bold text-white flex items-center gap-3">
                <div className="relative overflow-hidden rounded bg-navy-surface px-2 py-1">
                  <span className="opacity-0">00.000000</span>
                  <div className="absolute inset-0 bg-white/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </div>
                <span className="text-xl text-brand-blue-gray">BTC</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-navy-surface border border-navy-border rounded-xl p-4">
                <div className="text-brand-muted mb-1">Target APY</div>
                <div className="text-xl text-white font-bold">5.2%</div>
              </div>
              <div className="bg-navy-surface border border-navy-border rounded-xl p-4">
                <div className="text-brand-muted mb-1">Status</div>
                <div className="text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Active
                </div>
              </div>
            </div>

            <div className="bg-navy-surface/50 rounded-xl p-4 border border-navy-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-brand-blue-gray flex items-center gap-2">
                  Privacy: Tongo ElGamal
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                </span>
                <span className="text-brand-orange text-xs">Encrypted</span>
              </div>
              <div className="h-1.5 w-full bg-navy-deep rounded-full overflow-hidden">
                <div className="h-full bg-brand-orange w-2/3 relative">
                  <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </div>
              </div>
              <div className="text-right text-xs text-brand-muted mt-2">Yield Accruing</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
