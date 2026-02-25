'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Eye, Building2, Link2 } from 'lucide-react';
import { Card } from '../ui/Card';

export const ProblemSection = () => {
  const problems = [
    {
      icon: <Eye className="w-6 h-6 text-brand-orange" />,
      title: "Exposed Strategies",
      desc: "Ethereum and Solana broadcast your exact stack and entry times to Arkham and Nansen. Exposing a 500 BTC position invites front-running and phishing."
    },
    {
      icon: <Building2 className="w-6 h-6 text-brand-orange" />,
      title: "Institutional Hesitation",
      desc: "Billions in BTC remain idle. Institutions refuse to deploy capital because the privacy-to-yield ratio on transparent ledgers is simply too risky."
    },
    {
      icon: <Link2 className="w-6 h-6 text-brand-orange" />,
      title: "Flawed Alternatives",
      desc: "CoinJoin doesn't offer yield. Tornado Cash is a compliance nightmare isolated from BTC liquidity. Current DeFi lacks native, yield-bearing privacy."
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3E468A_1px,transparent_1px),linear-gradient(to_bottom,#3E468A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="font-mono text-brand-orange text-sm tracking-wider uppercase mb-4 block">The Problem</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white max-w-2xl">
            The Transparency Trap of Modern DeFi.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((prob, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:-translate-y-1 transition-transform duration-300 hover:border-[#5A64AA] pt-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />
                <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center mb-6">
                  {prob.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{prob.title}</h3>
                <p className="text-brand-blue-gray leading-relaxed">{prob.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
