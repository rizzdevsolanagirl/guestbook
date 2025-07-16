'use client'

import { Button } from '@/components/common/button'
import { Card } from '@/components/common/card'
import { Input } from '@/components/form/input'
import { useCreateGuestbookEntry } from '@/components/guestbook/hooks/use-create-guestbook-entry'
import { useCurrentWallet } from '@/components/auth/hooks/use-current-wallet'
import { useGetProfiles } from '@/components/auth/hooks/use-get-profiles'
import { useState } from 'react'
import { toast } from 'sonner'
import { 
  BookOpen, 
  Calendar, 
  Hash, 
  Heart, 
  Lock, 
  Unlock, 
  User,
  Sparkles,
  Target,
  Lightbulb,
  Trophy,
  Smile
} from 'lucide-react'

const MOOD_OPTIONS = [
  { value: 'excited', label: 'Excited', icon: Sparkles, color: 'text-yellow-500' },
  { value: 'inspired', label: 'Inspired', icon: Lightbulb, color: 'text-blue-500' },
  { value: 'challenged', label: 'Challenged', icon: Target, color: 'text-orange-500' },
  { value: 'accomplished', label: 'Accomplished', icon: Trophy, color: 'text-green-500' },
  { value: 'grateful', label: 'Grateful', icon: Heart, color: 'text-pink-500' },
] as const

const COHORT_OPTIONS = [
  'Alpha Cohort',
  'Beta Cohort', 
  'Gamma Cohort',
  'Delta Cohort',
  'Epsilon Cohort'
]

const WEEK_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8]

type MoodType = typeof MOOD_OPTIONS[number]['value']

export function GuestbookEntryForm() {
  const { walletAddress } = useCurrentWallet()
  const { profiles } = useGetProfiles({ walletAddress: walletAddress || '' })
  const { createEntry, isLoading } = useCreateGuestbookEntry()

  const [formData, setFormData] = useState({
    text: '',
    cohort: '',
    week: 1,
    experience: '',
    highlights: [''],
    tags: [''],
    mood: 'excited' as MoodType,
    isPublic: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profiles?.[0]?.profile?.id) {
      toast.error('Please create a profile first')
      return
    }

    if (!formData.text.trim() || !formData.cohort || !formData.experience.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      await createEntry({
        profileId: profiles[0].profile.id,
        text: formData.text.trim(),
        cohort: formData.cohort,
        week: formData.week,
        experience: formData.experience.trim(),
        highlights: formData.highlights.filter(h => h.trim()),
        tags: formData.tags.filter(t => t.trim()),
        mood: formData.mood,
        isPublic: formData.isPublic
      })

      toast.success('Guestbook entry created successfully!')
      
      // Reset form
      setFormData({
        text: '',
        cohort: '',
        week: 1,
        experience: '',
        highlights: [''],
        tags: [''],
        mood: 'excited',
        isPublic: true
      })
    } catch {
      toast.error('Failed to create guestbook entry')
    }
  }

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }))
  }

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }))
  }

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }))
  }

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }))
  }

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((t, i) => i === index ? value : t)
    }))
  }

  if (!profiles?.[0]?.profile?.id) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Create a Profile First</h3>
          <p className="text-gray-400">You need to create a profile before you can sign the guestbook.</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6 text-purple-500" />
        <h2 className="text-xl font-bold">Sign the Builders Mansion Guestbook</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Message */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Message *
          </label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Share your experience at Builders Mansion..."
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            required
          />
        </div>

        {/* Cohort and Week */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Cohort *
            </label>
            <select
              value={formData.cohort}
              onChange={(e) => setFormData(prev => ({ ...prev, cohort: e.target.value }))}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Select your cohort</option>
              {COHORT_OPTIONS.map(cohort => (
                <option key={cohort} value={cohort}>{cohort}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Week *
            </label>
            <select
              value={formData.week}
              onChange={(e) => setFormData(prev => ({ ...prev, week: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              {WEEK_OPTIONS.map(week => (
                <option key={week} value={week}>Week {week}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Target className="h-4 w-4 inline mr-2" />
            What was your main experience? *
          </label>
          <textarea
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            placeholder="Describe your main experience or achievement..."
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
            required
          />
        </div>

        {/* Highlights */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Sparkles className="h-4 w-4 inline mr-2" />
            Highlights & Key Moments
          </label>
          <div className="space-y-2">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  name={`highlight-${index}`}
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  placeholder="Add a highlight..."
                />
                {formData.highlights.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeHighlight(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={addHighlight}
              className="text-purple-500 hover:text-purple-400"
            >
              + Add Highlight
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Hash className="h-4 w-4 inline mr-2" />
            Tags
          </label>
          <div className="space-y-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  name={`tag-${index}`}
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder="Add a tag..."
                />
                {formData.tags.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeTag(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={addTag}
              className="text-purple-500 hover:text-purple-400"
            >
              + Add Tag
            </Button>
          </div>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Smile className="h-4 w-4 inline mr-2" />
            How are you feeling about your experience?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {MOOD_OPTIONS.map(({ value, label, icon: Icon, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, mood: value }))}
                className={`p-3 rounded-lg border transition-all ${
                  formData.mood === value
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto mb-1 ${color}`} />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {formData.isPublic ? (
              <Unlock className="h-4 w-4 text-green-500" />
            ) : (
              <Lock className="h-4 w-4 text-yellow-500" />
            )}
            <span className="text-sm">
              {formData.isPublic ? 'Public Entry' : 'Private Entry'}
            </span>
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isLoading ? 'Creating Entry...' : 'Sign the Guestbook'}
        </Button>
      </form>
    </Card>
  )
} 