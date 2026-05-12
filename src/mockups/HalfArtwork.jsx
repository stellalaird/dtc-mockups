import React, { useState } from 'react'
import { ArrowLeft, Upload, Users, Check, Sparkles } from 'lucide-react'

const ARTWORKS = [
  { id: 1, title: 'Urban Dreamscape', parts: 3, size: 4, progress: 2, emoji: '🌆' },
  { id: 2, title: 'Abstract Feelings', parts: 1, size: 2, progress: 1, emoji: '🎭' },
  { id: 3, title: 'Nature Fragments', parts: 0, size: 4, progress: 3, emoji: '🌿' },
]

const COLLABS = [
  { name: 'Zara Larsson', avatar: '👩🏾‍🎨', section: 'Top-left', done: true },
  { name: 'You', avatar: '🧑‍🎨', section: 'Top-right', done: false },
  { name: 'Drake', avatar: '👨🏼‍🎨', section: 'Bottom-left', done: true },
  { name: 'Bob Ross', avatar: '👩🏻‍🎨', section: 'Bottom-right', done: true },
]

export default function HalfArtwork() {
  const [stage, setStage] = useState('signup')
  const [role, setRole] = useState(null)
  const [groupSize, setGroupSize] = useState(null)
  const [selectedArt, setSelectedArt] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const BG = '#0f0a1e'
  const GRAD = 'linear-gradient(135deg, #1a0f3e 0%, #0f1a2e 50%, #1e0a1a 100%)'

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Josefin Sans, sans-serif' }}>
      <div className="text-center mb-8">
        <div className="text-5xl mb-4 animate-float">🎨</div>
        <h2 className="text-3xl font-bold text-white mb-2" style={{ letterSpacing: '0.05em' }}>HALF</h2>
        <div className="w-16 h-0.5 mx-auto mb-3" style={{ background: 'linear-gradient(90deg, #ff6bff, #6baaff)' }} />
        <p style={{ color: '#a87fff', fontSize: '13px' }}>Collaborative art chains</p>
      </div>
      <div className="space-y-3 flex-1">
        {[['Email', 'you@u.northwestern.edu'], ['Name', 'Your artist name']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#6b5a9e' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-xl text-sm outline-none border" placeholder={p}
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(168,127,255,0.3)', color: 'white' }} />
          </div>
        ))}
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,107,255,0.08)', border: '1px solid rgba(255,107,255,0.2)' }}>
          <p style={{ color: '#ff9eff', fontSize: '12px' }}>✨ Create one section of an artwork. See the full piece once everyone's done.</p>
        </div>
      </div>
      <button onClick={() => setStage('role')} className="w-full py-4 rounded-xl text-sm font-bold text-white mt-6 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
        Start Creating →
      </button>
    </div>
  )

  if (stage === 'role') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Josefin Sans, sans-serif' }}>
      <button onClick={() => setStage('signup')} className="flex items-center gap-1 text-sm mb-8" style={{ color: '#6b5a9e' }}><ArrowLeft size={14}/></button>
      <h2 className="text-2xl font-bold text-white mb-2">What do you want to do?</h2>
      <p className="text-sm mb-8" style={{ color: '#6b5a9e' }}>Every artwork needs a starter and finishers.</p>
      <div className="space-y-4 flex-1">
        {[
          { r: 'start', emoji: '🖼️', title: 'Start an Artwork', desc: 'Define the theme, draw the first section, invite others' },
          { r: 'finish', emoji: '✏️', title: 'Finish an Artwork', desc: 'Join an existing chain and add your piece to complete it' },
        ].map(({ r, emoji, title, desc }) => (
          <button key={r} onClick={() => { setRole(r); setStage(r === 'start' ? 'groupsize' : 'browse') }}
            className="w-full text-left p-6 rounded-2xl border transition-all active:scale-95"
            style={{ background: role === r ? 'rgba(168,127,255,0.15)' : 'rgba(255,255,255,0.04)', borderColor: role === r ? '#a87fff' : 'rgba(255,255,255,0.1)' }}>
            <span className="text-4xl block mb-3">{emoji}</span>
            <p className="font-bold text-white text-base mb-1">{title}</p>
            <p className="text-xs" style={{ color: '#6b5a9e' }}>{desc}</p>
          </button>
        ))}
      </div>
    </div>
  )

  if (stage === 'groupsize') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Josefin Sans, sans-serif' }}>
      <button onClick={() => setStage('role')} className="flex items-center gap-1 text-sm mb-8" style={{ color: '#6b5a9e' }}><ArrowLeft size={14}/></button>
      <h2 className="text-2xl font-bold text-white mb-2">Group Size</h2>
      <p className="text-sm mb-8" style={{ color: '#6b5a9e' }}>How many artists will contribute?</p>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[2, 3, 4].map(n => (
          <button key={n} onClick={() => setGroupSize(n)}
            className="aspect-square rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95"
            style={{ background: groupSize === n ? 'rgba(168,127,255,0.2)' : 'rgba(255,255,255,0.04)', border: `2px solid ${groupSize === n ? '#a87fff' : 'rgba(255,255,255,0.1)'}` }}>
            <span className="text-3xl">{['', '', '👥', '👥👤', '👥👥'][n]}</span>
            <span className="text-white font-bold mt-2">{n} Artists</span>
            <span className="text-xs mt-1" style={{ color: '#6b5a9e' }}>{n} sections</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-center mb-6" style={{ color: '#6b5a9e' }}>Each person draws one section. Nobody sees the whole until the end.</p>
      {groupSize && (
        <button onClick={() => setStage('upload')} className="w-full py-4 rounded-xl text-sm font-bold text-white active:scale-95 animate-fade-in"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
          Continue with {groupSize} Artists →
        </button>
      )}
    </div>
  )

  if (stage === 'browse') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'Josefin Sans, sans-serif' }}>
      <h2 className="text-xl font-bold text-white mb-1">Open Artworks</h2>
      <p className="text-xs mb-5" style={{ color: '#6b5a9e' }}>Waiting for your section</p>
      <div className="space-y-3">
        {ARTWORKS.map(a => (
          <button key={a.id} onClick={() => { setSelectedArt(a); setStage('upload') }}
            className="w-full text-left rounded-2xl p-4 border transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: 'rgba(168,127,255,0.15)' }}>{a.emoji}</div>
              <div>
                <p className="text-white font-bold">{a.title}</p>
                <p className="text-xs" style={{ color: '#6b5a9e' }}>{a.parts} of {a.size} sections complete</p>
              </div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: a.size }).map((_, i) => (
                <div key={i} className="h-2 flex-1 rounded-full" style={{ background: i < a.parts ? 'linear-gradient(90deg,#ff6bff,#6baaff)' : 'rgba(255,255,255,0.1)' }} />
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: i => i < a.parts ? '#a87fff' : '#fffdfd' }}>
              {a.size - a.parts} section{a.size - a.parts !== 1 ? 's' : ''} remaining — be the next contributor
            </p>
          </button>
        ))}
      </div>
    </div>
  )

  if (stage === 'upload') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Josefin Sans, sans-serif' }}>
      <button onClick={() => setStage(role === 'start' ? 'groupsize' : 'browse')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#6b5a9e' }}><ArrowLeft size={14}/></button>
      <h2 className="text-xl font-bold text-white mb-1">Add Your Section</h2>
      <p className="text-xs mb-5" style={{ color: '#6b5a9e' }}>Draw your part. Others won't see it until the artwork is complete.</p>

      {/* Mock canvas area */}
      <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ height: '200px', background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(168,127,255,0.4)' }}>
        {!uploaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Upload size={32} color="#6b5a9e" className="mb-3" />
            <p className="text-sm font-bold" style={{ color: '#a87fff' }}>Upload Your Drawing</p>
            <p className="text-xs mt-1" style={{ color: '#6b5a9e' }}>PNG, JPG, or sketch photo</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(255,107,255,0.3), rgba(107,170,255,0.3))' }}>
            <div className="text-center">
              <span className="text-5xl">🖼️</span>
              <p className="text-white text-sm font-bold mt-2">Section uploaded!</p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#6b5a9e' }}>Collaborators</p>
        <div className="space-y-2">
          {COLLABS.slice(0, groupSize || 4).map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="text-xl">{c.avatar}</span>
              <div className="flex-1">
                <p className="text-white text-xs font-bold">{c.name}</p>
                <p className="text-xs" style={{ color: '#6b5a9e' }}>{c.section}</p>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${(c.done || (c.name === 'You' && uploaded)) ? 'bg-green-500' : 'border border-gray-600'}`}>
                {(c.done || (c.name === 'You' && uploaded)) && <Check size={12} color="white" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!uploaded ? (
        <button onClick={() => setUploaded(true)} className="w-full py-4 rounded-xl text-sm font-bold text-white active:scale-95" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
          <Upload size={16} className="inline mr-2" />Upload My Section
        </button>
      ) : (
        <button onClick={() => setStage('reveal')} className="w-full py-4 rounded-xl text-sm font-bold text-white active:scale-95 animate-fade-in" style={{ background: 'linear-gradient(135deg, #059669, #0891b2)' }}>
          <Sparkles size={16} className="inline mr-2" />Reveal the Full Artwork!
        </button>
      )}
    </div>
  )

  if (stage === 'reveal') return (
    <div className="min-h-full flex flex-col items-center px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Josefin Sans, sans-serif' }}>
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-widest mb-2 animate-fade-in" style={{ color: '#a87fff' }}>✨ Complete</p>
        <h2 className="text-2xl font-bold text-white animate-fade-in delay-100">The Full Artwork</h2>
        <p className="text-xs mt-1 animate-fade-in delay-200" style={{ color: '#6b5a9e' }}>Created by 4 artists who never saw each other's work</p>
      </div>
      <div className="w-full rounded-3xl overflow-hidden mb-5 animate-fade-in delay-200" style={{ border: '2px solid rgba(168,127,255,0.4)', boxShadow: '0 0 50px rgba(168,127,255,0.3)' }}>
        <div className="grid grid-cols-2" style={{ height: '240px' }}>
          {[
            { bg: 'linear-gradient(135deg, #ff6bff55, #7c3aed)', emoji: '🌆', label: 'Zara Larsson' },
            { bg: 'linear-gradient(135deg, #6baaff55, #0891b2)', emoji: '🌊', label: 'You' },
            { bg: 'linear-gradient(135deg, #ffb36b55, #d97706)', emoji: '🌿', label: 'Drake' },
            { bg: 'linear-gradient(135deg, #ff6b9d55, #db2777)', emoji: '⭐', label: 'Bob Ross' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-center relative" style={{ background: s.bg }}>
              <span className="text-5xl">{s.emoji}</span>
              <span className="absolute bottom-1 left-2 text-xs text-white/60">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full rounded-2xl p-4 mb-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,127,255,0.2)' }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#6b5a9e' }}>Your Collaborators</p>
        <div className="flex justify-around">
          {COLLABS.map((c, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{c.avatar}</div>
              <p className="text-white text-xs font-bold">{c.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 w-full">
        <button className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>Share Artwork</button>
        <button onClick={() => setStage('role')} className="flex-1 py-3 rounded-xl text-sm font-bold border" style={{ borderColor: 'rgba(168,127,255,0.3)', color: '#a87fff' }}>New Chain</button>
      </div>
    </div>
  )
}