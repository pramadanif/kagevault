'use client';

// KAGE VAULT — DAppNavbar | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React from 'react';
import Link from 'next/link';
import WalletConnectBar from '../dapp/WalletConnectBar';
import NetworkBadge from '../dapp/NetworkBadge';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Vault', href: '/vault' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Bridge', href: '/bridge' },
];

export const DAppNavbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-border/50 bg-navy-deep/85 backdrop-blur-[20px]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange rounded-sm flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 transform -skew-x-12 translate-x-2" />
              <span className="font-display font-bold text-white text-lg relative z-10">K</span>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-white">KAGE VAULT</span>
          </Link>
          <NetworkBadge label="Sepolia Testnet" />

          <nav className="hidden md:flex items-center gap-1 bg-navy-surface/50 p-1 rounded-full border border-navy-border/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm rounded-full text-brand-blue-gray hover:text-white hover:bg-navy-border transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <WalletConnectBar />
      </div>
    </header>
  );
};

export default DAppNavbar;
