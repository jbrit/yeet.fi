import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@near-wallet-selector/modal-ui/styles.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AppContext, INDEXER_GRAPHQL_URL } from "@/lib/utils";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { auroraTestnet, baseSepolia } from "wagmi/chains";
import Layout from "@/components/layout";
import { useState } from "react";

const client = new ApolloClient({
  uri: INDEXER_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const config = getDefaultConfig({
  appName: "YEET finance",
  projectId: "YEET finance",
  chains: [auroraTestnet, baseSepolia],
  ssr: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [chain, setChain] = useState<"AURORA" | "BASE">("AURORA");
  return (
    <AppContext.Provider value={{chain, setChain}}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ApolloProvider client={client}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ApolloProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AppContext.Provider>
  );
}
