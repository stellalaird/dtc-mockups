import React, { useState } from 'react'
import { ArrowLeft, Trophy, Map, Star, Zap } from 'lucide-react'

const TRAITS = [
  { id: 1, name: 'Polyglot', desc: 'Speaks 4+ languages', rarity: 'legendary', emoji: '🌍', glow: '#ffd700', collected: true },
  { id: 2, name: 'Midnight Runner', desc: 'Runs after midnight', rarity: 'rare', emoji: '🌙', glow: '#a855f7', collected: true },
  { id: 3, name: 'World Traveler', desc: 'Been to 3+ countries', rarity: 'epic', emoji: '✈️', glow: '#22d3ee', collected: true },
  { id: 4, name: 'Chef\'s Kiss', desc: 'Cooks from scratch daily', rarity: 'uncommon', emoji: '👨‍🍳', glow: '#f97316', collected: false },
  { id: 5, name: 'Early Bird', desc: 'Up before 5am', rarity: 'rare', emoji: '🐦', glow: '#a855f7', collected: false },
  { id: 6, name: 'Bookworm', desc: 'Reads 2+ books/month', rarity: 'common', emoji: '📚', glow: '#22c55e', collected: true },
  { id: 7, name: 'Startup Founder', desc: 'Founded a company', rarity: 'legendary', emoji: '🚀', glow: '#ffd700', collected: false },
  { id: 8, name: 'Open Mic Hero', desc: 'Performed in public', rarity: 'epic', emoji: '🎤', glow: '#22d3ee', collected: false },
]

const LEADERBOARD = [
  { name: 'Zara Williams', points: 4280, count: 34, avatar: '👩🏾‍🎨' },
  { name: 'Marcus Bell', points: 3910, count: 29, avatar: '🧑🏻' },
  { name: 'You', points: 2340, count: 18, avatar: '🧑‍🎓' },
  { name: 'Leila A.', points: 2100, count: 15, avatar: '👩🏽' },
  { name: 'Owen L.', points: 1880, count: 12, avatar: '👨🏼' },
]

const RARITY_CONFIG = {
  legendary: { label: 'Legendary', color: '#ffd700', bg: 'rgba(255,215,0,0.1)', border: '#ffd70040' },
  epic: { label: 'Epic', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: '#22d3ee40' },
  rare: { label: 'Rare', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: '#a855f740' },
  uncommon: { label: 'Uncommon', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: '#f9731640' },
  common: { label: 'Common', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: '#22c55e40' },
}

export default function TraitCollector() {
  const [stage, setStage] = useState('signup')
  const [tab, setTab] = useState('collect')
  const [scanning, setScanning] = useState(false)
  const [found, setFound] = useState(null)

  const BG = '#07080f'
  const collected = TRAITS.filter(t => t.collected)

  const handleScan = () => {
    setScanning(true)
    setFound(null)
    setTimeout(() => {
      setScanning(false)
      setFound(TRAITS[3]) // Chef's Kiss
    }, 2500)
  }

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <div className="text-center mb-8">
        <div className="text-5xl mb-4 animate-float">🏆</div>
        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>TRAIT COLLECTOR</h2>
        <p style={{ color: '#555', fontSize: '12px', letterSpacing: '0.15em' }}>HUNT · COLLECT · DISCOVER</p>
      </div>
      <div className="rounded-2xl p-4 mb-5" style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)' }}>
        <p style={{ color: '#ffd700', fontSize: '12px', lineHeight: '1.6' }}>
          Collect people with unique traits. The rarer the person, the more points you earn.
          Find legendaries to top the leaderboard. 🏆
        </p>
      </div>
      <div className="space-y-3 flex-1">
        {[['NU Email', 'you@u.northwestern.edu'], ['Hunter Name', 'Your collector alias']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#444' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none" placeholder={p}
              style={{ background: '#111', borderColor: '#222', color: 'white' }} />
          </div>
        ))}
      </div>
      <button onClick={() => setStage('home')} className="w-full py-4 rounded-xl text-sm font-bold mt-6 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #ffd700, #f97316)', color: '#000', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em', fontSize: '16px' }}>
        START HUNTING →
      </button>
    </div>
  )

  return (
    <div className="min-h-full" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-white text-lg font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em', fontSize: '22px' }}>TRAIT COLLECTOR</h2>
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: '#ffd700' }}>2,340 PTS</p>
            <p className="text-xs" style={{ color: '#444' }}>Rank #3</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#111' }}>
          <div className="h-full rounded-full" style={{ width: '62%', background: 'linear-gradient(90deg, #ffd700, #f97316)' }} />
        </div>
        <div className="flex justify-between text-xs mt-1" style={{ color: '#444' }}>
          <span>{collected.length} traits collected</span><span>Level 8 → 9</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-2 mb-2">
        {['collect', 'inventory', 'leaderboard'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-xs font-bold capitalize rounded-xl transition-all mx-1"
            style={{ background: tab === t ? 'rgba(255,215,0,0.15)' : 'transparent', color: tab === t ? '#ffd700' : '#444' }}>
            {t === 'collect' ? '🎯 Hunt' : t === 'inventory' ? '🎒 Collect' : '🏆 Board'}
          </button>
        ))}
      </div>

      {tab === 'collect' && (
        <div className="px-5 py-3">
          {/* Scan area */}
          <div className="rounded-2xl p-5 mb-4 text-center" style={{ background: '#111', border: '1px solid #1a1a1a' }}>
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#444' }}>Nearby Hunters</div>
            <div className="relative w-36 h-36 mx-auto mb-4">
              {/* Radar rings */}
              {[100, 80, 60].map((s, i) => (
                <div key={i} className="absolute rounded-full border animate-ping"
                  style={{ width: `${s}%`, height: `${s}%`, top: `${(100-s)/2}%`, left: `${(100-s)/2}%`,
                    borderColor: `rgba(255,215,0,${0.15 - i*0.04})`, animationDelay: `${i*0.3}s`, animationDuration: '2s' }} />
              ))}
              <button onClick={handleScan}
                className="absolute inset-0 rounded-full flex items-center justify-center font-bold active:scale-95 transition-all"
                style={{ background: scanning ? 'rgba(255,215,0,0.2)' : 'rgba(255,215,0,0.1)', border: '2px solid #ffd70060', color: '#ffd700', fontFamily: 'Bebas Neue', fontSize: '14px', letterSpacing: '0.1em' }}>
                {scanning ? '...' : 'SCAN'}
              </button>
              {/* Floating pins */}
              {!scanning && !found && ['🌙', '✈️', '📚'].map((e, i) => (
                <div key={i} className="absolute w-8 h-8 rounded-full flex items-center justify-center text-sm animate-float"
                  style={{ background: '#1a1a1a', top: ['10%','60%','40%'][i], left: ['60%','70%','10%'][i], animationDelay: `${i*0.5}s` }}>
                  {e}
                </div>
              ))}
            </div>
            {!found && !scanning && <p className="text-xs" style={{ color: '#555' }}>Tap SCAN to find unique traits nearby</p>}
            {scanning && <p className="text-xs animate-pulse" style={{ color: '#ffd700' }}>Scanning campus...</p>}
          </div>

          {found && (
            <div className="rounded-2xl p-4 mb-4 animate-bounce-in" style={{ background: RARITY_CONFIG[found.rarity].bg, border: `2px solid ${found.glow}60`, boxShadow: `0 0 30px ${found.glow}30` }}>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${found.glow}15`, border: `1px solid ${found.glow}40`, boxShadow: `0 0 15px ${found.glow}40` }}>{found.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-white">{found.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${found.glow}20`, color: found.glow }}>{RARITY_CONFIG[found.rarity].label}</span>
                  </div>
                  <p className="text-xs" style={{ color: '#888' }}>{found.desc}</p>
                </div>
              </div>
              <button className="w-full mt-3 py-2.5 rounded-xl text-sm font-bold active:scale-95" style={{ background: `linear-gradient(135deg, ${found.glow}, #f97316)`, color: '#000', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                + ADD TO COLLECTION
              </button>
            </div>
          )}

          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#333' }}>Most Wanted</p>
            {TRAITS.filter(t => !t.collected).slice(0,3).map(t => {
              const r = RARITY_CONFIG[t.rarity]
              return (
                <div key={t.id} className="flex items-center gap-3 mb-2 p-3 rounded-xl" style={{ background: '#111' }}>
                  <span className="text-2xl">{t.emoji}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-xs" style={{ color: '#444' }}>{t.desc}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: r.bg, color: r.color }}>{r.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'inventory' && (
        <div className="px-5 py-3">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#333' }}>Your Collection ({collected.length})</p>
          <div className="grid grid-cols-2 gap-3">
            {TRAITS.map(t => {
              const r = RARITY_CONFIG[t.rarity]
              return (
                <div key={t.id} className="rounded-2xl p-3 text-center transition-all"
                  style={{ background: t.collected ? r.bg : '#111', border: `1px solid ${t.collected ? r.border : '#1a1a1a'}`, opacity: t.collected ? 1 : 0.4 }}>
                  <div className="text-3xl mb-2" style={{ filter: t.collected ? `drop-shadow(0 0 8px ${t.glow})` : 'grayscale(1)' }}>{t.emoji}</div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <span className="text-xs" style={{ color: t.collected ? r.color : '#333' }}>{r.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'leaderboard' && (
        <div className="px-5 py-3">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#333' }}>Campus Rankings</p>
          <div className="space-y-2">
            {LEADERBOARD.map((u, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: u.name === 'You' ? 'rgba(255,215,0,0.1)' : '#111', border: u.name === 'You' ? '1px solid rgba(255,215,0,0.3)' : '1px solid transparent' }}>
                <div className="w-8 text-center">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : <span className="text-xs font-bold" style={{ color: '#444' }}>#{i+1}</span>}
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl" style={{ background: '#1a1a1a' }}>{u.avatar}</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-bold">{u.name}</p>
                  <p className="text-xs" style={{ color: '#444' }}>{u.count} traits collected</p>
                </div>
                <p className="font-bold text-sm" style={{ color: '#ffd700' }}>{u.points.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}