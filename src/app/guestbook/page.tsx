'use client'

import { GuestbookEntryForm } from '@/components/guestbook/guestbook-entry-form'
import { GuestbookEntry } from '@/components/guestbook/guestbook-entry'
import { GuestbookStats } from '@/components/guestbook/guestbook-stats'
import { useGuestbookEntries } from '@/components/guestbook/hooks/use-guestbook-entries'
import { useCurrentWallet } from '@/components/auth/hooks/use-current-wallet'
import { useGetProfiles } from '@/components/auth/hooks/use-get-profiles'
import { Button } from '@/components/common/button'
import { 
  BookOpen, 
  Filter, 
  Plus, 
  Users,
  Sparkles,
  Lightbulb,
  Target,
  Trophy,
  Heart
} from 'lucide-react'
import { useState } from 'react'

const COHORT_OPTIONS = [
  'All Cohorts',
  'Alpha Cohort',
  'Beta Cohort', 
  'Gamma Cohort',
  'Delta Cohort',
  'Epsilon Cohort'
]

const WEEK_OPTIONS = [
  'All Weeks',
  'Week 1',
  'Week 2',
  'Week 3',
  'Week 4',
  'Week 5',
  'Week 6',
  'Week 7',
  'Week 8'
]

const MOOD_OPTIONS = [
  { value: 'all', label: 'All Moods', icon: Users },
  { value: 'excited', label: 'Excited', icon: Sparkles },
  { value: 'inspired', label: 'Inspired', icon: Lightbulb },
  { value: 'challenged', label: 'Challenged', icon: Target },
  { value: 'accomplished', label: 'Accomplished', icon: Trophy },
  { value: 'grateful', label: 'Grateful', icon: Heart },
]

export default function GuestbookPage() {
  const { walletAddress } = useCurrentWallet()
  const { profiles: _ } = useGetProfiles({ walletAddress: walletAddress || '' })
  const [showForm, setShowForm] = useState(false)
  const [filters, setFilters] = useState({
    cohort: '',
    week: '',
    mood: ''
  })

  const { entries, pagination, isLoading, error } = useGuestbookEntries({
    requestingProfileId: _?.[0]?.profile?.id,
    cohort: filters.cohort || undefined,
    week: filters.week ? parseInt(filters.week) : undefined,
    mood: filters.mood || undefined,
  })

  const handleFilterChange = (type: 'cohort' | 'week' | 'mood', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: value === 'All Cohorts' || value === 'All Weeks' || value === 'All Moods' ? '' : value
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Builders Mansion Guestbook</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Share your journey, connect with fellow builders, and leave your mark on the Builders Mansion experience
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <GuestbookStats />
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? 'Hide Form' : 'Sign Guestbook'}
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-gray-400" />
            
            <select
              value={filters.cohort || 'All Cohorts'}
              onChange={(e) => handleFilterChange('cohort', e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {COHORT_OPTIONS.map(cohort => (
                <option key={cohort} value={cohort}>{cohort}</option>
              ))}
            </select>

            <select
              value={filters.week || 'All Weeks'}
              onChange={(e) => handleFilterChange('week', e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {WEEK_OPTIONS.map(week => (
                <option key={week} value={week}>{week}</option>
              ))}
            </select>

            <select
              value={filters.mood || 'All Moods'}
              onChange={(e) => handleFilterChange('mood', e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {MOOD_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Entry Form */}
        {showForm && (
          <div className="mb-8">
            <GuestbookEntryForm />
          </div>
        )}

        {/* Entries */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading guestbook entries...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Failed to load guestbook entries</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400 mb-4">No guestbook entries yet</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Be the first to sign!
              </Button>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-400 mb-4">
                Showing {entries.length} of {pagination.totalCount} entries
              </div>
              {entries.map((entry) => (
                <GuestbookEntry key={entry.entry.id} entry={entry} />
              ))}
            </>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="ghost"
              disabled={pagination.page === 1}
              className="px-3 py-2"
            >
              Previous
            </Button>
            <span className="px-3 py-2 text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="ghost"
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-2"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 