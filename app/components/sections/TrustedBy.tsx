'use client';

import React from 'react';

export const TrustedBy = () => {
  const partners = ['Xverse', 'Starknet', 'Cairo', 'Atomiq', 'Tongo'];

  return (
    <section className="py-12 border-y border-navy-border bg-navy-deep relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[11px] font-mono text-brand-muted uppercase tracking-[0.2em] mb-8">
          Powered by Starknet's Cryptographic Frontier
        </p>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 group-hover:[animation-play-state:paused]">
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <span 
                key={i} 
                className="text-2xl md:text-3xl font-display font-bold text-white/40 hover:text-white transition-colors duration-300 cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
