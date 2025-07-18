'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana'

export function PrivyClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: { 
          walletChainType: 'solana-only',
          theme: 'dark',
          accentColor: '#8b5cf6',
          showWalletLoginFirst: true,
        },
        externalWallets: {
          solana: { 
            connectors: toSolanaWalletConnectors(),
          },
        },
        loginMethods: ['wallet'],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
