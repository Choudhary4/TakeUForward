import React from 'react';

const NAV_ITEMS = [
  { id: 'calendar', icon: 'event_note', label: 'Events' },
  { id: 'memos', icon: 'edit_note', label: 'Notes' },
  { id: 'goals', icon: 'check_circle', label: 'Goals' },
  { id: 'settings', icon: 'person', label: 'More' },
];

export function BottomNavBar({ activeView, onViewChange }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex lg:hidden justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl shadow-[0px_-8px_24px_rgba(44,47,49,0.04)]">
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all cursor-pointer ${
            activeView === item.id
              ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200'
              : 'text-slate-400 dark:text-slate-500 active:bg-slate-100'
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="text-[10px] font-medium tracking-wide uppercase mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
