'use client'

import { Card } from '@/components/common/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/common/button'
import { IKarmaResponse } from '@/models/guestbook.models'
import { 
  Star, 
  ThumbsUp, 
  Award, 
  Heart,
  MessageCircle,
  TrendingUp,
  Crown
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface KarmaSystemProps {
  karma: number
  hasSpecialBadge: boolean
  helpfulReplies: number
  entryId: string
  profileId: string
  onUpvote?: (entryId: string, profileId: string) => Promise<void>
  hasUpvoted: boolean
}

export function KarmaSystem({ 
  karma, 
  hasSpecialBadge, 
  helpfulReplies, 
  entryId, 
  profileId, 
  onUpvote,
  hasUpvoted 
}: KarmaSystemProps) {
  const [isUpvoting, setIsUpvoting] = useState(false)

  const handleUpvote = async () => {
    if (!onUpvote) return
    
    try {
      setIsUpvoting(true)
      await onUpvote(entryId, profileId)
      toast.success('Upvoted for helpful reply!')
    } catch (error) {
      toast.error('Failed to upvote')
    } finally {
      setIsUpvoting(false)
    }
  }

  const getKarmaLevel = (karma: number) => {
    if (karma >= 50) return { level: 'Legendary', color: 'text-purple-400', icon: Crown }
    if (karma >= 30) return { level: 'Expert', color: 'text-blue-400', icon: Award }
    if (karma >= 15) return { level: 'Helper', color: 'text-green-400', icon: Star }
    if (karma >= 5) return { level: 'Contributor', color: 'text-yellow-400', icon: Heart }
    return { level: 'Newcomer', color: 'text-gray-400', icon: MessageCircle }
  }

  const karmaLevel = getKarmaLevel(karma)
  const KarmaIcon = karmaLevel.icon

  return (
    <Card className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold text-lg">Karma System</span>
        </div>
        {hasSpecialBadge && (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Award className="h-3 w-3 mr-1" />
            Special Badge
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Karma Points */}
        <div className="text-center p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-2xl font-bold text-green-400">{karma}</span>
          </div>
          <span className="text-sm text-gray-400">Total Karma</span>
        </div>

        {/* Karma Level */}
        <div className="text-center p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <KarmaIcon className={`h-4 w-4 ${karmaLevel.color}`} />
            <span className={`text-lg font-semibold ${karmaLevel.color}`}>
              {karmaLevel.level}
            </span>
          </div>
          <span className="text-sm text-gray-400">Level</span>
        </div>

        {/* Helpful Replies */}
        <div className="text-center p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ThumbsUp className="h-4 w-4 text-blue-500" />
            <span className="text-2xl font-bold text-blue-400">{helpfulReplies}</span>
          </div>
          <span className="text-sm text-gray-400">Helpful Replies</span>
        </div>
      </div>

      {/* Upvote Button */}
      {onUpvote && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <p>• Upvote helpful replies to earn karma</p>
            <p>• Reach 3+ upvotes to earn the special badge</p>
          </div>
          <Button
            onClick={handleUpvote}
            disabled={isUpvoting || hasUpvoted}
            variant={hasUpvoted ? "secondary" : "default"}
            className={`flex items-center gap-2 ${
              hasUpvoted 
                ? 'bg-green-600 text-white' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isUpvoting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Upvoting...
              </>
            ) : hasUpvoted ? (
              <>
                <ThumbsUp className="h-4 w-4" />
                Upvoted
              </>
            ) : (
              <>
                <ThumbsUp className="h-4 w-4" />
                Upvote Helpful
              </>
            )}
          </Button>
        </div>
      )}

      {/* Special Badge Info */}
      {!hasSpecialBadge && helpfulReplies >= 3 && (
        <div className="mt-3 p-3 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-500/20">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-400">
              Congratulations! You've earned the special "Helper" badge!
            </span>
          </div>
        </div>
      )}

      {/* Progress to Next Level */}
      {karma < 50 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Progress to next level</span>
            <span className="text-gray-300">
              {karma}/{karma >= 30 ? 50 : karma >= 15 ? 30 : karma >= 5 ? 15 : 5}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (karma / (karma >= 30 ? 50 : karma >= 15 ? 30 : karma >= 5 ? 15 : 5)) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      )}
    </Card>
  )
} 