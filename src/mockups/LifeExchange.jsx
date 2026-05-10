import React, { useState } from 'react'
import { ArrowLeft, Calendar, Sliders, MessageCircle, Star } from 'lucide-react'

const MATCH = {
  name: 'Jordan Lee',
  major: 'Theater · Junior',
  dorm: 'Allison Hall',
  avatar: '🧑🏻‍🎭',
  schedule: [
    { time: '8:00 AM', act: 'Morning yoga at SPAC' },
    { time: '10:00 AM', act: 'Theater rehearsal' },
    { time: '1:00 PM', act: 'Lunch at Norris' },
    { time: '3:00 PM', act: 'Improv club at Wirtz' },
    { time: '7:00 PM', act: 'Dinner with roommates' },
    { time: '9:00 PM', act: 'Journal writing' },
  ],
  tags: ['Spontaneous', 'Artsy', 'Morning Person', 'Social'],
}

const MY_SCHEDULE = [
  { time: '10:00 AM', act: 'CS lecture at Tech' },
  { time: '12:30 PM', act: 'Lunch at Sargent' },
  { time: '2:00 PM', act: 'Problem sets at library' },
  { time: '6:00 PM', act: 'Gym at SPAC' },
  { time: '8:00 PM', act: 'Netflix + takeout' },
]

export default function LifeExchange() {
  const [stage, setStage] = useState('signup')
  const [pref, setPref] = useState(null)
  const [commitment, setCommitment] = useState(50)
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(false)

  const BG = '#0e1117'
  const ACCENT = '#f5a623'
  const BLUE = '#4f9cf9'

  const toggleDay = (d) => setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  const handleFind = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStage('matched') }, 2000)
  }

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <div className="mb-8">
        <div className="text-5xl mb-4 animate-float">🔄</div>
        <h2 className="text-2xl font-bold text-white mb-2">Life Exchange</h2>
        <p style={{ color: '#888', fontSize: '13px' }}>Live someone else's day. Share yours. Discover what you're missing.</p>
      </div>
      <div className="space-y-3 flex-1">
        {[['NU Email', 'you@u.northwestern.edu'], ['Name', 'Your name'], ['Phone (optional)', '+1 (---) --- ----']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: '#555' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:border-amber-500"
              style={{ background: '#1a1d24', borderColor: '#2a2d34', color: 'white' }} placeholder={p} />
          </div>
        ))}
      </div>
      <button onClick={() => setStage('prefs')} className="w-full py-4 rounded-xl text-sm font-bold text-black mt-6 active:scale-95" style={{ background: ACCENT }}>
        Start Exchange →
      </button>
    </div>
  )

  if (stage === 'prefs') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <button onClick={() => setStage('signup')} className="flex items-center gap-1 text-sm mb-6" style={{ color: '#555' }}><ArrowLeft size={14}/></button>
      <h2 className="text-xl font-bold text-white mb-5">Exchange Preferences</h2>
      <div className="space-y-4 flex-1">
        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#555' }}>Match me with...</p>
          <div className="space-y-2">
            {[
              { p: 'random', emoji: '🎲', title: 'Random', desc: 'Surprise me with anyone' },
              { p: 'affinity', emoji: '🧲', title: 'Personality Affinity', desc: 'Similar vibe, different routines' },
              { p: 'friends', emoji: '👥', title: 'Friends of Friends', desc: 'Someone in your extended network' },
            ].map(({ p, emoji, title, desc }) => (
              <button key={p} onClick={() => setPref(p)}
                className="w-full flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-95"
                style={{ background: pref === p ? 'rgba(245,166,35,0.1)' : '#1a1d24', borderColor: pref === p ? ACCENT : '#2a2d34' }}>
                <span className="text-2xl">{emoji}</span>
                <div className="text-left">
                  <p className="text-white text-sm font-bold">{title}</p>
                  <p className="text-xs" style={{ color: '#555' }}>{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#555' }}>Which days? (pick any)</p>
          <div className="flex gap-2 flex-wrap">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <button key={d} onClick={() => toggleDay(d)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95"
                style={{ background: days.includes(d) ? ACCENT : '#1a1d24', color: days.includes(d) ? '#000' : '#555', border: `1px solid ${days.includes(d) ? ACCENT : '#2a2d34'}` }}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>Commitment level</p>
            <span className="text-xs font-bold" style={{ color: ACCENT }}>{commitment < 33 ? 'Light' : commitment < 66 ? 'Moderate' : 'Full Day'}</span>
          </div>
          <input type="range" min="0" max="100" value={commitment} onChange={e => setCommitment(Number(e.target.value))}
            className="w-full accent-amber-500" />
          <div className="flex justify-between text-xs mt-1" style={{ color: '#444' }}>
            <span>1 activity</span><span>Half day</span><span>Full swap</span>
          </div>
        </div>
      </div>
      <button onClick={handleFind} disabled={!pref || days.length === 0}
        className="w-full py-4 rounded-xl text-sm font-bold text-black mt-4 active:scale-95 disabled:opacity-40 transition-all"
        style={{ background: ACCENT }}>
        {loading ? 'Finding your match...' : 'Find My Match →'}
      </button>
      {loading && (
        <div className="mt-3 w-full bg-[#1a1d24] rounded-full h-1.5 overflow-hidden">
          <div className="h-full rounded-full animate-gradient-shift" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${BLUE})`, width: '60%' }} />
        </div>
      )}
    </div>
  )

  if (stage === 'matched') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <div className="text-center mb-5 animate-fade-in">
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: ACCENT }}>✨ Your Life Exchange</p>
        <h2 className="text-2xl font-bold text-white">Tomorrow, you're <em style={{ color: ACCENT }}>Jordan</em>.</h2>
        <p className="text-xs mt-1" style={{ color: '#555' }}>And Jordan lives your day. Ready?</p>
      </div>

      {/* Schedule comparison */}
      <div className="rounded-2xl overflow-hidden mb-4 animate-fade-in delay-100" style={{ border: '1px solid #2a2d34' }}>
        <div className="grid grid-cols-2">
          <div className="p-3 text-center" style={{ background: 'rgba(245,166,35,0.1)', borderRight: '1px solid #2a2d34' }}>
            <p className="text-xs font-bold" style={{ color: ACCENT }}>Jordan's Day</p>
            <p className="text-xs" style={{ color: '#555' }}>You'll live this</p>
          </div>
          <div className="p-3 text-center" style={{ background: 'rgba(79,156,249,0.1)' }}>
            <p className="text-xs font-bold" style={{ color: BLUE }}>Your Day</p>
            <p className="text-xs" style={{ color: '#555' }}>Jordan will live this</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-3 space-y-2 border-r" style={{ borderColor: '#2a2d34' }}>
            {MATCH.schedule.map((s, i) => (
              <div key={i} className="text-xs">
                <p style={{ color: '#555' }}>{s.time}</p>
                <p className="text-white font-medium">{s.act}</p>
              </div>
            ))}
          </div>
          <div className="p-3 space-y-2">
            {MY_SCHEDULE.map((s, i) => (
              <div key={i} className="text-xs">
                <p style={{ color: '#555' }}>{s.time}</p>
                <p className="text-white font-medium">{s.act}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-4 mb-4 animate-fade-in delay-200" style={{ background: '#1a1d24', border: '1px solid #2a2d34' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-3xl" style={{ background: '#2a2d34' }}>{MATCH.avatar}</div>
          <div>
            <p className="text-white font-bold">{MATCH.name}</p>
            <p className="text-xs" style={{ color: '#555' }}>{MATCH.major} · {MATCH.dorm}</p>
            <div className="flex gap-1 mt-1 flex-wrap">
              {MATCH.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,166,35,0.15)', color: ACCENT }}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 animate-fade-in delay-300">
        <button className="flex-1 py-3 rounded-xl text-sm font-bold text-black active:scale-95" style={{ background: ACCENT }}>
          <MessageCircle size={14} className="inline mr-1" />Chat with Jordan
        </button>
        <button onClick={() => setStage('signup')} className="flex-1 py-3 rounded-xl text-sm font-bold border active:scale-95" style={{ borderColor: '#2a2d34', color: '#555' }}>
          Start Over
        </button>
      </div>
    </div>
  )
}