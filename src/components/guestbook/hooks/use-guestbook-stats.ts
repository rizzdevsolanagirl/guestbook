import { IGuestbookStats } from '@/models/guestbook.models'
import { useEffect, useState } from 'react'
import { getEntriesFromStorage } from './use-guestbook-entries'

function computeStats(entries: any[]): IGuestbookStats {
  const totalEntries = entries.length
  const cohorts = new Set(entries.map(e => e.entry.cohort).filter(Boolean))
  const weeks = new Set(entries.map(e => e.entry.week).filter(Boolean))
  const moods = entries.map(e => e.entry.mood).filter(Boolean)
  const tags = entries.flatMap(e => Array.isArray(e.entry.tags) ? e.entry.tags : []).filter(Boolean)
  const skills = entries.flatMap(e => Array.isArray(e.entry.skills) ? e.entry.skills : []).filter(Boolean)
  const interests = entries.flatMap(e => Array.isArray(e.entry.interests) ? e.entry.interests : []).filter(Boolean)
  const karma = entries.reduce((sum, e) => sum + (e.entry.karma || 0), 0)
  const specialBadgeHolders = entries.filter(e => e.entry.hasSpecialBadge).length

  // Mood stats
  const moodCounts: Record<string, number> = {}
  moods.forEach(m => { moodCounts[m] = (moodCounts[m] || 0) + 1 })
  const averageMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'excited'

  // Tag stats
  const tagCounts: Record<string, number> = {}
  tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1 })
  const topTags = Object.entries(tagCounts).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count)

  // Skill stats
  const skillCounts: Record<string, number> = {}
  skills.forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1 })
  const topSkills = Object.entries(skillCounts).map(([skill, count]) => ({ skill, count })).sort((a, b) => b.count - a.count)

  // Interest stats
  const interestCounts: Record<string, number> = {}
  interests.forEach(i => { interestCounts[i] = (interestCounts[i] || 0) + 1 })
  const topInterests = Object.entries(interestCounts).map(([interest, count]) => ({ interest, count })).sort((a, b) => b.count - a.count)

  return {
    totalEntries,
    totalCohorts: cohorts.size,
    totalWeeks: weeks.size,
    averageMood,
    topTags,
    topSkills,
    topInterests,
    recentActivity: totalEntries, // You can refine this if you want
    totalKarma: karma,
    specialBadgeHolders,
  }
}

export function useGuestbookStats() {
  const [stats, setStats] = useState<IGuestbookStats | null>(null)

  useEffect(() => {
    const entries = getEntriesFromStorage()
    setStats(computeStats(entries))
  }, [])

  return {
    stats,
    isLoading: false,
    error: null,
    mutate: () => {
      const entries = getEntriesFromStorage()
      setStats(computeStats(entries))
    },
  }
} 