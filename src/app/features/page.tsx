import { Leaderboard } from '@/components/guestbook/leaderboard'
import { KarmaSystem } from '@/components/guestbook/karma-system'
import { Card } from '@/components/common/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/common/button'
import { 
  Trophy, 
  Star, 
  Users, 
  Zap, 
  Award, 
  TrendingUp,
  Activity,
  BookOpen,
  Heart,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const mockLeaderboardData = [
  {
    id: '1',
    walletAddress: 'ABC123...',
    username: 'alice_builder',
    image: '',
    activity: 'Basketball Tournament',
    score: 150,
    proofOfPresence: 'verified',
    timestamp: Date.now() - 3600000
  },
  {
    id: '2',
    walletAddress: 'DEF456...',
    username: 'bob_developer',
    image: '',
    activity: 'Group Coding Session',
    score: 120,
    proofOfPresence: 'verified',
    timestamp: Date.now() - 7200000
  },
  {
    id: '3',
    walletAddress: 'GHI789...',
    username: 'carol_designer',
    image: '',
    activity: 'Design Workshop',
    score: 95,
    proofOfPresence: 'verified',
    timestamp: Date.now() - 10800000
  }
]

const mockGroupActivities = [
  {
    id: '4',
    walletAddress: 'JKL012...',
    username: 'dave_architect',
    image: '',
    activity: 'Team Building Exercise',
    score: 85,
    proofOfPresence: 'verified',
    timestamp: Date.now() - 14400000
  },
  {
    id: '5',
    walletAddress: 'MNO345...',
    username: 'eve_innovator',
    image: '',
    activity: 'Brainstorming Session',
    score: 75,
    proofOfPresence: 'verified',
    timestamp: Date.now() - 18000000
  }
]

export default function FeaturesPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Builders Mansion Features</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Discover the unique features that make Builders Mansion the ultimate web3 community platform
        </p>
      </div>

      {/* Skills & Interests Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-purple-500" />
          Skills & Interests
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Skills & Expertise</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Showcase your technical skills and expertise areas to connect with like-minded builders.
            </p>
            <div className="flex flex-wrap gap-2">
              {['DeFi', 'Smart Contracts', 'Frontend', 'AI/ML', 'Security', 'Design'].map(skill => (
                <Badge key={skill} variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Communities & Interests</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Connect with specific communities and show your interests in the Solana ecosystem.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Mad Lads', 'MonkeDAO', 'Superteam', 'Fondation'].map(interest => (
                <Badge key={interest} variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Activity Leaderboards
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <Leaderboard 
            entries={mockLeaderboardData}
            title="Sports & Activities"
            activityType="sports"
          />
          <Leaderboard 
            entries={mockGroupActivities}
            title="Group Activities"
            activityType="group"
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-4">
            Participate in activities and earn points with proof of presence verification
          </p>
          <Link href="/guestbook">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Activity className="h-4 w-4 mr-2" />
              Join Activities
            </Button>
          </Link>
        </div>
      </section>

      {/* Karma System Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          Karma & Recognition System
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">How It Works</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span>Reply to help other builders with questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Get upvoted for your helpful responses</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Earn karma points for each upvote</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>Unlock special "Helper" badge at 3+ upvotes</span>
              </div>
            </div>
          </Card>

          <KarmaSystem
            karma={25}
            hasSpecialBadge={true}
            helpfulReplies={5}
            entryId="demo"
            profileId="demo"
            hasUpvoted={false}
          />
        </div>
      </section>

      {/* Community Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-green-500" />
          Community Impact
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">150+</div>
            <div className="text-sm text-gray-400">Guestbook Entries</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-gray-400">Active Cohorts</div>
          </Card>
          <Card className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">1,250</div>
            <div className="text-sm text-gray-400">Total Karma</div>
          </Card>
          <Card className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-400">Helper Badges</div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <Card className="p-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
          <p className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto">
            Connect your wallet, showcase your skills, and start building meaningful connections in the web3 ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guestbook">
              <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Sign the Guestbook
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" className="px-8 py-3 text-lg">
                <Users className="h-5 w-5 mr-2" />
                Explore Community
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
} 