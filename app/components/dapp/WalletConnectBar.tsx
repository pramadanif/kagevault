'use client';

// KAGE VAULT — WalletConnectBar | Match landing page design system
import React, { useState } from 'react';
import { CheckCircle2, Wallet } from 'lucide-react';
import { Button } from '../ui/Button';

type WalletState = {
  connected: boolean;
  address: string;
};

const truncateAddress = (value: string) => `${value.slice(0, 6)}...${value.slice(-4)}`;

export const WalletConnectBar: React.FC = () => {
  const [xverse, setXverse] = useState<WalletState>({ connected: false, address: '' });
  const [starknet, setStarknet] = useState<WalletState>({ connected: false, address: '' });

  const toggleXverse = () => {
    setXverse((prev) =>
      prev.connected
        ? { connected: false, address: '' }
        : { connected: true, address: 'bc1q7z5u9h8x3w2k1m4n6p0r' }
    );
  };

  const toggleStarknet = () => {
    setStarknet((prev) =>
      prev.connected
        ? { connected: false, address: '' }
        : { connected: true, address: '0x1234567890abcdef1234abcd' }
    );
  };

  const bothConnected = xverse.connected && starknet.connected;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleXverse}
          className="border-brand-orange/40 text-brand-orange hover:bg-brand-orange/10"
        >
          <Wallet className="w-4 h-4" />
          {xverse.connected ? 'Xverse Connected' : 'Connect Xverse'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleStarknet}
          className="border-navy-border text-brand-blue-gray hover:bg-navy-border/20"
        >
          <Wallet className="w-4 h-4" />
          {starknet.connected ? 'Starknet Connected' : 'Connect Starknet'}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-brand-blue-gray">
        {xverse.connected && <span>Xverse: {truncateAddress(xverse.address)}</span>}
        {starknet.connected && <span>Starknet: {truncateAddress(starknet.address)}</span>}

        {bothConnected && (
          <span className="inline-flex items-center gap-1.5 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ready
          </span>
        )}
      </div>

      {/* TODO: wire sats-connect for Xverse and starknet.js for Argent/Braavos wallets */}
    </div>
  );
};

export default WalletConnectBar;
