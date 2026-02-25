'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Wallet, Shield, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const steps = [
    {
      icon: <Wallet className="w-6 h-6 text-brand-orange" />,
      title: "Bridge via Atomiq",
      desc: "Initiate deposit via Xverse. Atomiq HTLCs lock L1 BTC and mint wBTC on Starknet trustlessly."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-orange" />,
      title: "Shield with Tongo",
      desc: "Client-side WASM generates Tongo encryption and a ZK validity proof. Kage Vault mints shielded sBTC."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-orange" />,
      title: "Earn Invisibly",
      desc: "Yield accrues homomorphically. Sign deposit_shielded to verify state transitions without revealing plaintext integers."
    }
  ];

  return (
    <section className="py-32 bg-navy-surface/30 border-y border-navy-border" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="font-mono text-brand-orange text-sm tracking-wider uppercase mb-4 block">How It Works</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Trustless. Shielded. Profitable.
          </h2>
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[100px] left-[10%] right-[10%] h-0.5">
            <svg width="100%" height="2" className="overflow-visible">
              <motion.line 
                x1="0" y1="0" x2="100%" y2="0" 
                stroke="#3E468A" strokeWidth="2" strokeDasharray="8 8"
              />
              <motion.line 
                x1="0" y1="0" x2="100%" y2="0" 
                stroke="#F35917" strokeWidth="2" strokeDasharray="8 8"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="h-full relative overflow-hidden bg-navy-deep">
                  <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <div className="absolute -top-4 -right-2 text-[120px] font-display font-black text-navy-border/20 leading-none select-none">
                    {i + 1}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-navy-surface border border-navy-border flex items-center justify-center mb-8 relative z-10 mt-4">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 font-display relative z-10">{step.title}</h3>
                  <p className="text-brand-blue-gray leading-relaxed relative z-10">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
