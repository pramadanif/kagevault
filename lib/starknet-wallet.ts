// KAGE VAULT — StarknetWalletLib | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import { connect, disconnect } from 'get-starknet';

export async function connectStarknetWallet() {
  return connect({
    modalMode: 'alwaysAsk',
  });
}

export async function disconnectStarknetWallet() {
  await disconnect({ clearLastWallet: true });
}
