'use client'

import { Card } from '@/components/common/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { IGuestbookEntryWithAuthor } from '@/models/guestbook.models'
import { 
  Calendar, 
  Hash, 
  Heart, 
  MessageCircle, 
  Sparkles, 
  Target,
  Lightbulb,
  Trophy,
  Lock,
  Unlock
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

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

interface GuestbookEntryProps {
  entry: IGuestbookEntryWithAuthor
}

export function GuestbookEntry({ entry }: GuestbookEntryProps) {
  const MoodIcon = MOOD_ICONS[entry.entry.mood]
  const moodColor = MOOD_COLORS[entry.entry.mood]

  return (
    <Card className="p-6 hover:bg-gray-800/50 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {entry.author.image ? (
              <Image
                src={entry.author.image}
                width={40}
                height={40}
                alt={entry.author.username}
                className="object-cover rounded-full"
                unoptimized
              />
            ) : (
              <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {entry.author.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </Avatar>
          <div>
            <Link 
              href={`/${entry.author.username}`}
              className="font-semibold hover:text-purple-400 transition-colors"
            >
              {entry.author.username}
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="h-3 w-3" />
              {formatDistanceToNow(entry.entry.created_at, { addSuffix: true })}
              {!entry.entry.isPublic && (
                <Lock className="h-3 w-3 text-yellow-500" />
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {entry.entry.cohort}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Week {entry.entry.week}
          </Badge>
        </div>
      </div>

      {/* Main Message */}
      <div className="mb-4">
        <p className="text-gray-200 leading-relaxed">{entry.entry.text}</p>
      </div>

      {/* Experience */}
      {entry.entry.experience && (
        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-400">Main Experience</span>
          </div>
          <p className="text-sm text-gray-300">{entry.entry.experience}</p>
        </div>
      )}

      {/* Highlights */}
      {entry.entry.highlights.length > 0 && entry.entry.highlights[0] && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-400">Highlights</span>
          </div>
          <div className="space-y-1">
            {entry.entry.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-yellow-500">•</span>
                {highlight}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {entry.entry.tags.length > 0 && entry.entry.tags[0] && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-400">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {entry.entry.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Mood */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <MoodIcon className={`h-4 w-4 ${moodColor}`} />
          <span className="text-sm font-medium capitalize">{entry.entry.mood}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
            <Heart className="h-4 w-4" />
            <span>{entry.socialCounts.likeCount}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{entry.socialCounts.commentCount}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {entry.entry.isPublic ? (
            <Unlock className="h-4 w-4 text-green-500" />
          ) : (
            <Lock className="h-4 w-4 text-yellow-500" />
          )}
        </div>
      </div>
    </Card>
  )
} 