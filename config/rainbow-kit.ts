import {
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import {
  mainnet,
  goerli,
  gnosis,
  polygon,
  celo,
  bsc,
  fantom,
  arbitrum,
  avalanche,
  optimism,
  moonbeam,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    {
      ...gnosis,
      iconUrl:
        "https://raw.githubusercontent.com/gnosischain/media-kit/main/Logos/01%20Chain/Background/SVG/LogomarkChain-Vertical-Cream_onMoss.svg",
    },
    polygon,
    optimism,
    arbitrum,
    avalanche,
    bsc,
    celo,
    fantom,
    moonbeam,
    goerli,
  ],
  [publicProvider()],
);

// For details about Wallet Connect Project ID: https://docs.walletconnect.com/cloud/relay#project-id
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

const appName = "Request Network Quickstart: Create a request";

const { wallets } = getDefaultWallets({
  appName,
  projectId,
  chains,
});

export const demoAppInfo = {
  appName,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
