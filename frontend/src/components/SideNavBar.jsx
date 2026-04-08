import React, { useState } from 'react';

const NAV_ITEMS = [
  { id: 'calendar', icon: 'calendar_today', label: 'Calendar' },
  { id: 'memos', icon: 'sticky_note_2', label: 'Memos' },
  { id: 'goals', icon: 'target', label: 'Goals' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

function CuratorLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#logoGrad)" />
      {/* Calendar grid lines */}
      <line x1="10" y1="14" x2="30" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Top dots */}
      <circle cx="15" cy="10" r="1.5" fill="white" opacity="0.7" />
      <circle cx="25" cy="10" r="1.5" fill="white" opacity="0.7" />
      {/* Date cells */}
      <rect x="10" y="17" width="6" height="6" rx="2" fill="white" opacity="0.3" />
      <rect x="17" y="17" width="6" height="6" rx="2" fill="white" opacity="0.3" />
      <rect x="24" y="17" width="6" height="6" rx="2" fill="white" opacity="0.9" />
      <rect x="10" y="25" width="6" height="6" rx="2" fill="white" opacity="0.9" />
      <rect x="17" y="25" width="6" height="6" rx="2" fill="white" opacity="0.3" />
      <rect x="24" y="25" width="6" height="6" rx="2" fill="white" opacity="0.3" />
      {/* Sparkle accent */}
      <path d="M32 6L33.5 9L37 10.5L33.5 12L32 15L30.5 12L27 10.5L30.5 9Z" fill="#facc15" opacity="0.9" />
    </svg>
  );
}

function HelpModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px] animate-fade-in"></div>
      <div className="relative bg-white rounded-[16px] shadow-[0_24px_48px_rgba(0,0,0,0.12)] w-full max-w-[520px] animate-scale-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="h-[6px] bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500"></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 shrink-0">help</span>
              <h3 className="font-bold text-[18px] text-slate-800">Help & Guide</h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer text-slate-400 shrink-0">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-[#EEF2FF] rounded-[12px] p-4 text-left">
              <h4 className="font-semibold text-[14px] text-indigo-700 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Date Range Selection
              </h4>
              <p className="text-[12px] text-slate-600 leading-relaxed font-medium">Click on any date to start a selection. Click another date to complete the range. The selected range will be highlighted in purple.</p>
            </div>

            <div className="bg-[#F5F3FF] rounded-[12px] p-4 text-left">
              <h4 className="font-semibold text-[14px] text-violet-600 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">sticky_note_2</span>
                Notes & Memos
              </h4>
              <p className="text-[12px] text-slate-600 leading-relaxed font-medium">Add notes linked to your selected date range. Click any note card to view details, edit, or delete.</p>
            </div>

            <div className="bg-[#FFFBEB] rounded-[12px] p-4 text-left">
              <h4 className="font-semibold text-[14px] text-amber-600 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">target</span>
                Goals Tracker
              </h4>
              <p className="text-[12px] text-slate-600 leading-relaxed font-medium">Set personal goals with priorities. Check them off and watch your progress bar grow.</p>
            </div>

            <div className="bg-[#ECFDF5] rounded-[12px] p-4 text-left">
              <h4 className="font-semibold text-[14px] text-emerald-600 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">save</span>
                Data Persistence
              </h4>
              <p className="text-[12px] text-slate-600 leading-relaxed font-medium">All data is saved locally using localStorage. Export as JSON or clear from Settings.</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="font-bold text-[12px] text-slate-400 uppercase tracking-[0.1em] mb-4 text-left">Keyboard Shortcuts</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {[
                { key: 'Enter', desc: 'Add note / Save' },
                { key: 'Escape', desc: 'Close modal' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-500 font-medium">{s.desc}</span>
                  <kbd className="text-[11px] font-mono bg-slate-100 px-2 py-1 rounded shadow-sm border border-slate-200 text-slate-600 font-bold">{s.key}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SideNavBar({ activeView, onViewChange, onNewEntry }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const confirmLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col p-6 z-40 bg-slate-50/70 backdrop-blur-xl w-80 rounded-r-3xl overflow-hidden shadow-[0px_12px_32px_rgba(44,47,49,0.06)]">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800 font-headline">The Curator</h1>
              <p className="text-xs text-slate-500 font-medium">Premium Planner</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                activeView === item.id
                  ? 'bg-indigo-100/50 text-indigo-700 font-semibold'
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-200/50'
              }`}
            >
              <span className="material-symbols-outlined shrink-0">{item.icon}</span>
              <span className="uppercase tracking-widest text-[10px]">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 space-y-4">
          <button 
            onClick={onNewEntry}
            className="w-full py-4 bg-gradient-to-br from-indigo-600 to-indigo-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 active:scale-95 transition-transform cursor-pointer"
          >
            New Entry
          </button>
          <div className="border-t border-slate-100 pt-4">
            <button 
              onClick={() => setShowHelp(true)}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 text-xs hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">help_outline</span>
              <span>Help</span>
            </button>
            <button 
              onClick={() => setShowLogout(true)}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 text-xs hover:text-red-500 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {showLogout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowLogout(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"></div>
          <div className="relative bg-white rounded-[16px] shadow-[0_24px_48px_rgba(0,0,0,0.12)] w-full max-w-[400px] animate-scale-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-[6px] bg-gradient-to-r from-red-500 to-orange-400"></div>
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-5 shadow-inner">
                <span className="material-symbols-outlined text-red-500 text-[30px]">logout</span>
              </div>
              <h3 className="font-bold text-[18px] font-headline mb-2 text-[#1E293B]">Logout & Reset</h3>
              <p className="text-[14px] text-slate-500 mb-8 mx-auto max-w-[280px] leading-relaxed">This will clear all your notes, goals, and selections. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLogout(false)}
                  className="flex-1 h-12 rounded-[12px] bg-[#F1F5F9] text-slate-600 font-semibold text-[13px] hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 h-12 rounded-[12px] bg-red-500 text-white font-semibold text-[13px] hover:bg-red-600 transition-colors cursor-pointer shadow-[0_4px_14px_rgba(239,68,68,0.3)]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

