// KAGE VAULT — XverseLib | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import { AddressPurpose, BitcoinNetworkType, getAddress, signMessage } from 'sats-connect';

export async function requestBtcAddress(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    void getAddress({
      payload: {
        purposes: [AddressPurpose.Payment],
        message: 'Connect Xverse to Kage Vault',
        network: {
          type: BitcoinNetworkType.Testnet4,
        },
      },
      onFinish: (result) => {
        const paymentAddress = result.addresses.find((item) => item.purpose === AddressPurpose.Payment);
        if (!paymentAddress?.address) {
          reject(new Error('No BTC payment address returned from Xverse'));
          return;
        }
        resolve(paymentAddress.address);
      },
      onCancel: () => {
        reject(new Error('Xverse connection cancelled by user'));
      },
    });
  });
}

export async function signBtcMessage(address: string, message: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    void signMessage({
      payload: {
        address,
        message,
        network: {
          type: BitcoinNetworkType.Testnet4,
        },
      },
      onFinish: (result) => {
        resolve(result);
      },
      onCancel: () => {
        reject(new Error('BTC message signing cancelled by user'));
      },
    });
  });
}
