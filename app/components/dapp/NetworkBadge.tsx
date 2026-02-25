'use client';

// KAGE VAULT — NetworkBadge | Match landing page design system
import React from 'react';
import { Tag } from '../ui/Tag';

interface NetworkBadgeProps {
  label?: string;
}

export const NetworkBadge: React.FC<NetworkBadgeProps> = ({ label = 'Starknet Sepolia' }) => {
  return (
    <Tag variant="blue" className="inline-flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-gray animate-pulse" />
      {label}
    </Tag>
  );
};

export default NetworkBadge;
