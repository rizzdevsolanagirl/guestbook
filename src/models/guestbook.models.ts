import { IPaginatedResponse } from '@/models/common.models'

// Predefined skill and interest options
export const SKILL_OPTIONS = [
  'DePIN',
  'DeFi',
  'Social',
  'Consumer',
  'Wellness',
  'Trading',
  'NFTs',
  'Gaming',
  'Token Extensions',
  'Validator Ops',
  'Frontend',
  'Dev Tooling',
  'Smart Contracts',
  'AI/ML',
  'Security',
  'MEV',
  'Growth',
  'Design',
  'Storytelling',
  'Ecosystem Ops'
] as const

export const INTEREST_OPTIONS = [
  'Mad Lads',
  'MonkeDAO',
  'MoustacheDAO',
  'Solana Business Frogs',
  'Superteam',
  'Fondation'
] as const

export type SkillType = typeof SKILL_OPTIONS[number]
export type InterestType = typeof INTEREST_OPTIONS[number]

export interface IGuestbookEntry {
  id: string
  created_at: number
  updated_at: number
  text: string
  cohort: string
  week: number
  experience: string
  highlights: string[]
  tags: string[]
  skills: SkillType[]
  interests: InterestType[]
  mood: 'excited' | 'inspired' | 'challenged' | 'accomplished' | 'grateful'
  isPublic: boolean
  karma: number
  helpfulReplies: number
  hasSpecialBadge: boolean
}

export interface IGuestbookAuthor {
  id: string
  namespace: string
  created_at: number
  username: string
  bio: string
  image: string
  walletAddress: string
  karma: number
  hasSpecialBadge: boolean
}

export interface IGuestbookSocialCounts {
  likeCount: number
  commentCount: number
  upvoteCount: number
}

export interface IGuestbookEntryWithAuthor {
  entry: IGuestbookEntry
  author: IGuestbookAuthor
  socialCounts: IGuestbookSocialCounts
  requestingProfileSocialInfo: {
    hasLiked: boolean
    hasUpvoted: boolean
  }
}

export interface IGuestbookResponse extends IPaginatedResponse {
  entries: IGuestbookEntryWithAuthor[]
}

export interface ICreateGuestbookEntryRequest {
  profileId: string
  text: string
  cohort: string
  week: number
  experience: string
  highlights: string[]
  tags: string[]
  skills: SkillType[]
  interests: InterestType[]
  mood: 'excited' | 'inspired' | 'challenged' | 'accomplished' | 'grateful'
  isPublic: boolean
}

export interface IUpdateGuestbookEntryRequest {
  entryId: string
  profileId: string
  text?: string
  cohort?: string
  week?: number
  experience?: string
  highlights?: string[]
  tags?: string[]
  skills?: SkillType[]
  interests?: InterestType[]
  mood?: 'excited' | 'inspired' | 'challenged' | 'accomplished' | 'grateful'
  isPublic?: boolean
}

export interface IGuestbookStats {
  totalEntries: number
  totalCohorts: number
  totalWeeks: number
  averageMood: string
  topTags: Array<{ tag: string; count: number }>
  topSkills: Array<{ skill: string; count: number }>
  topInterests: Array<{ interest: string; count: number }>
  recentActivity: number
  totalKarma: number
  specialBadgeHolders: number
}

// Leaderboard models
export interface ILeaderboardEntry {
  id: string
  walletAddress: string
  username: string
  image?: string
  activity: string
  score: number
  proofOfPresence?: string
  timestamp: number
}

export interface ILeaderboardResponse extends IPaginatedResponse {
  entries: ILeaderboardEntry[]
}

// Karma and upvote models
export interface IUpvoteRequest {
  entryId: string
  profileId: string
}

export interface IKarmaResponse {
  karma: number
  hasSpecialBadge: boolean
  helpfulReplies: number
} 