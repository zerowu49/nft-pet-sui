import { createNetworkConfig } from "@mysten/dapp-kit";

import { getFullnodeUrl } from "@mysten/sui/client";

export const { networkConfig } = createNetworkConfig({
  devnet: {
    url: getFullnodeUrl("devnet"),
  },
  testnet: {
    url: getFullnodeUrl("testnet"),
  },
  mainnet: {
    url: getFullnodeUrl("mainnet"),
  },
});
