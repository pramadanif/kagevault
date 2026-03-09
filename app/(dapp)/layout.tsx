// KAGE VAULT — DAppLayout | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React from 'react';
import DAppNavbar from '@/app/components/layout/DAppNavbar';
import Sidebar from '@/app/components/layout/Sidebar';

export default function DAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-deep text-white">
      <DAppNavbar />
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
