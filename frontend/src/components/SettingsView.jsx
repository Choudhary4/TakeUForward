import React, { useState } from 'react';

function ClearDataModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-400"></div>
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
          </div>
          <h3 className="font-bold text-lg font-headline mb-2">Clear All Data?</h3>
          <p className="text-sm text-slate-500 mb-6">This will permanently delete all your notes, goals, and selections. This action cannot be undone.</p>
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors cursor-pointer"
            >
              Clear Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsView() {
  const [cleared, setCleared] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const confirmClearData = () => {
    localStorage.removeItem('calendar_notes');
    localStorage.removeItem('calendar_goals');
    localStorage.removeItem('calendar_selection');
    setCleared(true);
    setShowClearModal(false);
    setTimeout(() => window.location.reload(), 800);
  };

  const handleExportCSV = () => {
    const notes = JSON.parse(localStorage.getItem('calendar_notes') || '[]');
    const goals = JSON.parse(localStorage.getItem('calendar_goals') || '[]');
    
    let csvLines = ["Type,Date,Content,Priority,Completed"];
    
    notes.forEach(note => {
      const safeText = note.text ? `"${note.text.replace(/"/g, '""')}"` : "";
      const date = note.date || "";
      csvLines.push(`Note,${date},${safeText},,`);
    });
    
    goals.forEach(goal => {
      const safeText = goal.text ? `"${goal.text.replace(/"/g, '""')}"` : "";
      const priority = goal.priority || "";
      const completed = goal.completed ? "Yes" : "No";
      csvLines.push(`Goal,,${safeText},${priority},${completed}`);
    });
    
    // Use standard RFC 4180 CRLF (\r\n) line endings without BOM for universal Mac/Windows compatibility
    const csvContent = csvLines.join('\r\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curator-export-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-[32px] font-extrabold font-headline tracking-tight text-slate-800">Settings</h2>
        <p className="text-sm text-slate-400 mt-1">Manage your preferences</p>
      </div>

      {/* About section */}
      <div className="bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(44,47,49,0.04)] mb-6 border border-slate-50">
        <h3 className="font-bold text-base font-headline mb-3 flex items-center gap-2 text-slate-800">
          <span className="material-symbols-outlined text-indigo-600 bg-indigo-50 p-1.5 rounded-lg text-lg">info</span>
          About
        </h3>
        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
          <strong className="text-slate-800">The Curator</strong> is a premium digital planner built as an Interactive Calendar Component. 
          It features date range selection, integrated notes, goal tracking, and full localStorage persistence — 
          all with a beautiful, responsive UI inspired by modern SaaS dashboards.
        </p>
        <div className="mt-5 flex gap-3 flex-wrap">
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100/50">React</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-100/50">Vite</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100/50">TailwindCSS</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100/50">date-fns</span>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(44,47,49,0.04)] mb-6 border border-slate-50">
        <h3 className="font-bold text-base font-headline mb-1 flex items-center gap-2 text-slate-800">
          <span className="material-symbols-outlined text-indigo-600 bg-indigo-50 p-1.5 rounded-lg text-lg">database</span>
          Data Management
        </h3>
        <p className="text-[13px] text-slate-400 mb-5 ml-10">All data is stored locally in your browser using localStorage.</p>
        <div className="space-y-3">
          <button 
            onClick={handleExportCSV}
            className="w-full flex items-center gap-3 px-5 py-3.5 bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
          >
            <span className="material-symbols-outlined text-indigo-600">download</span>
            Export Data as CSV
          </button>
          <button 
            onClick={() => setShowClearModal(true)}
            className="w-full flex items-center gap-3 px-5 py-3.5 bg-red-50 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer border border-red-100"
          >
            <span className="material-symbols-outlined text-red-500">delete_forever</span>
            {cleared ? 'Cleared! Reloading...' : 'Clear All Data'}
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(44,47,49,0.04)] border border-slate-50">
        <h3 className="font-bold text-base font-headline mb-4 flex items-center gap-2 text-slate-800">
          <span className="material-symbols-outlined text-indigo-600 bg-indigo-50 p-1.5 rounded-lg text-lg">keyboard</span>
          Keyboard Shortcuts
        </h3>
        <div className="space-y-1">
          {[
            { keys: 'Enter', desc: 'Add note / Save edit' },
            { keys: 'Escape', desc: 'Close modal' },
            { keys: 'Click + Click', desc: 'Select date range' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 last:pb-0">
              <span className="text-sm font-medium text-slate-500">{item.desc}</span>
              <kbd className="px-2.5 py-1.5 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-600 font-bold border border-slate-200 shadow-sm">{item.keys}</kbd>
            </div>
          ))}
        </div>
      </div>
      
      {showClearModal && <ClearDataModal onConfirm={confirmClearData} onCancel={() => setShowClearModal(false)} />}
    </div>
  );
}
