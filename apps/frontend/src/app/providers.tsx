'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, createConfig, configureChains, mainnet, polygon, bsc } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useState } from 'react'

// Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, bsc],
  [publicProvider()]
)

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WEB3_PROJECT_ID || '',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
