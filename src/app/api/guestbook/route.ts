import { NextRequest, NextResponse } from 'next/server'
import { ICreateGuestbookEntryRequest } from '@/models/guestbook.models'

// Mock data for guestbook entries (in a real app, this would be stored in a database)
const guestbookEntries: any[] = []

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const cohort = searchParams.get('cohort')
  const week = searchParams.get('week')
  const mood = searchParams.get('mood')

  try {
    // Filter entries based on query parameters
    const filteredEntries = guestbookEntries.filter(entry => {
      if (cohort && entry.entry.cohort !== cohort) return false
      if (week && entry.entry.week !== parseInt(week)) return false
      if (mood && entry.entry.mood !== mood) return false
      return true
    })

    // Sort by creation date (newest first)
    filteredEntries.sort((a, b) => b.entry.created_at - a.entry.created_at)

    // Pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedEntries = filteredEntries.slice(startIndex, endIndex)

    const response = {
      entries: paginatedEntries,
      page,
      pageSize,
      totalCount: filteredEntries.length,
      totalPages: Math.ceil(filteredEntries.length / pageSize)
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[Get Guestbook Entries Error]:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ICreateGuestbookEntryRequest = await request.json()
    const { profileId, text, cohort, week, experience, highlights, tags, mood, isPublic } = body

    if (!profileId || !text || !cohort || !week || !experience || !mood) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Get profile info from socialfi using wallet address
    // For now, we'll create a mock profile since we don't have the wallet address
    // In a real implementation, you'd need to get the profile by ID or wallet address
    const mockProfile = {
      profile: {
        id: profileId,
        namespace: 'builders-mansion',
        created_at: Date.now(),
        username: `builder_${profileId.slice(-6)}`,
        bio: 'Builders Mansion participant',
        image: null
      },
      wallet: {
        address: 'mock_wallet_address'
      }
    }

    // Create new guestbook entry
    const newEntry = {
      entry: {
        id: `guestbook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        created_at: Date.now(),
        updated_at: Date.now(),
        text,
        cohort,
        week,
        experience,
        highlights: highlights || [],
        tags: tags || [],
        mood,
        isPublic: isPublic !== false // Default to public
      },
      author: {
        id: mockProfile.profile.id,
        namespace: mockProfile.profile.namespace,
        created_at: mockProfile.profile.created_at,
        username: mockProfile.profile.username,
        bio: mockProfile.profile.bio || '',
        image: mockProfile.profile.image || '',
        walletAddress: mockProfile.wallet.address
      },
      socialCounts: {
        likeCount: 0,
        commentCount: 0
      },
      requestingProfileSocialInfo: {
        hasLiked: false
      }
    }

    // Add to mock storage
    guestbookEntries.unshift(newEntry)

    return NextResponse.json(newEntry)
  } catch (error) {
    console.error('[Create Guestbook Entry Error]:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to create guestbook entry',
      },
      { status: 500 },
    )
  }
} 