'use client';

// KAGE VAULT — useStarknetWallet | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import { useEffect, useMemo, useState } from 'react';
import { CHAIN } from '@/lib/constants';
import { connectStarknetWallet, disconnectStarknetWallet } from '@/lib/starknet-wallet';

type StarknetWalletState = {
  starknetAddress: string;
  account: unknown;
  provider: unknown;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: string;
  error: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export function useStarknetWallet(): StarknetWalletState {
  const [starknetAddress, setStarknetAddress] = useState('');
  const [account, setAccount] = useState<unknown>(null);
  const [provider, setProvider] = useState<unknown>(null);
  const [chainId, setChainId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError('');

      const wallet = await connectStarknetWallet();
      if (!wallet) {
        setError('No Starknet wallet selected');
        return;
      }

      const walletObject = wallet as unknown as Record<string, unknown>;
      const walletAddress = (walletObject.selectedAddress as string) || '';
      const walletProvider = walletObject.provider;
      const walletAccount = walletObject.account;
      const walletChainId = ((walletProvider as { chainId?: string } | undefined)?.chainId || '') as string;

      setStarknetAddress(walletAddress);
      setProvider(walletProvider || null);
      setAccount(walletAccount || null);
      setChainId(walletChainId);

      if (walletChainId && walletChainId !== CHAIN.SEPOLIA_ID) {
        setError('Please switch to Sepolia Testnet');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Starknet wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    await disconnectStarknetWallet();
    setStarknetAddress('');
    setProvider(null);
    setAccount(null);
    setChainId('');
    setError('');
  };

  useEffect(() => {
    setError('');
  }, []);

  return useMemo(
    () => ({
      starknetAddress,
      account,
      provider,
      isConnected: Boolean(starknetAddress),
      isConnecting,
      chainId,
      error,
      connect,
      disconnect,
    }),
    [account, chainId, error, isConnecting, provider, starknetAddress]
  );
}
