'use client'

import { Card } from '@/components/common/card'
import { useGuestbookStats } from '@/components/guestbook/hooks/use-guestbook-stats'
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Hash, 
  Heart,
  Sparkles,
  Lightbulb,
  Target,
  Trophy,
  Smile
} from 'lucide-react'

const MOOD_ICONS = {
  excited: Sparkles,
  inspired: Lightbulb,
  challenged: Target,
  accomplished: Trophy,
  grateful: Heart,
}

const MOOD_COLORS = {
  excited: 'text-yellow-500',
  inspired: 'text-blue-500',
  challenged: 'text-orange-500',
  accomplished: 'text-green-500',
  grateful: 'text-pink-500',
}

export function GuestbookStats() {
  const { stats, isLoading, error } = useGuestbookStats()

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (error || !stats) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-400">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <p>Unable to load guestbook statistics</p>
        </div>
      </Card>
    )
  }

  const MoodIcon = MOOD_ICONS[stats.averageMood as keyof typeof MOOD_ICONS] || Smile
  const moodColor = MOOD_COLORS[stats.averageMood as keyof typeof MOOD_COLORS] || 'text-gray-400'

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6 text-purple-500" />
        <h2 className="text-xl font-bold">Builders Mansion Stats</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-500" />
          <div className="text-2xl font-bold">{stats.totalEntries}</div>
          <div className="text-sm text-gray-400">Total Entries</div>
        </div>

        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{stats.totalCohorts}</div>
          <div className="text-sm text-gray-400">Cohorts</div>
        </div>

        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{stats.totalWeeks}</div>
          <div className="text-sm text-gray-400">Weeks</div>
        </div>

        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
          <div className="text-2xl font-bold">{stats.recentActivity}</div>
          <div className="text-sm text-gray-400">Recent Activity</div>
        </div>
      </div>

      {/* Average Mood */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MoodIcon className={`h-5 w-5 ${moodColor}`} />
          <span className="font-medium">Community Mood</span>
        </div>
        <div className="text-2xl font-bold capitalize">{stats.averageMood}</div>
        <div className="text-sm text-gray-400">Most common feeling among builders</div>
      </div>

      {/* Top Tags */}
      {stats.topTags.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Hash className="h-5 w-5 text-purple-500" />
            <span className="font-medium">Popular Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.topTags.slice(0, 8).map(({ tag, count }) => (
              <div
                key={tag}
                className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm"
              >
                <span className="text-purple-400">{tag}</span>
                <span className="text-gray-400 ml-1">({count})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
} 