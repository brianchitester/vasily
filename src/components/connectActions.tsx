import { useWallet } from "../context/walletProvider";

export function ConnectActions() {
  const { connect, connected, disconnect } = useWallet();
  return (
    <div>
      {connected ? (
        <button
          onClick={disconnect}
          id="disconnect-wallet-btn"
        >
          Disconnect Wallet
        </button>
      ) : (
        <button onClick={connect} id="connect-wallet-btn">
          Connect Wallet
        </button>
      )}
    </div>
  );
}
