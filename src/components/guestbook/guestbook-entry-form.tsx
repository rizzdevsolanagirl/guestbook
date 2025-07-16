'use client'

import { Button } from '@/components/common/button'
import { Card } from '@/components/common/card'
import { Input } from '@/components/form/input'
import { useCreateGuestbookEntry } from '@/components/guestbook/hooks/use-create-guestbook-entry'
import { useCurrentWallet } from '@/components/auth/hooks/use-current-wallet'
import { useGetProfiles } from '@/components/auth/hooks/use-get-profiles'
import { SKILL_OPTIONS, INTEREST_OPTIONS, SkillType, InterestType } from '@/models/guestbook.models'
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
  Smile,
  Zap,
  Users
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
    skills: [] as SkillType[],
    interests: [] as InterestType[],
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
        skills: formData.skills,
        interests: formData.interests,
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
        skills: [],
        interests: [],
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

  const toggleSkill = (skill: SkillType) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const toggleInterest = (interest: InterestType) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
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
            Main Experience *
          </label>
          <textarea
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            placeholder="What was your main experience or achievement this week?"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
            required
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Zap className="h-4 w-4 inline mr-2" />
            Skills & Expertise
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {SKILL_OPTIONS.map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  formData.skills.includes(skill)
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Users className="h-4 w-4 inline mr-2" />
            Communities & Interests
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {INTEREST_OPTIONS.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  formData.interests.includes(interest)
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Sparkles className="h-4 w-4 inline mr-2" />
            Highlights
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
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeHighlight(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={addHighlight}
              className="w-full"
            >
              Add Highlight
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Hash className="h-4 w-4 inline mr-2" />
            Custom Tags
          </label>
          <div className="space-y-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  name={`tag-${index}`}
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder="Add a custom tag..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeTag(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={addTag}
              className="w-full"
            >
              Add Tag
            </Button>
          </div>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Smile className="h-4 w-4 inline mr-2" />
            How are you feeling?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {MOOD_OPTIONS.map(mood => {
              const MoodIcon = mood.icon
              return (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
                  className={`p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
                    formData.mood === mood.value
                      ? 'bg-gray-700 border-gray-500'
                      : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <MoodIcon className={`h-5 w-5 ${mood.color}`} />
                  <span className="text-sm">{mood.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
            className="flex items-center gap-2 p-2 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
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

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? 'Creating Entry...' : 'Sign Guestbook'}
        </Button>
      </form>
    </Card>
  )
} 