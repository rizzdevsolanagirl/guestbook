'use client'

import { Button } from '@/components/common/button'
import { abbreviateWalletAddress } from '@/components/common/tools'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import {
  Check,
  Clipboard,
  Coins,
  Home,
  LogIn,
  LogOut,
  Menu,
  User,
  BookOpen,
  Wallet,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useCurrentWallet } from '../auth/hooks/use-current-wallet'
import { useGetProfiles } from '../auth/hooks/use-get-profiles'
import { CreateProfileContainer } from '../create-profile/create-profile-container'
import { DialectNotificationComponent } from '../notifications/dialect-notifications-component'

export function Header() {
  const { walletAddress } = useCurrentWallet()
  const [mainUsername, setMainUsername] = useState<string | null>(null)
  const [isProfileCreated, setIsProfileCreated] = useState<boolean>(false)
  const [profileUsername, setProfileUsername] = useState<string | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  
  const { profiles } = useGetProfiles({
    walletAddress: walletAddress || '',
  })
  const { ready, authenticated, logout } = usePrivy()
  const { login } = useLogin()
  const disableLogin = !ready || (ready && authenticated) || isLoggingOut
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      setConnectionError(null)
      console.log('Starting logout process...')
      
      await logout()
      console.log('Logout successful')
      
      // Reset all local state
      setIsDropdownOpen(false)
      setMainUsername(null)
      setProfileUsername(null)
      setIsProfileCreated(false)
      
      // Force a page refresh to clear any cached state
      setTimeout(() => {
        window.location.reload()
      }, 100)
      
    } catch (error) {
      console.error('Logout error:', error)
      setConnectionError('Failed to disconnect wallet. Please try refreshing the page.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleLogin = async () => {
    try {
      setConnectionError(null)
      console.log('Starting login process...')
      
      await login({
        loginMethods: ['wallet'],
        walletChainType: 'solana-only',
        disableSignup: false,
      })
      
      console.log('Login successful')
    } catch (error) {
      console.error('Login error:', error)
      setConnectionError('Failed to connect wallet. Please try again.')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        (dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        return
      }
      setIsDropdownOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (profiles && profiles.length) {
      setMainUsername(profiles[0].profile.username)
    }

    if (isProfileCreated && profileUsername) {
      setMainUsername(profileUsername)
      setIsProfileCreated(false)
      setProfileUsername(null)
    }
  }, [profiles, isProfileCreated, profileUsername])

  // Clear connection error after 5 seconds
  useEffect(() => {
    if (connectionError) {
      const timer = setTimeout(() => {
        setConnectionError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [connectionError])

  // Show wallet info even without profile
  const displayName = mainUsername || (walletAddress ? `Wallet ${abbreviateWalletAddress({ address: walletAddress })}` : null)

  return (
    <>
      <div className="border-b-1 border-muted flex items-center justify-center w-full p-3">
        <div className="max-w-6xl w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="https://solana.com" target="_blank" rel="noopener noreferrer">
              <Image src="/logos/solana.png" alt="Solana Logo" width={32} height={32} style={{height:'auto'}} className="object-contain shadow-md bg-transparent" />
            </a>
            <a href="https://superteam.fun/fr" target="_blank" rel="noopener noreferrer">
              <Image src="/logos/solana_superteam_france_logo.jpeg" alt="Superteam France Logo" width={32} height={32} className="rounded-full" />
            </a>
            <Link 
              href="/" 
              className="hover:opacity-80"
            >
              <h1 className="text-2xl font-bold">Builders Mansion</h1>
            </Link>
          </div>

          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Home className="h-4 w-4 mr-2" />
              <span>Home</span>
            </Link>

            <Link
              href="/guestbook"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Guestbook</span>
            </Link>

            <Link
              href="/features"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              <span>Swap</span>
            </Link>

            {ready && authenticated ? (
              <div className="flex items-center relative" ref={dropdownRef}>
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="space-x-2"
                  >
                    {mainUsername ? (
                      <>
                        <User className="h-4 w-4" />
                        <p className="truncate font-bold">{mainUsername}</p>
                      </>
                    ) : (
                      <>
                        <Wallet className="h-4 w-4" />
                        <p className="truncate font-bold">{displayName}</p>
                      </>
                    )}
                    <Menu size={20} />
                  </Button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
                      {/* Wallet Info */}
                      <div className="border-b border-muted-light p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Wallet className="h-4 w-4 text-purple-400" />
                          <span className="text-sm font-medium text-gray-300">Connected Wallet</span>
                        </div>
                        <Button
                          variant="ghost"
                          className="px-2 py-1 hover:bg-muted-light w-full justify-start text-sm"
                          onClick={() => handleCopy(walletAddress)}
                        >
                          {copied ? (
                            <Check size={14} className="mr-2 text-green-500" />
                          ) : (
                            <Clipboard size={14} className="mr-2" />
                          )}
                          {abbreviateWalletAddress({
                            address: walletAddress,
                          })}
                        </Button>
                      </div>

                      {/* Profile Section */}
                      {mainUsername ? (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            router.push(`/${mainUsername}`)
                            setIsDropdownOpen(false)
                          }}
                          className="px-4 py-2 hover:bg-muted-light w-full justify-start"
                        >
                          <User size={16} className="mr-2" /> My Profile
                        </Button>
                      ) : (
                        <div className="p-3 border-b border-muted-light">
                          <p className="text-sm text-gray-400 mb-2">No profile created yet</p>
                          <CreateProfileContainer
                            setIsProfileCreated={setIsProfileCreated}
                            setProfileUsername={setProfileUsername}
                          />
                        </div>
                      )}

                      {/* Disconnect */}
                      <Button
                        variant="ghost"
                        className="px-4 py-2 hover:bg-muted-light w-full justify-start !text-red-500"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                      >
                        <LogOut size={16} className="mr-2" /> 
                        {isLoggingOut ? 'Disconnecting...' : 'Disconnect Wallet'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <Button
                  variant="ghost"
                  className='!text-green-500'
                  disabled={disableLogin}
                  onClick={handleLogin}
                >
                  <LogIn className="h-4 w-4 mr-2" /> 
                  {isLoggingOut ? 'Disconnecting...' : 'Connect Wallet'}
                </Button>
                {connectionError && (
                  <div className="flex items-center gap-1 text-red-400 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    {connectionError}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              <DialectNotificationComponent />
              <Link
                href="https://github.com/Primitives-xyz/solana-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 flex items-center"
              >
                <Image
                  width={20}
                  height={20}
                  alt="Github link"
                  src="/logos/github-mark.svg"
                />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
