import React, { useState } from 'react'
import { Plus, Map, Star, Sparkles } from 'lucide-react'

const START_COLLECTIONS = [
  {
    id: 'states',
    name: 'States',
    emoji: '🇺🇸',
    goal: 50,
    collected: ['Illinois', 'California', 'Texas', 'New York', 'Florida'],
  },
  {
    id: 'countries',
    name: 'Countries',
    emoji: '🌍',
    goal: 195,
    collected: ['United States', 'Canada', 'India', 'South Korea', 'Brazil'],
  },
  {
    id: 'traits',
    name: 'Fun Traits',
    emoji: '✨',
    goal: 100,
    collected: ['Has a twin', 'Can juggle', 'Speaks 4 languages', 'Met a celebrity'],
  },
]


export default function TraitCollector() {
  const [stage, setStage] = useState('signup')
  const [tab, setTab] = useState('track')
  const [collections, setCollections] = useState(START_COLLECTIONS)
  const [selectedId, setSelectedId] = useState('states')
  const [newItem, setNewItem] = useState('')

  const BG = '#07080f'
  const GOLD = '#ffd700'
  const ORANGE = '#f97316'

  const selected = collections.find(c => c.id === selectedId)
  const totalCollected = collections.reduce((sum, c) => sum + c.collected.length, 0)

  const addItem = () => {
    const clean = newItem.trim()
    if (!clean) return

    setCollections(prev =>
      prev.map(c =>
        c.id === selectedId
          ? { ...c, collected: [...c.collected, clean] }
          : c
      )
    )

    setNewItem('')
  }

  if (stage === 'signup') return (
    <div
      className="min-h-full flex flex-col px-6 pt-4 pb-8"
      style={{ background: BG, fontFamily: 'Syne, sans-serif' }}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-4 animate-float">🏆</div>
        <h2
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
        >
          TRAIT COLLECTOR
        </h2>
      </div>

      <div
        className="rounded-2xl p-4 mb-5"
        style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)' }}
      >
        <p style={{ color: GOLD, fontSize: '12px', lineHeight: '1.6' }}>
          Find people with unique traits! Fill your trait collections.
        </p>
      </div>

      <div className="space-y-3 flex-1">
        {[['NU Email', 'you@u.northwestern.edu'], ['Collector Name', 'Your name']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#444' }}>
              {l}
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
              placeholder={p}
              style={{ background: '#111', borderColor: '#222', color: 'white' }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => setStage('home')}
        className="w-full py-4 rounded-xl text-sm font-bold mt-6 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${GOLD}, ${ORANGE})`,
          color: '#000',
          fontFamily: 'Bebas Neue, sans-serif',
          letterSpacing: '0.1em',
          fontSize: '16px',
        }}
      >
        START COLLECTING →
      </button>
    </div>
  )

  return (
    <div className="min-h-full" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <h2
            className="text-white text-lg font-bold"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em', fontSize: '22px' }}
          >
            TRAIT COLLECTOR
          </h2>
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: GOLD }}>{totalCollected} FOUND</p>
            <p className="text-xs" style={{ color: '#444' }}>Personal tracker</p>
          </div>
        </div>

        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#111' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(100, totalCollected * 5)}%`,
              background: `linear-gradient(90deg, ${GOLD}, ${ORANGE})`,
            }}
          />
        </div>
      </div>

      <div className="flex px-2 mb-2">
        {['track', 'collections'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-xs font-bold capitalize rounded-xl transition-all mx-1"
            style={{
              background: tab === t ? 'rgba(255,215,0,0.15)' : 'transparent',
              color: tab === t ? GOLD : '#444',
            }}
          >
            {t === 'track' ? '➕ Track' : t === 'collections' ? '🗂️ Collections' : '💡 Ideas'}
          </button>
        ))}
      </div>

      {tab === 'track' && (
        <div className="px-5 py-3">
          <div
            className="rounded-2xl p-4 mb-4"
            style={{ background: '#111', border: '1px solid #1a1a1a' }}
          >
            <p className="text-xs tracking-widest mb-3" style={{ color: '#444' }}>
              Add a trait to your collection
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {collections.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className="py-3 rounded-xl text-xs font-bold transition-all active:scale-95"
                  style={{
                    background: selectedId === c.id ? 'rgba(255,215,0,0.16)' : '#1a1a1a',
                    color: selectedId === c.id ? GOLD : '#777',
                    border: selectedId === c.id ? `1px solid ${GOLD}60` : '1px solid #222',
                  }}
                >
                  <div className="text-xl mb-1">{c.emoji}</div>
                  {c.name}
                </button>
              ))}
            </div>

            <input
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              placeholder={
                selectedId === 'states'
                  ? 'e.g. Michigan'
                  : selectedId === 'countries'
                    ? 'e.g. Japan'
                    : 'e.g. Has pet chickens'
              }
              className="w-full px-4 py-3 rounded-xl text-sm border outline-none mb-3"
              style={{ background: '#07080f', borderColor: '#222', color: 'white' }}
            />

            <button
              onClick={addItem}
              disabled={!newItem.trim()}
              className="w-full py-3 rounded-xl text-sm font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{
                background: newItem.trim()
                  ? `linear-gradient(135deg, ${GOLD}, ${ORANGE})`
                  : '#222',
                color: newItem.trim() ? '#000' : '#555',
              }}
            >
              <Plus size={16} />
              Add to {selected?.name}
            </button>
          </div>

          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Map size={18} color={GOLD} />
              <p className="text-white text-sm font-bold">
                {selected?.emoji} {selected?.name}
              </p>
            </div>
            <p className="text-xs" style={{ color: '#777' }}>
              {selected?.collected.length} / {selected?.goal} collected
            </p>
            <div className="w-full h-2 rounded-full overflow-hidden mt-3" style={{ background: '#111' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, (selected.collected.length / selected.goal) * 100)}%`,
                  background: `linear-gradient(90deg, ${GOLD}, ${ORANGE})`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {tab === 'collections' && (
        <div className="px-5 py-3">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#333' }}>
            Your Collections
          </p>

          <button
            className="w-full mb-4 py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: 'rgba(255,215,0,0.08)',
              border: '1px solid rgba(255,215,0,0.18)',
              color: GOLD,
            }}
          >
            <Plus size={16} />
            Create new collection
          </button>

          <div className="space-y-4">
            {collections.map(c => (
              <div
                key={c.id}
                className="rounded-2xl p-4"
                style={{ background: '#111', border: '1px solid #1a1a1a' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white text-sm font-bold">
                      {c.emoji} {c.name}
                    </p>
                    <p className="text-xs" style={{ color: '#444' }}>
                      {c.collected.length} / {c.goal}
                    </p>
                  </div>
                  <Star size={18} color={GOLD} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {c.collected.map(item => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: 'rgba(255,215,0,0.1)',
                        color: GOLD,
                        border: '1px solid rgba(255,215,0,0.2)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  )
}