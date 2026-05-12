import React, { useState } from 'react'
import { ArrowLeft, Plus, Bell, Zap } from 'lucide-react'

const FRIENDS = [
  { name: 'Emma Liu', status: 'free', avatar: '👩🏻‍🦱', activity: 'At Norris', dist: '0.1mi', lastSeen: 'now' },
  { name: 'Tyler Banks', status: 'free', avatar: '🧑🏾', activity: 'Just finished class', dist: '0.3mi', lastSeen: '2m' },
  { name: 'Yuna Kim', status: 'busy', avatar: '👩🏻', activity: 'Library — studying', dist: '0.4mi', lastSeen: '15m' },
  { name: 'Marcus Bell', status: 'free', avatar: '🧑🏻', activity: 'At Fran\'s', dist: '0.2mi', lastSeen: '1m' },
  { name: 'Priya K.', status: 'busy', avatar: '👩🏽', activity: 'In meeting', dist: '0.5mi', lastSeen: '30m' },
  { name: 'Jake Torres', status: 'free', avatar: '🧑🏽', activity: 'Just woke up lol', dist: '0.6mi', lastSeen: '5m' },
]

const ACTIVITIES = ['🧋 Boba run', '🍕 Dinner', '🌊 Lakefill walk', '🏋️ Gym sesh', '☕ Coffee', '🎮 Game?', '📖 Study break', '🌙 Late night snack']

const NOTIFS = [
  { from: 'Emma Liu', msg: 'nudged you 👋', sub: 'lunch at sarge', time: '2 min ago', avatar: '👩🏻‍🦱' },
  { from: 'Marcus Bell', msg: 'nudged you 👋', sub: 'pickleball', time: '5 min ago', avatar: '🧑🏻' },
  { from: 'Tyler Banks', msg: 'nudged you 👋', sub: '"lunch at norris"', time: '12 min ago', avatar: '🧑🏾' },
]

export default function Nudger() {
  const [stage, setStage] = useState('signup')
  const [myStatus, setMyStatus] = useState('free')
  const [tab, setTab] = useState('friends')
  const [nudged, setNudged] = useState({})
  const [actSent, setActSent] = useState(null)
  const [addFriend, setAddFriend] = useState(false)
  const [activityText, setActivityText] = useState('')

  const BG = '#0f0f13'
  const GREEN = '#22c55e'
  const PURPLE = '#a855f7'

  const handleNudge = (name) => {
    setNudged(n => ({ ...n, [name]: true }))
  }

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Nudger!</h2>
        <p style={{ color: '#555', fontSize: '13px' }}>Nudge your friends when you're free to hang.</p>
      </div>
      <div className="space-y-3 flex-1">
        {[['NU Email', 'you@u.northwestern.edu'], ['Name', 'Your name'], ['Phone', '+1(___)___-____']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#444' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-2xl text-sm border outline-none" placeholder={p}
              style={{ background: '#1a1a20', borderColor: '#2a2a32', color: 'white' }} />
          </div>
        ))}
      </div>
      <button onClick={() => setStage('home')} className="w-full py-4 rounded-2xl text-sm font-bold text-black mt-6 active:scale-95" style={{ background: GREEN }}>
        Get Started →
      </button>
    </div>
  )

  return (
    <div className="min-h-full" style={{ background: BG, fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3" style={{ borderBottom: '1px solid #1a1a20' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-lg font-bold">Nudger</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setAddFriend(true)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#1a1a20' }}>
              <Plus size={16} color="#888" />
            </button>
            <button onClick={() => setTab('notifs')} className="w-8 h-8 rounded-full flex items-center justify-center relative" style={{ background: '#1a1a20' }}>
              <Bell size={16} color="#888" />
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#ef4444', fontSize: '9px', color: 'white', fontWeight: 'bold' }}>3</div>
            </button>
          </div>
        </div>

        {/* My status toggle */}
        <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: '#1a1a20' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl" style={{ background: '#2a2a32' }}>🧑‍🎓</div>
          <div className="flex-1">
            <p className="text-white text-sm font-bold">You</p>
            <p className="text-xs" style={{ color: '#555' }}>Set your status</p>
          </div>
          <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: '#2a2a32' }}>
            {['free', 'busy'].map(s => (
              <button key={s} onClick={() => setMyStatus(s)}
                className="px-4 py-2 text-xs font-bold capitalize transition-all"
                style={{ background: myStatus === s ? (s === 'free' ? GREEN : '#ef4444') : '#2a2a32', color: myStatus === s ? 'black' : '#555' }}>
                {s === 'free' ? '✅ Free' : '🔴 Busy'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex" style={{ borderBottom: '1px solid #1a1a20' }}>
        {['friends', 'activities', 'notifs'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-xs font-bold capitalize transition-all"
            style={{ color: tab === t ? GREEN : '#555', borderBottom: tab === t ? `2px solid ${GREEN}` : '2px solid transparent' }}>
            {t === 'notifs' ? '🔔 Notifs' : t === 'friends' ? '👥 Friends' : '⚡ Activities'}
          </button>
        ))}
      </div>

      {tab === 'friends' && (
        <div className="px-4 py-4">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#444' }}>
            {FRIENDS.filter(f => f.status === 'free').length} friends free now
          </p>
          <div className="space-y-2">
            {FRIENDS.map((friend, originalIndex) => ({ ...friend, originalIndex })).sort((a, b) => {
                if (a.status === 'free' && b.status === 'busy') return -1
                if (a.status === 'busy' && b.status === 'free') return 1
                return a.originalIndex - b.originalIndex
              }).map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: '#1a1a20' }}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: '#2a2a32' }}>{f.avatar}</div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-black"
                    style={{ background: f.status === 'free' ? GREEN : '#ef4444', boxShadow: f.status === 'free' ? `0 0 8px ${GREEN}` : '0 0 8px #ef4444' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold">{f.name}</p>
                  <p className="text-xs truncate" style={{ color: '#555' }}>{f.activity} · {f.dist}</p>
                </div>
                {f.status === 'free' && (
                <button onClick={() => myStatus === 'free' && handleNudge(f.name)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                    style={{ background: nudged[f.name] ? '#1a2a1a' : 'rgba(34,197,94,0.15)', color: nudged[f.name] ? GREEN : GREEN, border: `1px solid ${GREEN}30` }}>
                    {myStatus !== 'free'
                      ? '🔒 You are busy'
                      : nudged[f.name]
                        ? '✓ Sent!'
                        : '👋 Nudge'}
                  </button>
                )}
              </div>
            ))}
          </div>

          {addFriend && (
            <div className="mt-4 p-4 rounded-2xl" style={{ background: '#1a1a20', border: '1px solid #2a2a32' }}>
              <p className="text-white text-sm font-bold mb-2">Add Friend</p>
              <input className="w-full px-3 py-2 rounded-xl text-sm mb-2 outline-none" placeholder="Search by name or @instagram"
                style={{
                  background:
                    myStatus === 'free'
                      ? nudged[f.name]
                        ? '#1a2a1a'
                        : 'rgba(34,197,94,0.15)'
                      : '#222',
                  color: myStatus === 'free' ? GREEN : '#555',
                  border: `1px solid ${
                    myStatus === 'free' ? `${GREEN}30` : '#333'
                  }`,
                  opacity: myStatus === 'free' ? 1 : 0.5,
                  cursor: myStatus === 'free' ? 'pointer' : 'not-allowed',
                }} />
              <div className="flex gap-2">
                <button onClick={() => setAddFriend(false)} className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: GREEN, color: 'black' }}>Add</button>
                <button onClick={() => setAddFriend(false)} className="flex-1 py-2 rounded-xl text-xs font-bold border" style={{ borderColor: '#2a2a32', color: '#555' }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'activities' && (
        <div className="px-4 py-4">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#444' }}>Suggest something</p>
          <div className="mb-5">
            <textarea
              value={activityText}
              onChange={(e) => setActivityText(e.target.value)}
              placeholder="Grab something to eat?"
              className="w-full h-28 p-4 rounded-2xl text-sm resize-none outline-none"
              style={{
                background: '#1a1a20',
                color: 'white',
                border: '1px solid #2a2a32',
              }}
            />
            <button
              onClick={() => setActSent(activityText)}
              disabled={!activityText.trim()}
              className="w-full mt-3 py-3 rounded-2xl text-sm font-bold transition-all active:scale-95"
              style={{
                background: activityText.trim() ? PURPLE : '#2a2a32',
                color: activityText.trim() ? 'white' : '#666',
              }}
            >
              Update Nudge ⚡
            </button>
          </div>
          {actSent && (
            <div className="rounded-2xl p-4 animate-fade-in" style={{ background: 'rgba(168,85,247,0.15)', border: `1px solid ${PURPLE}40` }}>
              <p className="text-white text-sm font-bold">{actSent} added to nudge!</p>
              <p className="text-xs mt-1" style={{ color: PURPLE }}>Emma, Tyler, and Marcus were notified.</p>
            </div>
          )}
        </div>
      )}

      {tab === 'notifs' && (
        <div className="px-4 py-4 space-y-2">
          {NOTIFS.map((n, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: '#1a1a20' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: '#2a2a32' }}>{n.avatar}</div>
              <div className="flex-1">
                <p className="text-white text-sm"><strong>{n.from}</strong> {n.msg}</p>
                <p className="text-xs" style={{ color: '#555' }}>{n.sub}</p>
                <p className="text-xs mt-1" style={{ color: '#333' }}>{n.time}</p>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-xl font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: GREEN }}>
                <Zap size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}