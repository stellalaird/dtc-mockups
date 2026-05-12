import React, { useState } from 'react'
import { ArrowLeft, MapPin, Clock, BookOpen, Users, Zap, Check } from 'lucide-react'

const BUILDINGS = [
  { name: 'Main Library', emoji: '📚', active: 34, floors: 4 },
  { name: 'Deering Library', emoji: '🏛️', active: 12, floors: 3 },
  { name: 'Tech', emoji: '💻', active: 28, floors: 5 },
  { name: 'Kresge Hall', emoji: '🎭', active: 8, floors: 2 },
  { name: 'Norris', emoji: '☕', active: 22, floors: 2 },
  { name: 'Mudd Library', emoji: '🔬', active: 19, floors: 3 },
]

const COURSES = ['CS 211', 'EA2', 'Math 228-1', 'Organic Chem', 'Econ 310', 'Stats 210', 'Physics 135', 'Econ 201', 'English 205', 'CS 396']

const PARTNERS = [
  { name: 'Aiden Park', course: 'CS 211', dist: '0.1mi', ago: '3 min ago', avatar: '🧑🏻‍💻', note: 'Working on HW2, need a debug partner' },
  { name: 'Rachel Kim', course: 'Math 228-1', dist: '0.0mi', ago: 'Just now', avatar: '👩🏻‍🔬', note: 'Stuck on Series & Sequences section' },
  { name: 'Omar Hassan', course: 'Econ 310', dist: '0.2mi', ago: '8 min ago', avatar: '🧑🏾‍📊', note: 'Game theory problem set, study group of 2 welcome' },
  { name: 'Lily Zhang', course: 'Organic Chem', dist: '0.3mi', ago: '15 min ago', avatar: '👩🏻‍⚗️', note: 'Mechanisms review, have Prentice notes' },
]

export default function StudyBuddy() {
  const [stage, setStage] = useState('signup')
  const [building, setBuilding] = useState(null)
  const [course, setCourse] = useState(null)
  const [accepted, setAccepted] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState('')

  const BG = '#faf6f0'
  const ACCENT = '#c2742a'
  const DARK = '#3d2207'

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <div className="mb-8">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: DARK }}>StudyBuddy Finder</h2>
        <p className="text-sm" style={{ color: '#a07850' }}>Find someone studying the same thing, right now.</p>
      </div>
      <div className="space-y-3 flex-1">
        {[['NU Email', 'you@u.northwestern.edu'], ['Name', 'Your name']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: '#a07850' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none" placeholder={p}
              style={{ background: 'white', borderColor: '#e8d8c8', color: DARK }} />
          </div>
        ))}
        <div className="rounded-xl p-3" style={{ background: '#fff3e8', border: '1px solid #f5d5b0' }}>
          <p className="text-xs" style={{ color: ACCENT }}>💡 StudyBuddy checks your location while active.</p>
        </div>
      </div>
      <button onClick={() => setStage('building')} className="w-full py-4 rounded-xl text-sm font-bold text-white mt-6 active:scale-95" style={{ background: ACCENT }}>
        Find a Study Spot →
      </button>
    </div>
  )

  if (stage === 'building') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <button onClick={() => setStage('signup')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#a07850' }}><ArrowLeft size={14}/></button>
      <h2 className="text-xl font-bold mb-1" style={{ color: DARK }}>Where are you studying?</h2>
      <p className="text-xs mb-5" style={{ color: '#a07850' }}>Active now at these locations</p>
      <div className="space-y-2">
        {BUILDINGS.map((b, i) => (
          <button key={i} onClick={() => { setBuilding(b); setStage('course') }}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 active:scale-95 transition-all"
            style={{ background: 'white', borderColor: building?.name === b.name ? ACCENT : '#e8d8c8' }}>
            <span className="text-2xl">{b.emoji}</span>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm" style={{ color: DARK }}>{b.name}</p>
              <p className="text-xs" style={{ color: '#a07850' }}>{b.floors} floors</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: b.active > 20 ? '#22c55e' : '#f59e0b' }} />
              <span className="text-xs font-bold" style={{ color: DARK }}>{b.active} active</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  if (stage === 'course') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <button onClick={() => setStage('building')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#a07850' }}><ArrowLeft size={14}/></button>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{building?.emoji}</span>
        <h2 className="text-xl font-bold" style={{ color: DARK }}>{building?.name}</h2>
      </div>
      <p className="text-xs mb-5" style={{ color: '#a07850' }}>What are you studying?</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {COURSES.map(c => (
          <button key={c} onClick={() => { setCourse(c); setStage('browse') }}
            className="px-4 py-2 rounded-xl text-sm font-bold border-2 active:scale-95 transition-all"
            style={{ background: course === c ? ACCENT : 'white', color: course === c ? 'white' : DARK, borderColor: course === c ? ACCENT : '#e8d8c8' }}>
            {c}
          </button>
        ))}
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: '#a07850' }}>Or type your course</label>
        <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none" placeholder="e.g. Poli Sci 210"
          style={{ background: 'white', borderColor: '#e8d8c8', color: DARK }}
          onKeyDown={e => { if(e.key === 'Enter' && e.target.value) { setCourse(e.target.value); setStage('browse') } }} />
      </div>
    </div>
  )

  if (stage === 'browse') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <button onClick={() => setStage('course')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#a07850' }}><ArrowLeft size={14}/></button>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: DARK }}>Study Requests</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: '#fff3e8', color: ACCENT }}>{building?.emoji} {building?.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: '#fff3e8', color: ACCENT }}>📖 {course}</span>
          </div>
        </div>
        <button onClick={() => setStage('post')} className="text-xs font-bold px-3 py-2 rounded-lg text-white" style={{ background: ACCENT }}>+ Post</button>
      </div>
      <div className="space-y-3">
        {PARTNERS.map((p, i) => (
          <div key={i} className="rounded-2xl p-4 border-2" style={{ background: 'white', borderColor: '#e8d8c8' }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: '#fff3e8' }}>{p.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm" style={{ color: DARK }}>{p.name}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-green-500" />
                    <span className="text-xs" style={{ color: '#888' }}>{p.ago}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#fff3e8', color: ACCENT }}>{p.course}</span>
                  <span className="text-xs" style={{ color: '#a07850' }}>📍 {p.dist}</span>
                </div>
              </div>
            </div>
            <p className="text-xs mb-3" style={{ color: '#888' }}>"{p.note}"</p>
            <button onClick={() => { setAccepted(p); setStage('matched') }}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white active:scale-95" style={{ background: ACCENT }}>
              Select →
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  if (stage === 'post') return (
    <div className="min-h-full flex flex-col px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <button onClick={() => setStage('browse')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#a07850' }}><ArrowLeft size={14}/></button>
      <h2 className="text-xl font-bold mb-5" style={{ color: DARK }}>Post a Study Request</h2>
      <div className="space-y-4 flex-1">
        {[['Course', course || ''], ['Note', 'What are you working on?'], ['Room', 'Where can they find you?']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: '#a07850' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none" defaultValue={p}
              style={{ background: 'white', borderColor: '#e8d8c8', color: DARK }} />
          </div>
        ))}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: '#a07850' }}>Duration</label>
          <div className="flex gap-2">
            {['30 min', '1 hour', '2 hours', 'Until done'].map(d => {
              const isSelected = selectedDuration === d

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDuration(d)}
                  className="flex-1 py-2 rounded-lg text-xs font-bold border transition-all active:scale-95"
                  style={{
                    background: isSelected ? ACCENT : 'white',
                    borderColor: isSelected ? ACCENT : '#e8d8c8',
                    color: isSelected ? 'white' : DARK,
                    boxShadow: isSelected
                      ? '0 4px 12px rgba(0,0,0,0.12)'
                      : 'none',
                  }}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <button onClick={() => setStage('browse')} className="w-full py-4 rounded-xl text-sm font-bold text-white mt-6 active:scale-95" style={{ background: ACCENT }}>
        Post Request →
      </button>
    </div>
  )

  if (stage === 'matched' && accepted) return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <div className="text-5xl mb-4 animate-bounce-in">🤝</div>
      <h2 className="text-2xl font-bold mb-2 text-center animate-fade-in" style={{ color: DARK }}>Study buddy found!</h2>
      <p className="text-sm text-center mb-6 animate-fade-in delay-100" style={{ color: '#a07850' }}>
        {accepted.name} confirmed. Head over to meet them.
      </p>
      <div className="w-full rounded-2xl p-5 mb-5 animate-fade-in delay-200" style={{ background: 'white', border: '2px solid #e8d8c8' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">{accepted.avatar}</div>
          <div>
            <p className="font-bold" style={{ color: DARK }}>{accepted.name}</p>
            <p className="text-xs" style={{ color: '#a07850' }}>{accepted.course} · {accepted.dist} away</p>
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <p style={{ color: '#888' }}>📍 {building?.name}</p>
          <p style={{ color: '#888' }}>💬 "{accepted.note}"</p>
        </div>
      </div>
      <div className="flex gap-3 w-full animate-fade-in delay-300">
        <button className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: ACCENT }}>Message Them</button>
        <button onClick={() => setStage('browse')} className="flex-1 py-3 rounded-xl text-sm font-bold border" style={{ borderColor: '#e8d8c8', color: DARK }}>See Others</button>
      </div>
    </div>
  )
}