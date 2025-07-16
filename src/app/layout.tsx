import { Header } from '@/components/common/header'
import { ConnectionDebug } from '@/components/common/connection-debug'
import { PrivyClientProvider } from '@/components/provider/PrivyClientProvider'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import './globals.css'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

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
            <footer className="border-t border-zinc-800 py-6">
              <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <span className="font-bold">Builders Mansion</span>
                </div>
                <nav className="flex items-center gap-6">
                  <Link
                    href="/guestbook"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Guestbook
                  </Link>
                  <Link
                    href="https://github.com/Primitives-xyz/solana-starter-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </Link>
                </nav>
              </div>
            </footer>
          </PrivyClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
