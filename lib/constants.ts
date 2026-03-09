// KAGE VAULT — Constants | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
export const CONTRACTS = {
  KAGE_VAULT: process.env.NEXT_PUBLIC_KAGE_VAULT_ADDRESS!,
  KAGE_TOKEN: process.env.NEXT_PUBLIC_KAGE_TOKEN_ADDRESS!,
  MOCK_WBTC: process.env.NEXT_PUBLIC_MOCK_WBTC_ADDRESS!,
};

export const CHAIN = {
  SEPOLIA_ID: '0x534e5f5345504f4c4941',
  RPC_URL: process.env.NEXT_PUBLIC_STARKNET_RPC || 'https://starknet-sepolia.public.blastapi.io',
};

export const ATOMIQ_API = 'https://api.atomiq.exchange/api/v1';

export const STARK_CURVE = {
  PRIME: '0x800000000000011000000000000000000000000000000000000000000000001',
  GENERATOR_X: '0x1ef15c18599971b7beced415a40f0c7deacfd9b0d1819e03d723d8bc943cfca',
  GENERATOR_Y: '0x5668060aa49730b7be4801df46ec62de53ecd11abe43a32873000c36e8dc1f',
};
