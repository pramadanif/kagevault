'use client';

// KAGE VAULT — WalletConnectBar | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React from 'react';
import { CheckCircle2, Wallet } from 'lucide-react';
import { Button } from '../ui/Button';
import { useXverseWallet } from '@/hooks/useXverseWallet';
import { useStarknetWallet } from '@/hooks/useStarknetWallet';
import { CHAIN } from '@/lib/constants';

const truncateAddress = (value: string) => `${value.slice(0, 6)}...${value.slice(-4)}`;

export const WalletConnectBar: React.FC = () => {
  const xverseWallet = useXverseWallet();
  const starknetWallet = useStarknetWallet();
  const isSepolia = !starknetWallet.chainId || starknetWallet.chainId === CHAIN.SEPOLIA_ID;
  const bothConnected = xverseWallet.isConnected && starknetWallet.isConnected && isSepolia;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={xverseWallet.isConnected ? xverseWallet.disconnect : xverseWallet.connect}
          className="border-brand-orange/40 text-brand-orange hover:bg-brand-orange/10"
          disabled={xverseWallet.isConnecting}
        >
          <Wallet className="w-4 h-4" />
          {xverseWallet.isConnecting ? 'Connecting...' : xverseWallet.isConnected ? 'Bitcoin Connected' : 'Connect Bitcoin'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={starknetWallet.isConnected ? starknetWallet.disconnect : starknetWallet.connect}
          className="border-navy-border text-brand-blue-gray hover:bg-navy-border/20"
          disabled={starknetWallet.isConnecting}
        >
          <Wallet className="w-4 h-4" />
          {starknetWallet.isConnecting
            ? 'Connecting...'
            : starknetWallet.isConnected
              ? 'Starknet Connected'
              : 'Connect Starknet'}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-brand-blue-gray">
        {xverseWallet.isConnected && <span>BTC: {truncateAddress(xverseWallet.btcAddress)}</span>}
        {starknetWallet.isConnected && <span>SN: {truncateAddress(starknetWallet.starknetAddress)}</span>}

        {bothConnected && (
          <span className="inline-flex items-center gap-1.5 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ready to Vault
          </span>
        )}
      </div>

      {!isSepolia && <p className="text-xs font-mono text-red-400">Please switch to Sepolia Testnet</p>}
      {xverseWallet.error && <p className="text-xs font-mono text-red-400">{xverseWallet.error}</p>}
      {starknetWallet.error && <p className="text-xs font-mono text-red-400">{starknetWallet.error}</p>}

      {/* TODO: wire sats-connect for Xverse and starknet.js for Argent/Braavos wallets */}
    </div>
  );
};

export default WalletConnectBar;
