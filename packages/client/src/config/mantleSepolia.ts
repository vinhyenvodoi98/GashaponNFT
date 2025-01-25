import { Chain } from "@rainbow-me/rainbowkit";

export const mantleSepolia = {
  id: 5003,
  name: "Mantle Sepolia",
  network: "mantlesepolia",
  iconUrl: "/svg/mantleLogo.svg",
  iconBackground: "#000",
  nativeCurrency: {
    decimals: 18,
    name: "Mantle",
    symbol: "MNT",
  },
  rpcUrls: {
    public: { http: ["https://rpc.sepolia.mantle.xyz"] },
    default: { http: ["https://rpc.sepolia.mantle.xyz"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Mantle explorer",
      url: "https://explorer.sepolia.mantle.xyz/",
    },
    default: {
      name: "Mantle explorer",
      url: "https://explorer.sepolia.mantle.xyz/",
    },
  },
  testnet: true,
} as Chain;