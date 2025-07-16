import { SwapService } from '@/services/swap'
import type { SwapRouteResponse } from '@/types/jupiter-service'
import { Connection } from '@solana/web3.js'
import { NextResponse } from 'next/server'

// Only create connection if RPC_URL is properly configured
const rpcUrl = process.env.RPC_URL
const connection = rpcUrl && !rpcUrl.includes('our_helius_api_key_here') 
  ? new Connection(rpcUrl)
  : null
const swapService = connection ? new SwapService(connection) : null

export async function POST(
  request: Request
): Promise<NextResponse<SwapRouteResponse | { error: string }>> {
  if (!swapService) {
    return NextResponse.json(
      { error: 'RPC URL not properly configured' },
      { status: 500 }
    )
  }

  try {
    const requestData = await request.json()
    const response = await swapService.createSwapTransaction(requestData)
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to build swap transaction' },
      { status: 500 }
    )
  }
}
