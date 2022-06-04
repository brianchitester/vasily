import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ethereum, walletSdk } from "../util/web3";

type WalletContextProps = {
  accounts: string[] | null;
  chainId: string | null;
  connected: boolean;
  connect(): Promise<void>;
  disconnect(): void;
  networkId: string | null;
  updateConnected(_connected: boolean): void;
};

export const WalletContext = React.createContext<WalletContextProps | null>(
  null
);

type WalletProviderProps = {
  children: React.ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const getChainId = async (): Promise<string | null> =>
    ethereum.request({
      method: "eth_chainId",
    });

  const getNetworkId = async (): Promise<string | null> =>
    ethereum.request({
      method: "net_version",
    });

  const setupConnectedState = useCallback(async (_accounts) => {
    if (_accounts.length > 0) {
      const [_chainId, _networkId] = await Promise.all([
        getChainId(),
        getNetworkId(),
      ]);
      setConnected(true);
      setAccounts(_accounts);
      setChainId(_chainId);
      setNetworkId(_networkId);
    }
  }, []);

  const connect = useCallback(async () => {
    try {
      const _accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts", _accounts);
      await setupConnectedState(_accounts);
    } catch (error) {
      console.error("Failed to connect: ", error);
    }
  }, [setupConnectedState]);

  const disconnect = useCallback(() => {
    walletSdk.disconnect();
    setConnected(false);
  }, []);

  const updateAccounts = useCallback((_accounts) => {
    setAccounts(_accounts);
  }, []);

  const updateChainId = useCallback((_chainId) => {
    setChainId(_chainId);
  }, []);

  const updateNetworkId = useCallback((_networkId) => {
    setNetworkId(_networkId);
  }, []);

  useEffect(() => {
    // need to use accountsChanged to watch Wallet's account changes
    ethereum.on("accountsChanged", updateAccounts);
    ethereum.on("chainChanged", updateChainId);
    ethereum.on("networkChanged", updateNetworkId);
    return () => {
      ethereum.off("accountsChanged", updateAccounts);
      ethereum.off("chainChanged", updateChainId);
      ethereum.off("networkChanged", updateNetworkId);
    };
  }, [updateAccounts, updateChainId, updateNetworkId]);

  const context = useMemo(
    () => ({
      accounts,
      chainId,
      connect,
      connected,
      disconnect,
      networkId,
      updateConnected: (_connected: boolean) => setConnected(_connected),
    }),
    [accounts, chainId, connect, connected, disconnect, networkId, setConnected]
  );

  return (
    <WalletContext.Provider value={context}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("WalletContext Error");
  return ctx;
}
