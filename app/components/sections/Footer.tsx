'use client';

import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-navy-deep border-t border-navy-subtle py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-brand-orange rounded-sm flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 transform -skew-x-12 translate-x-1" />
                <span className="font-display font-bold text-white text-sm relative z-10">K</span>
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">KAGE VAULT</span>
            </div>
            <p className="text-brand-blue-gray text-sm">Shadow the market. Not the strategy.</p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="text-brand-blue-gray hover:text-white transition-colors text-sm font-medium">GitHub</a>
            <a href="#" className="text-brand-blue-gray hover:text-white transition-colors text-sm font-medium">DoraHacks</a>
            <a href="#" className="text-brand-blue-gray hover:text-white transition-colors text-sm font-medium">Twitter/X</a>
          </div>
        </div>

        <div className="text-center md:text-left text-brand-muted text-xs font-mono border-t border-navy-border/30 pt-8">
          Kage Vault © 2026 · Built at Starknet Re{'{'}define{'}'} Hackathon
        </div>
      </div>
    </footer>
  );
};
