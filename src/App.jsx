import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import FeedbackPage from './mockups/FeedbackPage.jsx'
import ArchNemesis from './mockups/ArchNemesis.jsx'
import TeacherLearner from './mockups/TeacherLearner.jsx'
import HalfArtwork from './mockups/HalfArtwork.jsx'
import CommonInterestRiddles from './mockups/CommonInterestRiddles.jsx'
import LifeExchange from './mockups/LifeExchange.jsx'
import SocializationThermometer from './mockups/SocializationThermometer.jsx'
import StudyBuddy from './mockups/StudyBuddy.jsx'
import Nudger from './mockups/Nudger.jsx'
import TraitCollector from './mockups/TraitCollector.jsx'

const APPS = [
  { id: 'feedback', label: '⭐ Feedback Page', component: FeedbackPage },
  { id: 'nemesis', label: '⚔️ Arch-Nemesis Finder', component: ArchNemesis },
  { id: 'teacher', label: '🎓 Teacher & Learner Match', component: TeacherLearner },
  { id: 'artwork', label: '🎨 Half Artwork', component: HalfArtwork },
  { id: 'riddles', label: '🔍 Common Interest Riddles', component: CommonInterestRiddles },
  { id: 'life', label: '🔄 Life Exchange', component: LifeExchange },
  { id: 'thermo', label: '🌡️ Socialization Thermometer', component: SocializationThermometer },
  { id: 'study', label: '📚 Study Buddy Finder', component: StudyBuddy },
  { id: 'nudger', label: '👋 Nudger', component: Nudger },
  { id: 'traits', label: '🏆 Trait Collector', component: TraitCollector },
]

export default function App() {
  const [activeId, setActiveId] = useState('feedback')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const active = APPS.find((app) => app.id === activeId) || APPS[0]
  const ActiveComponent = active.component

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] select-none overflow-hidden">
      <div className="mb-4 text-center">
        <p className="text-[#4E2A84] text-xs font-mono uppercase tracking-[0.3em] mb-1">
          Northwestern University
        </p>
        <h1 className="text-white text-lg font-bold tracking-wide">
          Social Concepts Prototype Gallery
        </h1>
      </div>

      <div className="relative mb-5 z-50">
        <button
          type="button"
          onClick={() => setDropdownOpen((open) => !open)}
          className="flex items-center gap-3 bg-[#1a1a1a] border border-[#333] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:border-[#4E2A84] transition-all duration-200 min-w-[280px] justify-between"
        >
          <span>{active.label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-2xl">
            {APPS.map((app) => (
              <button
                type="button"
                key={app.id}
                onClick={() => {
                  setActiveId(app.id)
                  setDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-[#2a2a2a] transition-colors duration-150 ${
                  app.id === activeId
                    ? 'text-[#b794f4] font-semibold bg-[#4E2A84]/15'
                    : 'text-gray-300'
                }`}
              >
                {app.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: '375px',
          height: '780px',
          borderRadius: '44px',
          background: '#000',
          boxShadow:
            '0 0 0 1px #333, 0 0 0 3px #1a1a1a, 0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(78,42,132,0.15)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
          style={{
            width: '120px',
            height: '34px',
            background: '#000',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-12 flex items-start justify-between px-8 pt-3 z-40 pointer-events-none">
          <span className="text-white text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 items-end">
              {[3, 5, 7, 9].map((height, index) => (
                <div
                  key={index}
                  className="bg-white w-1 rounded-sm"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <span className="text-white text-xs">●●●</span>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="white">
              <rect
                x="0"
                y="1"
                width="21"
                height="10"
                rx="3"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <rect x="22" y="3.5" width="2" height="5" rx="1" fill="white" />
              <rect x="1.5" y="2.5" width="15" height="7" rx="2" fill="white" />
            </svg>
          </div>
        </div>

        <div className="flex-1 phone-scroll" style={{ paddingTop: '48px' }}>
          <ActiveComponent key={activeId} />
        </div>

        <div className="flex justify-center pb-2 pt-1">
          <div
            className="bg-white/30 rounded-full"
            style={{ width: '130px', height: '5px' }}
          />
        </div>
      </div>

      <p className="text-[#444] text-xs mt-4 tracking-wide">
        Tap to interact · Scroll inside the phone
      </p>
    </div>
  )
}