import { NextResponse } from 'next/server'
import { IGuestbookStats } from '@/models/guestbook.models'

// Mock data for guestbook entries (in a real app, this would be stored in a database)
const guestbookEntries: any[] = []

export async function GET() {
  try {
    // Calculate stats from mock data
    const totalEntries = guestbookEntries.length
    
    const cohorts = new Set(guestbookEntries.map(entry => entry.entry.cohort))
    const totalCohorts = cohorts.size
    
    const weeks = new Set(guestbookEntries.map(entry => entry.entry.week))
    const totalWeeks = weeks.size
    
    // Calculate average mood
    const moodCounts: Record<string, number> = {}
    guestbookEntries.forEach(entry => {
      const mood = entry.entry.mood
      moodCounts[mood] = (moodCounts[mood] || 0) + 1
    })
    
    const averageMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b
    ) || 'excited'
    
    // Calculate top tags
    const tagCounts: Record<string, number> = {}
    guestbookEntries.forEach(entry => {
      entry.entry.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    
    const topTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
    
    // Calculate recent activity (entries in last 7 days)
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    const recentActivity = guestbookEntries.filter(entry => 
      entry.entry.created_at > sevenDaysAgo
    ).length

    const stats: IGuestbookStats = {
      totalEntries,
      totalCohorts,
      totalWeeks,
      averageMood,
      topTags,
      recentActivity
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('[Get Guestbook Stats Error]:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    )
  }
} 