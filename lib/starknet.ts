// KAGE VAULT — StarknetLib | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import { Contract, RpcProvider, num } from 'starknet';
import { CHAIN, CONTRACTS } from './constants';
import KAGE_VAULT_ABI from './kage-vault-abi.json';
import KAGE_TOKEN_ABI from './kage-token-abi.json';

export type EncryptedBalance = {
  c1_x: string;
  c1_y: string;
  c2_x: string;
  c2_y: string;
  isInitialized?: boolean;
};

export type ShieldedProof = {
  proof_hash: string;
  new_balance_cipher: EncryptedBalance;
  nullifier: string;
  public_key_x: string;
  public_key_y: string;
};

export const provider = new RpcProvider({ nodeUrl: CHAIN.RPC_URL });

export const getVaultContract = (accountOrProvider: unknown = provider) =>
  new Contract({
    abi: KAGE_VAULT_ABI,
    address: CONTRACTS.KAGE_VAULT,
    providerOrAccount: accountOrProvider as never,
  });

export const getTokenContract = (accountOrProvider: unknown = provider) =>
  new Contract({
    abi: KAGE_TOKEN_ABI,
    address: CONTRACTS.KAGE_TOKEN,
    providerOrAccount: accountOrProvider as never,
  });

export const getWbtcContract = (accountOrProvider: unknown = provider) =>
  new Contract({
    abi: KAGE_TOKEN_ABI,
    address: CONTRACTS.MOCK_WBTC,
    providerOrAccount: accountOrProvider as never,
  });

const getResult = (response: unknown): unknown => {
  if (Array.isArray(response)) return response[0];
  if (response && typeof response === 'object' && 'res' in (response as Record<string, unknown>)) {
    return (response as Record<string, unknown>).res;
  }
  return response;
};

export async function readTotalTVL(): Promise<bigint> {
  const contract = getVaultContract();
  const response = await (contract as unknown as { get_total_tvl: () => Promise<unknown> }).get_total_tvl();
  const result = getResult(response);
  return BigInt((result as { toString?: () => string })?.toString?.() || `${result || 0}`);
}

export async function readEncryptedBalance(address: string): Promise<EncryptedBalance> {
  const vault = getVaultContract();
  const response = await (
    vault as unknown as { get_encrypted_balance: (user: string) => Promise<unknown> }
  ).get_encrypted_balance(address);

  const result = getResult(response);
  const typedResult = (result || {}) as Record<string, unknown>;
  const c1x = num.toHex((typedResult.c1_x ?? typedResult[0] ?? '0x0') as string);
  const c1y = num.toHex((typedResult.c1_y ?? typedResult[1] ?? '0x0') as string);
  const c2x = num.toHex((typedResult.c2_x ?? typedResult[2] ?? '0x0') as string);
  const c2y = num.toHex((typedResult.c2_y ?? typedResult[3] ?? '0x0') as string);
  const isInitialized = c1x !== '0x0' || c2x !== '0x0';

  return {
    c1_x: c1x,
    c1_y: c1y,
    c2_x: c2x,
    c2_y: c2y,
    isInitialized,
  };
}

export async function readIsNullifierUsed(nullifier: string): Promise<boolean> {
  const vault = getVaultContract();
  const response = await (
    vault as unknown as { is_nullifier_used: (value: string) => Promise<unknown> }
  ).is_nullifier_used(nullifier);

  const result = getResult(response);
  if (typeof result === 'boolean') return result;
  if (typeof result === 'bigint') return result > 0n;
  if (typeof result === 'number') return result > 0;
  if (typeof result === 'string') return result !== '0x0' && result !== '0';
  return false;
}

export async function readIsPaused(): Promise<boolean> {
  const vault = getVaultContract();
  const response = await (vault as unknown as { is_paused: () => Promise<unknown> }).is_paused();
  const result = getResult(response);
  if (typeof result === 'boolean') return result;
  if (typeof result === 'bigint') return result > 0n;
  if (typeof result === 'number') return result > 0;
  if (typeof result === 'string') return result !== '0x0' && result !== '0';
  return false;
}

export async function readDepositorCount(): Promise<bigint> {
  const vault = getVaultContract();
  const response = await (vault as unknown as { get_depositor_count: () => Promise<unknown> }).get_depositor_count();
  const result = getResult(response);
  return BigInt((result as { toString?: () => string })?.toString?.() || `${result || 0}`);
}

export async function readWbtcAllowance(owner: string): Promise<bigint> {
  const wbtc = getWbtcContract();
  const response = await (
    wbtc as unknown as { allowance: (ownerAddress: string, spenderAddress: string) => Promise<unknown> }
  ).allowance(owner, CONTRACTS.KAGE_VAULT);
  const result = getResult(response);
  return BigInt((result as { toString?: () => string })?.toString?.() || `${result || 0}`);
}

export async function fetchVaultEvents(userAddress?: string): Promise<Array<{
  type: 'ShieldedDeposit' | 'ShieldedWithdrawal';
  nullifier: string;
  timestamp: string;
  blockNumber: number;
  txHash: string;
}>> {
  const latestBlock = await provider.getBlockNumber();
  const result = await provider.getEvents({
    address: CONTRACTS.KAGE_VAULT,
    from_block: { block_number: 0 },
    to_block: { block_number: latestBlock },
    keys: [[]],
    chunk_size: 200,
  });

  const lowerUser = userAddress?.toLowerCase();

  return result.events
    .filter((event) => {
      if (!lowerUser) return true;
      const userKey = event.keys[1];
      return userKey ? num.toHex(userKey).toLowerCase() === lowerUser : false;
    })
    .map((event) => {
      const eventTypeKey = event.keys[0]?.toString?.() || '';
      const isDeposit = eventTypeKey.includes('ShieldedDeposit');
      const timestampRaw = event.data[1] ? Number(event.data[1].toString()) : 0;
      return {
        type: isDeposit ? 'ShieldedDeposit' : 'ShieldedWithdrawal',
        nullifier: num.toHex(event.data[0] || '0x0'),
        timestamp: timestampRaw ? new Date(timestampRaw * 1000).toLocaleString() : 'pending',
        blockNumber: event.block_number ?? 0,
        txHash: event.transaction_hash,
      };
    });
}

export async function waitForTx(txHash: string) {
  return provider.waitForTransaction(txHash, { retryInterval: 3000 });
}
