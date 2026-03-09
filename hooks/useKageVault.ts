'use client';

// KAGE VAULT — useKageVault | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import { useState } from 'react';
import { getVaultContract, getWbtcContract, readEncryptedBalance, readTotalTVL, readWbtcAllowance, waitForTx } from '@/lib/starknet';
import type { ShieldedProof, EncryptedBalance } from './useZKProof';
import { CONTRACTS } from '@/lib/constants';
import { useStarknetWallet } from './useStarknetWallet';

type UseKageVaultState = {
  isDepositing: boolean;
  isWithdrawing: boolean;
  depositTxHash: string;
  withdrawTxHash: string;
  error: string;
  deposit: (amount: bigint, proof: ShieldedProof, encryptedBalance: EncryptedBalance) => Promise<string>;
  withdraw: (proof: ShieldedProof, recipient: string, amount: bigint) => Promise<string>;
  readBalance: (address: string) => Promise<EncryptedBalance>;
  readTVL: () => Promise<bigint>;
};

export function useKageVault(): UseKageVaultState {
  const wallet = useStarknetWallet();
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [depositTxHash, setDepositTxHash] = useState('');
  const [withdrawTxHash, setWithdrawTxHash] = useState('');
  const [error, setError] = useState('');

  const deposit = async (amount: bigint, proof: ShieldedProof, encryptedBalance: EncryptedBalance) => {
    if (!wallet.account) {
      throw new Error('Connect Starknet wallet first');
    }
    if (!wallet.starknetAddress) {
      throw new Error('Starknet address not available');
    }

    try {
      setIsDepositing(true);
      setError('');

      const wbtc = getWbtcContract(wallet.account);
      const vault = getVaultContract(wallet.account);

      const allowance = await readWbtcAllowance(wallet.starknetAddress);
      if (allowance < amount) {
        const approveTx = await (
          wbtc as unknown as { approve: (spender: string, value: bigint) => Promise<{ transaction_hash: string }> }
        ).approve(CONTRACTS.KAGE_VAULT, amount);
        await waitForTx(approveTx.transaction_hash);
      }

      const depositResult = await (
        vault as unknown as {
          deposit_shielded: (amountValue: bigint, cipher: EncryptedBalance, proofPayload: ShieldedProof) => Promise<{ transaction_hash: string }>;
        }
      ).deposit_shielded(amount, encryptedBalance, proof);

      await waitForTx(depositResult.transaction_hash);
      setDepositTxHash(depositResult.transaction_hash);
      return depositResult.transaction_hash;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to deposit into Kage Vault';
      setError(message);
      throw new Error(message);
    } finally {
      setIsDepositing(false);
    }
  };

  const withdraw = async (proof: ShieldedProof, recipient: string, amount: bigint) => {
    if (!wallet.account) {
      throw new Error('Connect Starknet wallet first');
    }

    try {
      setIsWithdrawing(true);
      setError('');

      const vault = getVaultContract(wallet.account);
      const result = await (
        vault as unknown as {
          withdraw_shielded: (proofPayload: ShieldedProof, recipientValue: string, amountValue: bigint) => Promise<{ transaction_hash: string }>;
        }
      ).withdraw_shielded(proof, recipient, amount);

      await waitForTx(result.transaction_hash);
      setWithdrawTxHash(result.transaction_hash);
      return result.transaction_hash;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to withdraw from Kage Vault';
      setError(message);
      throw new Error(message);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    isDepositing,
    isWithdrawing,
    depositTxHash,
    withdrawTxHash,
    error,
    deposit,
    withdraw,
    readBalance: readEncryptedBalance,
    readTVL: readTotalTVL,
  };
}
