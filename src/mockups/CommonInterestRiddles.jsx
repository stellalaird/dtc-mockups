import React, { useState } from 'react'
import { ArrowLeft, Lock, Unlock, MapPin, Eye, ChevronRight } from 'lucide-react'

const RIDDLES = [
  {
    id: 1,
    distance: '0.2mi',
    clues: [
      'I am a place supposedly for books',
      'I am open 24/7',
      'I am the primary socialization spot for NU engineers',
      'My name is a misspellage of a common brown sludge (type Mudd library)',
    ],
    answer: 'Mudd library',
    name: 'Rezas Kid',
    major: 'Film Studies · Senior',
    interests: ['Movies', 'Dogs', 'Debate Club'],
    avatar: '🧑🏻‍🎓',
    unlocked: false,
  },
  {
    id: 2,
    distance: '0.4mi',
    clues: [
      'I am a japanese restaurant in Evanston',
      'I serve rolls in boats',
      'I offer hibachi too',
      'I sit across from Joy Yee Noodle (type Todoroki)',
    ],
    answer: 'Todoroki',
    name: 'Willie the Wildcat',
    major: 'Sociology · Junior',
    interests: ['Rock Climbing', 'Travel', 'Lo-fi Music'],
    avatar: '👩🏽‍🎓',
    unlocked: false,
  },
  {
    id: 3,
    distance: '0.1mi',
    clues: [
      'I serve the perfect meal for a summer day',
      'My bowls can be eaten raw or mixed',
      'My lines are long',
      'I\'m somewhere in Norris (type Shake Smart)',
    ],
    answer: 'Shake Smart',
    name: 'Jonas Jin',
    major: 'Linguistics · Freshman',
    interests: ['Languages', 'Norris', 'Sunrises'],
    avatar: '👩🏻‍💼',
    unlocked: false,
  },
]

export default function CommonInterestRiddles() {
  const [stage, setStage] = useState('signup')
  const [mode, setMode] = useState(null)
  const [selected, setSelected] = useState(null)
  const [solvedClues, setSolvedClues] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [guess, setGuess] = useState('')
  const [guessWrong, setGuessWrong] = useState(false)
  const [createdClues, setCreatedClues] = useState(['', '', '', ''])

  const BG = '#f5f0eb'
  const DARK = '#1a1a2e'
  const ACCENT = '#e8a020'

  const handleGuess = () => {
    if (guess.toLowerCase().includes(selected.answer.split(' ')[0].toLowerCase())) {
      setUnlocked(true)
    } else {
      setGuessWrong(true)
      setTimeout(() => setGuessWrong(false), 800)
    }
  }

  const handleClueReveal = () => {
    if (solvedClues < selected.clues.length) {
      setSolvedClues(s => s + 1)
    }
  }

  if (stage === 'signup') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <div className="text-center mb-8">
        <div className="h-6" />
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: DARK }}>Riddle NU</h2>
        <p className="text-sm" style={{ color: '#888' }}>Solve clues only Northwestern students would know. Unlock profiles. Make friends.</p>
      </div>
      <div className="space-y-3 flex-1">
        {[['NU Email', 'you@u.northwestern.edu'], ['Name', 'Your name']].map(([l, p]) => (
          <div key={l}>
            <label className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: '#aaa' }}>{l}</label>
            <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none" placeholder={p}
              style={{ background: 'white', borderColor: '#e0d8d0', color: DARK }} />
          </div>
        ))}
      </div>
      <button onClick={() => setStage('mode')} className="w-full py-4 rounded-xl text-sm font-bold text-white mt-6 active:scale-95" style={{ background: DARK }}>
        Enter →
      </button>
    </div>
  )

  if (stage === 'mode') return (
    <div className="min-h-full flex flex-col px-6 pt-4 pb-8" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <button onClick={() => setStage('signup')} className="flex items-center gap-1 text-sm mb-8" style={{ color: '#999' }}><ArrowLeft size={14}/></button>
      <h2 className="text-2xl font-bold mb-2" style={{ color: DARK }}>How do you want to play?</h2>
      <p className="text-sm mb-8" style={{ color: '#888' }}>You can always do both.</p>
      <div className="space-y-4 flex-1">
        {[
          { m: 'solve', emoji: '🔓', title: 'Solve Riddles', desc: 'Decode clues from nearby students and unlock their profiles' },
          { m: 'create', emoji: '✍️', title: 'Create a Riddle', desc: 'Write clues about something only NU students would know. Let others unlock your profile' },
        ].map(({ m, emoji, title, desc }) => (
          <button key={m} onClick={() => { setMode(m); setStage(m === 'solve' ? 'map' : 'create') }}
            className="w-full text-left p-5 rounded-2xl border-2 active:scale-95 transition-all"
            style={{ background: 'white', borderColor: mode === m ? DARK : '#e0d8d0' }}>
            <span className="text-3xl block mb-2">{emoji}</span>
            <p className="font-bold text-base mb-1" style={{ color: DARK }}>{title}</p>
            <p className="text-xs" style={{ color: '#888' }}>{desc}</p>
          </button>
        ))}
      </div>
      <div className="h-4" />
      <p className="text-sm mb-8" style={{ color: '#888' }}>A place in evanston... A campus crush... A secret club... Yourself...</p>
    </div>
  )

  if (stage === 'map') return (
    <div className="min-h-full px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <button onClick={() => setStage('mode')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#999' }}><ArrowLeft size={14}/></button>
      <h2 className="text-xl font-bold mb-1" style={{ color: DARK }}>Nearby Riddles</h2>
      <p className="text-xs mb-4" style={{ color: '#888' }}>3 students near you are waiting to have their riddles solved</p>
      {/* Fake map */}
      <div className="rounded-2xl overflow-hidden mb-5 relative" style={{ height: '160px', background: 'linear-gradient(135deg, #e8e0d8, #d5cdc5)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 40px)' }} />
        {/* Map pins */}
        {[{ x: '40%', y: '35%', d: '0.2mi' }, { x: '65%', y: '55%', d: '0.4mi' }, { x: '30%', y: '65%', d: '0.1mi' }].map((pin, i) => (
          <div key={i} className="absolute flex flex-col items-center" style={{ left: pin.x, top: pin.y, transform: 'translate(-50%,-100%)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-base animate-bounce-in" style={{ background: ACCENT, animationDelay: `${i*0.1}s` }}>?</div>
            <div className="text-xs font-bold mt-1" style={{ color: DARK, background: 'white', padding: '1px 4px', borderRadius: '4px' }}>{pin.d}</div>
          </div>
        ))}
        {/* You marker */}
        <div className="absolute" style={{ left: '52%', top: '48%', transform: 'translate(-50%,-50%)' }}>
          <div className="w-4 h-4 rounded-full border-2 border-white animate-pulse" style={{ background: '#4CAF50' }} />
        </div>
        <div className="absolute bottom-2 left-3 text-xs" style={{ color: '#888' }}>📍 You are here</div>
      </div>
      <div className="space-y-3">
        {RIDDLES.map((r, i) => (
          <button key={r.id} onClick={() => { setSelected(r); setSolvedClues(0); setUnlocked(false); setGuess(''); setStage('riddle') }}
            className="w-full text-left p-4 rounded-2xl border-2 active:scale-95 transition-all"
            style={{ background: 'white', borderColor: '#e0d8d0' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: '#1a1a2e10' }}>❓</div>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: DARK }}>Mystery Student #{i+1}</p>
                <p className="text-xs" style={{ color: '#888' }}>📍 {r.distance} away · {r.clues.length} clues</p>
              </div>
              <Lock size={16} color="#ccc" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  if (stage === 'riddle' && selected) return (
    <div className="min-h-full flex flex-col px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <button onClick={() => setStage('map')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#999' }}><ArrowLeft size={14}/> Map</button>
      {!unlocked ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: DARK }}>Decode the Riddle</h2>
            <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: '#1a1a2e15', color: DARK }}>📍 {selected.distance}</span>
          </div>
          <p className="text-xs mb-4" style={{ color: '#888' }}>Reveal clues one at a time. Guess to unlock their profile.</p>
          <div className="space-y-2 mb-5">
            {selected.clues.map((clue, i) => (
              <div key={i} className="rounded-xl p-3 border transition-all" style={{ background: i < solvedClues ? 'white' : '#e8e0d855', borderColor: i < solvedClues ? ACCENT : '#e0d8d0' }}>
                {i < solvedClues ? (
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500">💡</span>
                    <p className="text-sm font-medium" style={{ color: DARK }}>{clue}</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-xs" style={{ color: '#bbb' }}>Clue {i+1} — hidden</p>
                    <Lock size={14} color="#ccc" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {solvedClues < selected.clues.length && (
            <button onClick={handleClueReveal} className="w-full py-3 rounded-xl text-sm font-bold mb-4 active:scale-95" style={{ background: '#1a1a2e10', color: DARK }}>
              Reveal Next Clue 🔓
            </button>
          )}
          {solvedClues > 0 && (
            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: '#888' }}>Your Guess</label>
              <div className="flex gap-2">
                <input className={`flex-1 px-4 py-3 rounded-xl text-sm border outline-none transition-all ${guessWrong ? 'border-red-400 bg-red-50' : ''}`}
                  style={{ borderColor: guessWrong ? undefined : '#e0d8d0', color: DARK }}
                  placeholder="What do you think this is?" value={guess} onChange={e => setGuess(e.target.value)} />
                <button onClick={handleGuess} className="px-4 py-3 rounded-xl text-sm font-bold text-white active:scale-95" style={{ background: DARK }}>
                  <Eye size={16} />
                </button>
              </div>
              {guessWrong && <p className="text-red-400 text-xs mt-1">Not quite — try another clue!</p>}
            </div>
          )}
        </>
      ) : (
        <div className="animate-fade-in">
          <div className="text-center mb-5">
            <div className="text-5xl mb-2 animate-bounce-in">{selected.avatar}</div>
            <h3 className="text-2xl font-bold" style={{ color: DARK }}>{selected.name}</h3>
            <p className="text-sm" style={{ color: '#888' }}>{selected.major}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Unlock size={14} color={ACCENT} />
              <span className="text-xs font-bold" style={{ color: ACCENT }}>Profile Unlocked!</span>
            </div>
          </div>
          <div className="rounded-2xl p-4 mb-4" style={{ background: 'white', border: `2px solid ${ACCENT}30` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#888' }}>Shared Interests</p>
            <div className="flex flex-wrap gap-2">
              {selected.interests.map(t => (
                <span key={t} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${ACCENT}20`, color: DARK }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl text-sm font-bold text-white active:scale-95" style={{ background: DARK }}>Send Message</button>
            <button onClick={() => setStage('map')} className="flex-1 py-3 rounded-xl text-sm font-bold border active:scale-95" style={{ borderColor: '#e0d8d0', color: DARK }}>More Riddles</button>
          </div>
        </div>
      )}
    </div>
  )

  if (stage === 'create') return (
    <div className="min-h-full flex flex-col px-5 pt-4 pb-8" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <button onClick={() => setStage('mode')} className="flex items-center gap-1 text-sm mb-5" style={{ color: '#999' }}><ArrowLeft size={14}/></button>
      <h2 className="text-xl font-bold mb-1" style={{ color: DARK }}>Write Your Riddle</h2>
      <p className="text-xs mb-5" style={{ color: '#888' }}>Give 4 clues about something only NU students would know. Start vague, get specific.</p>
      <div className="space-y-3 flex-1">
        {createdClues.map((c, i) => (
          <div key={i}>
            <label className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: '#aaa' }}>Clue {i+1} {i === 0 ? '(vaguest)' : i === 3 ? '(most specific)' : ''}</label>
            <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none" value={c}
              onChange={e => { const nc = [...createdClues]; nc[i] = e.target.value; setCreatedClues(nc) }}
              placeholder={['What type of thing is this...', 'Something about that thing...', 'Something else about that thing...', 'A NU student would instantly know...'][i]}
              style={{ background: 'white', borderColor: '#e0d8d0', color: DARK }} />
          </div>
        ))}
      </div>
      <button onClick={() => setStage('published')} className="w-full py-4 rounded-xl text-sm font-bold text-white mt-6 active:scale-95" style={{ background: DARK }}>
        Publish My Riddle →
      </button>
    </div>
  )

  if (stage === 'published') return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 pb-8" style={{ background: BG, fontFamily: 'Syne, sans-serif' }}>
      <div className="text-5xl mb-4 animate-bounce-in">🎯</div>
      <h2 className="text-2xl font-bold mb-2 text-center animate-fade-in" style={{ color: DARK }}>Riddle Published!</h2>
      <p className="text-sm text-center mb-8 animate-fade-in delay-100" style={{ color: '#888' }}>Nearby students can now try to solve your riddle.</p>
      <div className="w-full rounded-2xl p-4 mb-6 animate-fade-in delay-200" style={{ background: 'white', border: '2px solid #e0d8d0' }}>
        <p className="text-xs uppercase tracking-widest mb-2 font-bold" style={{ color: '#aaa' }}>Your Riddle Status</p>
        <div className="flex justify-between items-center">
          <div className="text-center"><p className="text-2xl font-bold" style={{ color: DARK }}>0</p><p className="text-xs" style={{ color: '#888' }}>Views</p></div>
          <div className="text-center"><p className="text-2xl font-bold" style={{ color: DARK }}>0</p><p className="text-xs" style={{ color: '#888' }}>Attempts</p></div>
          <div className="text-center"><p className="text-2xl font-bold" style={{ color: DARK }}>0</p><p className="text-xs" style={{ color: '#888' }}>Unlocked</p></div>
        </div>
      </div>
      <div className="flex gap-3 w-full animate-fade-in delay-300">
        <button onClick={() => setStage('map')} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: DARK }}>Solve Others</button>
        <button onClick={() => setStage('mode')} className="flex-1 py-3 rounded-xl text-sm font-bold border" style={{ borderColor: '#e0d8d0', color: DARK }}>Edit Riddle</button>
      </div>
    </div>
  )
}