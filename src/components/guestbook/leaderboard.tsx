'use client'

import { Card } from '@/components/common/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ILeaderboardEntry } from '@/models/guestbook.models'
import { 
  Trophy, 
  Medal, 
  Award, 
  Users, 
  Calendar,
  Star,
  TrendingUp,
  Activity
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface LeaderboardProps {
  entries: ILeaderboardEntry[]
  title: string
  activityType: 'sports' | 'group' | 'general'
}

const ACTIVITY_ICONS = {
  sports: Trophy,
  group: Users,
  general: Activity
}

const ACTIVITY_COLORS = {
  sports: 'text-yellow-500',
  group: 'text-blue-500',
  general: 'text-purple-500'
}

const POSITION_BADGES = {
  1: { icon: Trophy, color: 'bg-yellow-500', text: 'text-yellow-900' },
  2: { icon: Medal, color: 'bg-gray-400', text: 'text-gray-900' },
  3: { icon: Award, color: 'bg-orange-500', text: 'text-orange-900' }
}

export function Leaderboard({ entries, title, activityType }: LeaderboardProps) {
  const ActivityIcon = ACTIVITY_ICONS[activityType]
  const activityColor = ACTIVITY_COLORS[activityType]

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg bg-${activityColor.replace('text-', '')}/20`}>
          <ActivityIcon className={`h-6 w-6 ${activityColor}`} />
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-400">Proof of presence leaderboard</p>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8">
          <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No Activities Yet</h3>
          <p className="text-gray-400">Be the first to participate and earn points!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, index) => {
            const position = index + 1
            const positionBadge = POSITION_BADGES[position as keyof typeof POSITION_BADGES]
            
            return (
              <div 
                key={entry.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
              >
                {/* Position */}
                <div className="flex-shrink-0">
                  {positionBadge ? (
                    <div className={`w-8 h-8 rounded-full ${positionBadge.color} flex items-center justify-center`}>
                      <positionBadge.icon className={`h-4 w-4 ${positionBadge.text}`} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-300">{position}</span>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-10 w-10">
                    {entry.image ? (
                      <Image
                        src={entry.image}
                        width={40}
                        height={40}
                        alt={entry.username}
                        className="object-cover rounded-full"
                        unoptimized
                      />
                    ) : (
                      <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {entry.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <Link 
                      href={`/${entry.username}`}
                      className="font-semibold hover:text-purple-400 transition-colors"
                    >
                      {entry.username}
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Activity className="h-3 w-3" />
                      <span>{entry.activity}</span>
                    </div>
                  </div>
                </div>

                {/* Score and Proof */}
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-bold text-lg">{entry.score}</span>
                    </div>
                    <span className="text-xs text-gray-400">points</span>
                  </div>
                  
                  {entry.proofOfPresence && (
                    <Badge variant="secondary" className="text-xs bg-green-600/20 text-green-300 border-green-500/30">
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-400 flex-shrink-0">
                  {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Proof of presence required for verification</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Total Participants: {entries.length}</span>
            <span>Total Points: {entries.reduce((sum, entry) => sum + entry.score, 0)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 