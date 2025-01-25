import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import {
    sepolia
  } from 'wagmi/chains';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { mantleSepolia } from "./mantleSepolia";

const { chains, publicClient } = configureChains(
  [
    ...(process.env.NODE_ENV === "development"
      ? [mantleSepolia, sepolia]
      : [mantleSepolia, sepolia]),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === mantleSepolia.id)
          return {
            http: mantleSepolia.rpcUrls.public.http[0],
          };

        if (chain.id === sepolia.id)
          return {
            http: "https://sepolia.gateway.tenderly.co",
          };

        return null;
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
  projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };
