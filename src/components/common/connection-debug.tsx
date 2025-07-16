'use client'

import { useCurrentWallet } from '@/components/auth/hooks/use-current-wallet'
import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { Button } from './button'
import { Card } from './card'
import { RefreshCw, Bug, Copy, Check } from 'lucide-react'

export function ConnectionDebug() {
  const { walletAddress } = useCurrentWallet()
  const { ready, authenticated, user } = usePrivy()
  const [copied, setCopied] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const debugInfo = {
    ready,
    authenticated,
    walletAddress,
    user: user ? {
      id: user.id,
      linkedAccounts: user.linkedAccounts?.length || 0,
      wallet: user.wallet?.address,
    } : null,
    timestamp: new Date().toISOString(),
  }

  if (!showDebug) {
    return (
      <Button
        variant="ghost"
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
      >
        <Bug className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-y-auto bg-gray-900 border-gray-700 p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Connection Debug</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            className="p-1"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowDebug(false)}
            className="p-1"
          >
            ×
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span>Ready:</span>
          <span className={ready ? 'text-green-400' : 'text-red-400'}>
            {ready ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Authenticated:</span>
          <span className={authenticated ? 'text-green-400' : 'text-red-400'}>
            {authenticated ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Wallet Address:</span>
          <div className="flex items-center gap-1">
            <span className="text-purple-400 font-mono">
              {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'None'}
            </span>
            {walletAddress && (
              <Button
                variant="ghost"
                onClick={() => handleCopy(walletAddress)}
                className="p-1"
              >
                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            )}
          </div>
        </div>

        {user && (
          <>
            <div className="flex items-center justify-between">
              <span>User ID:</span>
              <span className="text-blue-400 font-mono">{user.id}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Linked Accounts:</span>
              <span className="text-yellow-400">{user.linkedAccounts?.length || 0}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>User Wallet:</span>
              <span className="text-purple-400 fonft-mono">
                {user.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 'None'}
              </span>
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <span>Timestamp:</span>
          <span className="text-gray-400">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <Button
          variant="ghost"
          onClick={() => handleCopy(JSON.stringify(debugInfo, null, 2))}
          className="w-full text-xs"
        >
          {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
          Copy Debug Info
        </Button>
      </div>
    </Card>
  )
} 