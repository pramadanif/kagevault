'use client';

// KAGE VAULT — useXverseWallet | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import { useMemo, useState } from 'react';
import { requestBtcAddress, signBtcMessage } from '@/lib/xverse';

type UseXverseWalletResult = {
  btcAddress: string;
  isConnected: boolean;
  isConnecting: boolean;
  error: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
};

export function useXverseWallet(): UseXverseWalletResult {
  const [btcAddress, setBtcAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError('');
      const address = await requestBtcAddress();
      setBtcAddress(address);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Xverse wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setBtcAddress('');
    setError('');
  };

  const signMessage = async (message: string) => {
    if (!btcAddress) {
      throw new Error('Connect Xverse wallet before signing a message');
    }
    return signBtcMessage(btcAddress, message);
  };

  return useMemo(
    () => ({
      btcAddress,
      isConnected: Boolean(btcAddress),
      isConnecting,
      error,
      connect,
      disconnect,
      signMessage,
    }),
    [btcAddress, error, isConnecting]
  );
}
