'use client';

// KAGE VAULT — NetworkBadge | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React from 'react';
import { Tag } from '../ui/Tag';

interface NetworkBadgeProps {
  label?: string;
}

export const NetworkBadge: React.FC<NetworkBadgeProps> = ({ label = 'Sepolia Testnet' }) => {
  return (
    <Tag variant="blue" className="inline-flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-gray animate-pulse" />
      {label}
    </Tag>
  );
};

export default NetworkBadge;
