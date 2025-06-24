import { Header } from '@/components/common/header'
import { ConnectionDebug } from '@/components/common/connection-debug'
import { PrivyClientProvider } from '@/components/provider/PrivyClientProvider'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SolanaSwap - Modern Solana Trading Platform',
  description:
    'Trade Solana tokens with the most modern and efficient swap platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PrivyClientProvider>
            <Header />
            <Toaster />
            <div className="max-w-6xl mx-auto pt-12 pb-22">{children}</div>
            <ConnectionDebug />
          </PrivyClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
