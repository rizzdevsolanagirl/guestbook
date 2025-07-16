import { PopularTokensTable } from '@/components/token/popular-tokens-table'
import TokenChartSwapContainer from '@/components/trade/components/token-chart-swap-container'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/common/button'
import { TrendingUp, BookOpen, Users, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

// This is a server component (the default for page.tsx in Next.js App Router)
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">Welcome to Builders Mansion</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              A virtual space where web3 builders connect, share experiences, and leave their mark on the blockchain ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guestbook">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Sign the Guestbook
                </Button>
              </Link>
              <Link href="/token">
                <Button variant="secondary" className="px-8 py-3 text-lg">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Explore Tokens
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Builders Mansion Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-border p-6 text-center">
              <div className="h-16 w-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Guestbook</h3>
              <p className="text-gray-400">
                Share your journey, experiences, and achievements with the community. Every entry is a piece of blockchain history.
              </p>
            </Card>

            <Card className="bg-background border-border p-6 text-center">
              <div className="h-16 w-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Connection</h3>
              <p className="text-gray-400">
                Connect with fellow builders, discover new projects, and build meaningful relationships in the web3 space.
              </p>
            </Card>

            <Card className="bg-background border-border p-6 text-center">
              <div className="h-16 w-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">On-Chain Identity</h3>
              <p className="text-gray-400">
                Your wallet is your identity. Create profiles, showcase your work, and build your reputation in the ecosystem.
              </p>
            </Card>
          </div>
        </section>

        {/* Stats Preview */}
        <section className="container py-16">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Community Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">150+</div>
                <div className="text-gray-400">Builders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
                <div className="text-gray-400">Cohorts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">8</div>
                <div className="text-gray-400">Weeks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">∞</div>
                <div className="text-gray-400">Possibilities</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect your wallet, create your profile, and start sharing your Builders Mansion experience with the world.
            </p>
            <Link href="/guestbook">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Legacy Trading Section (Collapsed) */}
        <section className="container py-8">
          <details className="bg-gray-900/50 rounded-lg p-6">
            <summary className="cursor-pointer text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trading Platform (Legacy)
            </summary>
            <div className="space-y-8">
              <Suspense
                fallback={
                  <div className="h-[500px] flex items-center justify-center">
                    Loading chart and swap...
                  </div>
                }
              >
                <TokenChartSwapContainer
                  defaultTokenAddress="So11111111111111111111111111111111111111112" // SOL address
                  defaultTokenSymbol="SOL"
                />
              </Suspense>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Popular Tokens</h2>
                <PopularTokensTable />
              </div>
            </div>
          </details>
        </section>
      </main>
      
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
              href="/token"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Tokens
            </Link>
            <Link
              href="/trade"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Trade
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
    </div>
  )
}
