import React, { useState } from 'react'
import { Flame, Zap, Shield, ChevronRight, ArrowLeft, Skull } from 'lucide-react'

const QUESTIONS = [
  { q: 'Your ideal Saturday starts with...', opts: ['5am ice bath', '10am boxing match w/ roommate', '1pm wake-up', '4pm study sesh on the lakefill'] },
  { q: 'Favorite color', opts: ['Purple', 'Blue', 'Red', 'Green'] },
  { q: 'Best dining hall?', opts: ['---> Plex <--- (right answer)', 'Elder', 'Allison', 'Sarge'] },
  { q: 'Group role', opts: ['Group leader', 'Type A', 'Follower', 'Switching up on my day ones'] },
  { q: 'Style of revenge', opts: ['Sneaky', 'Swordfight', 'WWIII', 'I forgive cuz Im kind'] },
]

const NEMESIS = {
  name: 'Sarah Satan Smith',
  year: 'Sophomore',
  dorm: 'East Fairchild',
  score: '0.01%',
  badges: ['Morning Person', 'Matcha Connoisseur', 'Sarge Regular'],
  bio: 'Performative triple major. Up at 5:30am. Has never skipped a class.',
  avatar: '👩🏽‍💻',
}

const RIVALS = [
  { name: 'Ethan Goldberg', score: 11, avatar: '🧑🏻‍🎓' },
  { name: 'Sofia Reyes', score: 14, avatar: '👩🏽‍🎨' },
  { name: 'James Park', score: 16, avatar: '🧑🏻‍💻' },
]

const stages = ['signup', 'profile', 'home', 'quiz', 'loading', 'reveal']

export default function ArchNemesis() {
  const [stage, setStage] = useState('signup')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState({})
  const [qIdx, setQIdx] = useState(0)
  const [loadPct, setLoadPct] = useState(0)
  const [selectedVibe, setSelectedVibe] = useState('')

  const next = (s) => setStage(s)

  const handleAnswer = (a) => {
    const newA = { ...answers, [qIdx]: a }
    setAnswers(newA)
    if (qIdx < QUESTIONS.length - 1) {
      setQIdx(qIdx + 1)
    } else {
      setStage('loading')
      let p = 0
      const iv = setInterval(() => {
        p += Math.random() * 18
        if (p >= 100) { clearInterval(iv); setLoadPct(100); setTimeout(() => setStage('reveal'), 600) }
        else setLoadPct(Math.round(p))
      }, 200)
    }
  }

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: '#0d0d0d', fontFamily: 'Space Mono, monospace' }}>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Skull size={20} color="#ff3333" />
          <span className="text-red-500 text-xs tracking-widest uppercase font-bold">ARCH-NEMESIS FINDER</span>
        </div>
        <h2 className="text-white text-2xl font-bold leading-tight">Find your<br/><span style={{ color: '#ff3333' }}>opp.</span></h2>
        <p className="text-gray-500 text-xs mt-2">The person you will hate till the day you die.</p>
      </div>
      <div className="space-y-3 flex-1">
        <div>
          <label className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Northwestern Email</label>
          <input
            className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors"
            placeholder="you@u.northwestern.edu"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Display Name</label>
          <input
            className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="rounded-xl p-4" style={{ background: '#1a0000', border: '1px solid #330000' }}>
          <p className="text-red-400 text-xs leading-relaxed">⚠️ Warning: Your arch-nemesis will be notified. Rivalry is imminent. No backing out.</p>
        </div>
      </div>
      <button
        onClick={() => next('profile')}
        className="w-full py-4 rounded-xl text-sm font-bold text-white mt-6 transition-all active:scale-95"
        style={{ background: '#ff3333' }}
      >
        ENTER THE ARENA →
      </button>
    </div>
  )

  if (stage === 'profile') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: '#0d0d0d', fontFamily: 'Space Mono, monospace' }}>
      <button onClick={() => next('signup')} className="flex items-center gap-1 text-gray-500 text-xs mb-6"><ArrowLeft size={14}/> back</button>
      <h2 className="text-white text-xl font-bold mb-1">Build your <span style={{ color: '#ff3333' }}>profile</span></h2>
      <p className="text-gray-500 text-xs mb-6">Your nemesis will see this. Make it count.</p>
      <div className="space-y-3 flex-1">
        {[['Major', 'e.g. Computer Science'], ['Year', 'Freshman · Sophomore · etc.'], ['Dorm', 'e.g. Plex, Allison, Slivka']].map(([label, ph]) => (
          <div key={label}>
            <label className="text-gray-500 text-xs uppercase tracking-widest block mb-1">{label}</label>
            <input className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors" placeholder={ph} />
          </div>
        ))}
        <div>
          <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Your vibe (pick one)</label>
          <div className="grid grid-cols-2 gap-2">
            {['Civilized chat 🦋', 'DUEL TO THE DEATH ⚔️'].map(v => {
              const isSelected = selectedVibe === v

              return (<button key={v} type="button" onClick={() => setSelectedVibe(v)}
                  className={`py-2.5 rounded-lg text-xs border transition-all active:scale-95 ${
                    isSelected
                      ? 'border-red-500 text-white'
                      : 'border-[#333] text-gray-400 hover:border-red-500 hover:text-white'
                  }`}
                  style={{
                    background: isSelected ? '#3a1111' : '#1a1a1a',
                  }}
                >
                  {v}
                </button>
              )})}
          </div>
        </div>
      </div>
      <button onClick={() => next('home')} className="w-full py-4 rounded-xl text-sm font-bold text-white mt-6 active:scale-95" style={{ background: '#ff3333' }}>
        LOCK IT IN →
      </button>
    </div>
  )

  if (stage === 'home') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: '#0d0d0d', fontFamily: 'Space Mono, monospace' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest">Your Rivalry Status</p>
          <h2 className="text-white text-xl font-bold">Unmatched ❌</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-xl">😤</div>
      </div>
      <div className="rounded-2xl p-5 mb-4" style={{ background: '#1a0000', border: '1px solid #330000' }}>
        <p className="text-red-400 text-xs uppercase tracking-widest mb-2">Nemesis Incompatibility Score</p>
        <p className="text-6xl font-bold text-white mb-1">--</p>
        <p className="text-gray-600 text-xs">Complete the questionnaire to find your nemesis</p>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {['0', '0', '0'].map((v, i) => (
          <div key={i} className="rounded-xl p-3 text-center" style={{ background: '#1a1a1a' }}>
            <p className="text-white font-bold text-lg">{v}</p>
            <p className="text-gray-600 text-xs">{['Rivals', 'Battles', 'Wins'][i]}</p>
          </div>
        ))}
      </div>
      <button onClick={() => { setQIdx(0); setAnswers({}); next('quiz') }} className="w-full py-4 rounded-xl text-sm font-bold text-white active:scale-95" style={{ background: '#ff3333' }}>
        TAKE THE QUIZ →
      </button>
    </div>
  )

  if (stage === 'quiz') {
    const q = QUESTIONS[qIdx]
    return (
      <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: '#0d0d0d', fontFamily: 'Space Mono, monospace' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => { if (qIdx > 0) setQIdx(qIdx-1); else next('home') }} className="text-gray-500"><ArrowLeft size={18}/></button>
          <div className="flex gap-1.5">
            {QUESTIONS.map((_, i) => (
              <div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: i === qIdx ? '20px' : '8px', background: i < qIdx ? '#ff3333' : i === qIdx ? '#ff6666' : '#333' }} />
            ))}
          </div>
          <span className="text-gray-600 text-xs">{qIdx+1}/{QUESTIONS.length}</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Question {qIdx+1}</p>
          <h3 className="text-white text-xl font-bold mb-8 leading-tight">{q.q}</h3>
          <div className="space-y-3">
            {q.opts.map((o, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(o)}
                className="w-full text-left px-5 py-4 rounded-xl text-sm text-gray-300 border border-[#333] hover:border-red-500 hover:text-white transition-all active:scale-95"
                style={{ background: '#1a1a1a' }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'loading') return (
    <div className="min-h-full flex flex-col items-center justify-center px-6" style={{ background: '#0d0d0d', fontFamily: 'Space Mono, monospace' }}>
      <div className="w-20 h-20 rounded-full border-4 border-red-500/20 flex items-center justify-center mb-6 animate-spin-slow" style={{ borderTopColor: '#ff3333' }}>
        <Skull size={32} color="#ff3333" />
      </div>
      <p className="text-white text-sm font-bold mb-2">Analyzing your soul...</p>
      <p className="text-gray-600 text-xs mb-6">Finding your perfect opp</p>
      <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${loadPct}%`, background: '#ff3333' }} />
      </div>
      <p className="text-red-500 text-xs mt-2">{loadPct}% complete</p>
    </div>
  )

  if (stage === 'reveal') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: '#0d0d0d', fontFamily: 'Space Mono, monospace' }}>
      <div className="text-center mb-5">
        <p className="text-red-500 text-xs uppercase tracking-widest font-bold mb-1 animate-fade-in">⚔️ Nemesis Revealed</p>
        <h2 className="text-white text-2xl font-bold animate-fade-in delay-100">Your worst match</h2>
      </div>
      <div className="rounded-2xl p-5 mb-4 animate-fade-in delay-200" style={{ background: '#1a0000', border: '2px solid #ff3333', boxShadow: '0 0 30px rgba(255,51,51,0.2)' }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: '#2a0000' }}>{NEMESIS.avatar}</div>
          <div>
            <p className="text-white font-bold text-base">{NEMESIS.name}</p>
            <p className="text-gray-500 text-xs">{NEMESIS.year}</p>
            <p className="text-gray-500 text-xs">{NEMESIS.dorm}</p>
          </div>
          <div className="ml-auto text-center">
            <p className="text-red-500 text-3xl font-bold">{NEMESIS.score}</p>
            <p className="text-gray-600 text-xs">compatibility</p>
          </div>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed mb-4">{NEMESIS.bio}</p>
        <div className="flex flex-wrap gap-2">
          {NEMESIS.badges.map(b => (
            <span key={b} className="text-xs px-2 py-1 rounded-full" style={{ background: '#2a0000', border: '1px solid #440000', color: '#ff6666' }}>{b}</span>
          ))}
        </div>
      </div>
      
      <div className="grid-cols-2 gap-2">
        <button className="py-3 rounded-xl text-xs font-bold text-white active:scale-95" style={{ background: '#ff3333' }}>  Challenge Nemesis  </button>
      </div>
    </div>
  )
}