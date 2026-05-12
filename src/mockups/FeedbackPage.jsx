import React from 'react'
import { Star, ChevronRight, Sparkles, BookOpen } from 'lucide-react'

const CONCEPTS = [
  { emoji: '⚔️', name: 'Arch-Nemesis Finder', desc: 'Meet your opposite' },
  { emoji: '🎓', name: 'Teacher & Learner', desc: 'Skill-sharing platform' },
  { emoji: '🎨', name: 'Half Artwork', desc: 'Collaborative art chains' },
  { emoji: '🔍', name: 'Interest Riddles', desc: 'Solve to connect' },
  { emoji: '🔄', name: 'Life Exchange', desc: 'Swap your routine' },
  { emoji: '🌡️', name: 'Social Thermometer', desc: 'Track social wellness' },
  { emoji: '📚', name: 'Study Buddy', desc: 'Find your study partner' },
  { emoji: '👋', name: 'Nudger', desc: 'Lightweight hang-out' },
  { emoji: '🏆', name: 'Trait Collector', desc: 'Gamified scavenger hunt' },
]

export default function FeedbackPage() {
  return (
    <div className="min-h-full" style={{
      background: 'linear-gradient(160deg, #1a0533 0%, #0f0a1e 40%, #0d1a2e 100%)',
      fontFamily: 'DM Sans, sans-serif',
    }}>

      <div className="h-6" />

      {/* Hero */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#4E2A84' }}>
            <Sparkles size={16} color="white" />
          </div>
          <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">DTC Mockups</span>
        </div>

        <h1 className="text-white mb-3 leading-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 900 }}>
          How might we help Northwestern students{' '}
          <em style={{ color: '#b388ff' }}>connect?</em>
        </h1>

        <p className="text-purple-200/70 text-sm leading-relaxed mb-5">
          Welcome! For DTC we built 9 mockups designed to facilitate social interaction among NU students, and are now deciding which to pursue. We'd appreciate any feedback you have.
        </p>

        <div className="rounded-2xl p-4 mb-2" style={{ background: 'rgba(78,42,132,0.25)', border: '1px solid rgba(178,136,255,0.2)' }}>
          <div className="flex items-start gap-3">
            <BookOpen size={18} className="text-purple-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-white text-sm font-semibold mb-1">How to use this mockup gallery</p>
              <p className="text-purple-200/70 text-xs leading-relaxed">
                Use the <strong className="text-purple-300">dropdown menu above the phone outline</strong> to switch between mockups. You can come back here to submit your thoughts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback CTA */}
      <div className="px-6 pb-8">
        <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #4E2A84, #7c3aed)', boxShadow: '0 8px 30px rgba(78,42,132,0.5)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} color="white" fill="white" />
            <span className="text-white text-sm font-bold">Share Your Feedback</span>
          </div>
          <p className="text-purple-200 text-xs mb-4 leading-relaxed">
            After exploring the mockups, let us know which ones you liked.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd-ClWBnla-O_fvVGeYPuIgeInV7rMXxh2fOAsyVdBf5Ak7YA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-purple-900 transition-all active:scale-95"
            style={{ background: 'white' }}
          >
            Submit Feedback
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="h-10" />

        <p className="text-center text-white text-xs mt-4">
          Built by Team Quatro Quatro · Northwestern University
        </p>
      </div>

    </div>
    
  )
}