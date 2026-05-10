import React, { useState, useEffect } from 'react'
import { Play, Square, Bell, Calendar, Flame, Target } from 'lucide-react'

const NOTIFS = [
  { icon: '🌡️', msg: "You've only socialized 20 mins today. Time to move!", time: '2h ago' },
  { icon: '☕', msg: "Go invite someone to Fran's — it's a good day for it.", time: '4h ago' },
  { icon: '🔥', msg: "3-day streak! Keep it going.", time: 'Yesterday' },
  { icon: '🏊', msg: "Your friend Emma is free at Plex. Send a nudge?", time: 'Yesterday' },
]

export default function SocializationThermometer() {
  const [stage, setStage] = useState('onboarding')
  const [target, setTarget] = useState(2)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState('today')

  useEffect(() => {
    let iv
    if (running) iv = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(iv)
  }, [running])

  const todayMinutes = Math.floor(seconds / 60)
  const pct = Math.min(100, Math.round((todayMinutes / (target * 60)) * 100))
  const fillHeight = pct

  const fmt = (s) => {
    const m = Math.floor(s / 60), sec = s % 60
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  }

  const BG = '#f0f4f8'
  const ACCENT = '#3d8b37'
  const WARM_RED = '#e55'

  if (stage === 'onboarding') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: 'linear-gradient(160deg, #e8f5e9, #f0f4f8)', fontFamily: 'Nunito, sans-serif' }}>
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-float">🌡️</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1b5e20', fontFamily: 'Nunito, sans-serif' }}>Social Wellness</h2>
        <p className="text-sm" style={{ color: '#4caf50' }}>Track your daily social time like a fitness goal.</p>
      </div>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#888' }}>Daily Social Goal</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: '#2e7d32' }}>30 min</span>
          <span className="text-2xl font-bold" style={{ color: '#1b5e20' }}>{target}h / day</span>
          <span className="text-sm" style={{ color: '#2e7d32' }}>4 hrs</span>
        </div>
        <input type="range" min="0.5" max="4" step="0.5" value={target} onChange={e => setTarget(Number(e.target.value))}
          className="w-full accent-green-600" />
        <div className="mt-3 rounded-xl p-3" style={{ background: 'rgba(76,175,80,0.12)', border: '1px solid rgba(76,175,80,0.3)' }}>
          <p className="text-xs" style={{ color: '#2e7d32' }}>
            🧠 Research shows {target}h of social interaction per day is associated with higher wellbeing and academic performance.
          </p>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#888' }}>Enable Reminders</p>
        <div className="space-y-2">
          {['Morning check-in (9am)', 'Midday nudge (1pm)', 'Evening wrap-up (8pm)'].map(r => (
            <div key={r} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'white' }}>
              <span className="text-sm" style={{ color: '#2e7d32' }}>{r}</span>
              <div className="w-10 h-6 rounded-full flex items-center justify-end px-0.5" style={{ background: '#4caf50' }}>
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setStage('tracker')} className="w-full py-4 rounded-2xl text-sm font-bold text-white active:scale-95" style={{ background: '#2e7d32' }}>
        Start Tracking 🌿
      </button>
    </div>
  )

  return (
    <div className="min-h-full" style={{ background: BG, fontFamily: 'Nunito, sans-serif' }}>
      {/* Tab bar */}
      <div className="flex border-b" style={{ borderColor: '#dde' }}>
        {['today', 'history', 'reminders'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-xs font-bold capitalize transition-all"
            style={{ color: tab === t ? ACCENT : '#999', borderBottom: tab === t ? `2px solid ${ACCENT}` : '2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'today' && (
        <div className="px-5 py-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[['Today', `${todayMinutes}m`, '🕐'], ['Streak', '7 days', '🔥'], ['Weekly', '9.2h', '📊']].map(([l, v, e]) => (
              <div key={l} className="rounded-xl p-3 text-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <p className="text-lg">{e}</p>
                <p className="font-bold text-sm" style={{ color: '#1b5e20' }}>{v}</p>
                <p className="text-xs" style={{ color: '#999' }}>{l}</p>
              </div>
            ))}
          </div>

          {/* Thermometer */}
          <div className="flex items-end justify-center gap-6 mb-6">
            <div className="relative flex flex-col items-center">
              {/* Bulb + tube */}
              <div className="relative" style={{ width: '48px', height: '220px' }}>
                {/* Tube background */}
                <div className="absolute left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
                  style={{ width: '28px', height: '180px', top: 0, background: '#e8f5e9', border: '3px solid #a5d6a7' }}>
                  {/* Fill */}
                  <div className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000"
                    style={{ height: `${fillHeight}%`, background: fillHeight > 80 ? '#f44336' : fillHeight > 50 ? '#ff9800' : '#4caf50' }} />
                </div>
                {/* Bulb */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: fillHeight > 80 ? '#f44336' : fillHeight > 50 ? '#ff9800' : '#4caf50', border: '3px solid #a5d6a7' }}>
                  <span className="text-white text-xs font-bold">{pct}%</span>
                </div>
              </div>
              {/* Scale markers */}
              <div className="absolute right-0 top-0 h-44 flex flex-col justify-between text-xs" style={{ color: '#999' }}>
                {['4h', '3h', '2h', '1h', '0'].map(l => <span key={l}>{l}</span>)}
              </div>
            </div>

            {/* Right side */}
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#999' }}>Today's Goal</p>
                <p className="text-2xl font-bold" style={{ color: '#1b5e20' }}>{target}h</p>
                <p className="text-xs" style={{ color: '#999' }}>≈ {target * 60} minutes</p>
              </div>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#999' }}>Session Timer</p>
                <p className="text-3xl font-bold" style={{ color: '#1b5e20', fontFamily: 'Space Mono, monospace' }}>{fmt(seconds)}</p>
              </div>
              <button
                onClick={() => setRunning(r => !r)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white active:scale-95 transition-all"
                style={{ background: running ? '#e55' : '#2e7d32' }}>
                {running ? <><Square size={14}/> Stop</> : <><Play size={14}/> Start</>}
              </button>
            </div>
          </div>

          {/* Activity suggestions */}
          <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#999' }}>Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {["☕ Fran's coffee", '🏊 SPAC swim', '🌲 Lakefill walk', '🍕 Elder dinner', '📚 Library study group'].map(a => (
                <span key={a} className="text-xs px-3 py-1.5 rounded-full" style={{ background: '#e8f5e9', color: '#2e7d32' }}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="px-5 py-5">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#999' }}>Past 7 Days</p>
          <div className="space-y-3 mb-5">
            {[['Mon', 2.5, 2], ['Tue', 1.8, 2], ['Wed', 3.1, 2], ['Thu', 0.5, 2], ['Fri', 2.2, 2], ['Sat', 4.0, 2], ['Sun', 1.1, 2]].map(([d, hrs, tgt]) => (
              <div key={d} className="flex items-center gap-3">
                <span className="text-xs w-8" style={{ color: '#999' }}>{d}</span>
                <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: '#e8f5e9' }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, (hrs / tgt) * 100)}%`, background: hrs >= tgt ? '#4caf50' : hrs >= tgt * 0.5 ? '#ff9800' : '#f44336' }} />
                </div>
                <span className="text-xs w-8 text-right font-bold" style={{ color: '#1b5e20' }}>{hrs}h</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-4" style={{ background: 'white' }}>
            <Flame size={20} color="#ff9800" className="mb-2" />
            <p className="font-bold" style={{ color: '#1b5e20' }}>7-day streak! 🎉</p>
            <p className="text-xs" style={{ color: '#999' }}>You've hit your goal 5 of 7 days this week.</p>
          </div>
        </div>
      )}

      {tab === 'reminders' && (
        <div className="px-5 py-5">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#999' }}>Recent Notifications</p>
          <div className="space-y-3">
            {NOTIFS.map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <span className="text-2xl">{n.icon}</span>
                <div className="flex-1">
                  <p className="text-sm" style={{ color: '#2e7d32' }}>{n.msg}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#bbb' }}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}