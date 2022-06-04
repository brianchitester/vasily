import CoinbaseWalletSdk, {
  CoinbaseWalletProvider,
} from "@coinbase/wallet-sdk";

// bug in @coinbase/wallet-sdk? qr code needs Buffer
// QRCode.js:27 Uncaught ReferenceError: Buffer is not defined
import { Buffer } from "buffer"
global.Buffer = Buffer;

export const APP_NAME = "The Corporation Plaza Gallery";
export const APP_LOGO_URL = "";
export const ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_PROJECT_KEY}`;
export const CHAIN_ID = 1;

// Initialize walletSdk
export const walletSdk = new CoinbaseWalletSdk({
  darkMode: true,
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
});


interface Web3Window extends Window {
  ethereum?: any;
}

declare let window: Web3Window;

// Initialize a Web3 Provider object
export const ethereum = (() => {
  if (window.ethereum) {
    let provider = window.ethereum as CoinbaseWalletProvider;

    // edge case if MM and CBW are both installed
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach((p) => {
        if (p.isCoinbaseWallet) provider = p;
      });
    }
    return provider
  } else {
    return walletSdk.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
  }
})();
  
