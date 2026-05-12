import React, { useState } from 'react'
import { ArrowLeft, Guitar, Code, Camera, ChefHat, Mountain, Trophy, BookOpen, MessageCircle, Check } from 'lucide-react'

const SKILLS = [
  { icon: '🎸', name: 'Guitar', level: 'Beginner friendly', teacher: 'Amara Nwosu', year: 'Junior', rating: 4.9, avail: 'Tues/Thurs evenings' },
  { icon: '🍜', name: 'Cooking', level: 'All levels', teacher: 'Kai Shimizu', year: 'Senior', rating: 4.8, avail: 'Weekends' },
  { icon: '🧗', name: 'Rock Climbing', level: 'Intermediate', teacher: 'Leila Ahmadi', year: 'Junior', rating: 5.0, avail: 'Mon/Wed/Fri' },
  { icon: '💻', name: 'Web Coding', level: 'Beginner friendly', teacher: 'Marcus Bell', year: 'Sophomore', rating: 4.7, avail: 'Flexible' },
  { icon: '📷', name: 'Photography', level: 'All levels', teacher: 'Sofia Reyes', year: 'Senior', rating: 4.9, avail: 'Weekends only' },
  { icon: '🎾', name: 'Tennis', level: 'Beginner', teacher: 'James Park', year: 'Freshman', rating: 4.6, avail: 'Mon/Wed/Sat' },
  { icon: '♟️', name: 'Chess', level: 'All levels', teacher: 'Priya K.', year: 'Senior', rating: 5.0, avail: 'Daily 7–9pm' },
]

export default function TeacherLearner() {
  const [stage, setStage] = useState('signup')
  const [role, setRole] = useState(null)
  const [selected, setSelected] = useState(null)
  const [reqSent, setReqSent] = useState(false)
  const [matched, setMatched] = useState(false)

  const BG = 'linear-gradient(160deg, #fffaf0 0%, #fff8e8 100%)'
  const ACCENT = '#c67c35'
  const WARM = '#7a3b00'

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Quicksand, sans-serif' }}>
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl" style={{ background: '#fff3dc', border: '2px solid #f5d9a0' }}>🤝</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: WARM, fontFamily: 'Quicksand, sans-serif' }}>Skill Sharing @ NU</h2>
        <p className="text-sm" style={{ color: '#a07040' }}>Teach what you love. Learn what you want.</p>
      </div>
      <div className="space-y-3 flex-1">
        {[['Northwestern Email', 'you@u.northwestern.edu'], ['Full Name', 'Your name'], ['Instagram (optional)', '@yourhandle']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs font-bold uppercase tracking-wide mb-1 block" style={{ color: '#a07040' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-2xl text-sm border-2 outline-none transition-colors" style={{ background: '#fff', borderColor: '#f5d9a0', color: WARM }} placeholder={p} />
          </div>
        ))}
      </div>
      <button onClick={() => setStage('role')} className="w-full py-4 rounded-2xl text-sm font-bold text-white mt-6 active:scale-95" style={{ background: ACCENT }}>
        Join the Community →
      </button>
    </div>
  )

  if (stage === 'role') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Quicksand, sans-serif' }}>
      <button onClick={() => setStage('signup')} className="flex items-center gap-1 text-sm mb-8" style={{ color: '#a07040' }}><ArrowLeft size={14}/> back</button>
      <h2 className="text-2xl font-bold mb-2" style={{ color: WARM }}>What brings you here?</h2>
      <p className="text-sm mb-8" style={{ color: '#a07040' }}>You can always switch later.</p>
      <div className="space-y-4 flex-1">
        {[
          { r: 'teach', emoji: '🎓', title: 'I want to teach', desc: 'Share a skill you\'re passionate about (not implemented yet 😔)' },
          { r: 'learn', emoji: '📖', title: 'I want to learn', desc: 'Find someone who can teach you something new' },
          { r: 'both', emoji: '🔄', title: 'Both!', desc: 'Teach one thing, learn another' },
        ].map(({ r, emoji, title, desc }) => (
          <button key={r} onClick={() => { setRole(r); setStage('browse') }}
            className="w-full text-left p-5 rounded-2xl border-2 transition-all active:scale-95"
            style={{ background: '#fff', borderColor: role === r ? ACCENT : '#f5d9a0' }}>
            <span className="text-3xl block mb-2">{emoji}</span>
            <p className="font-bold text-base mb-1" style={{ color: WARM }}>{title}</p>
            <p className="text-xs" style={{ color: '#a07040' }}>{desc}</p>
          </button>
        ))}
      </div>
    </div>
  )

  if (stage === 'browse') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'Quicksand, sans-serif' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold" style={{ color: WARM }}>Skills Available</h2>
          <p className="text-xs" style={{ color: '#a07040' }}>7 teachers near you</p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: '#fff3dc' }}>🌿</div>
      </div>
      <div className="space-y-3">
        {SKILLS.map((s, i) => (
          <button key={i} onClick={() => { setSelected(s); setStage('detail') }}
            className="w-full text-left p-4 rounded-2xl border-2 active:scale-95 transition-all"
            style={{ background: '#fff', borderColor: '#f5d9a0' }}>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{s.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold" style={{ color: WARM }}>{s.name}</p>
                  <span className="text-xs font-bold" style={{ color: ACCENT }}>⭐ {s.rating}</span>
                </div>
                <p className="text-xs mb-1" style={{ color: '#a07040' }}>{s.teacher} · {s.year}</p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#fff3dc', color: ACCENT }}>{s.level}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#fff3dc', color: ACCENT }}>🗓 {s.avail}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  if (stage === 'detail' && selected) return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'Quicksand, sans-serif' }}>
      <button onClick={() => setStage('browse')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#a07040' }}><ArrowLeft size={14}/> Browse</button>
      <div className="rounded-3xl p-5 mb-4" style={{ background: '#fff', border: '2px solid #f5d9a0' }}>
        <div className="text-center mb-4">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-5xl" style={{ background: '#fff3dc' }}>{selected.icon}</div>
          <h3 className="text-xl font-bold" style={{ color: WARM }}>{selected.name} Lessons</h3>
          <p className="text-sm" style={{ color: '#a07040' }}>with {selected.teacher}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            {'⭐'.repeat(Math.round(selected.rating))}<span className="text-xs ml-1" style={{ color: ACCENT }}>{selected.rating}</span>
          </div>
        </div>
        <div className="space-y-2">
          {[['Level', selected.level], ['Availability', selected.avail], ['Location', 'Norris / Library / Flexible'], ['Format', '1-hour sessions, 1-on-1']].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="font-semibold" style={{ color: '#a07040' }}>{k}</span>
              <span style={{ color: WARM }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {!reqSent ? (
        <button onClick={() => { setReqSent(true); setTimeout(() => { setStage('matched') }, 1200) }}
          className="w-full py-4 rounded-2xl text-sm font-bold text-white active:scale-95"
          style={{ background: ACCENT }}>
          <MessageCircle size={16} className="inline mr-2" />Send Learning Request
        </button>
      ) : (
        <div className="w-full py-4 rounded-2xl text-sm font-bold text-center" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
          ✓ Request Sent! Waiting for response...
        </div>
      )}
    </div>
  )

  if (stage === 'matched') return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 pb-8" style={{ background: BG, fontFamily: 'Quicksand, sans-serif' }}>
      <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
      <h2 className="text-2xl font-bold mb-2 text-center animate-fade-in" style={{ color: WARM }}>You're matched!</h2>
      <p className="text-sm text-center mb-8 animate-fade-in delay-100" style={{ color: '#a07040' }}>
        {selected?.teacher} accepted your request for <strong>{selected?.name}</strong> lessons.
      </p>
      <div className="w-full rounded-3xl p-5 mb-6 animate-fade-in delay-200" style={{ background: '#fff', border: '2px solid #f5d9a0' }}>
        <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#a07040' }}>First Session</p>
        <div className="space-y-2 text-sm" style={{ color: WARM }}>
          <p>📅 This Saturday, 2:00 PM</p>
          <p>📍 Norris University Center, Rm 204</p>
          <p>⏱ 60 minutes</p>
        </div>
      </div>
      <div className="flex gap-3 w-full animate-fade-in delay-300">
        <button className="flex-1 py-3 rounded-2xl text-sm font-bold text-white" style={{ background: ACCENT }}>Open Chat</button>
        <button onClick={() => setStage('browse')} className="flex-1 py-3 rounded-2xl text-sm font-bold border-2" style={{ borderColor: '#f5d9a0', color: WARM }}>Browse More</button>
      </div>
    </div>
  )
}