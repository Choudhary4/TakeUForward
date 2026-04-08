import React, { useState, useEffect, useRef } from 'react';

const fmt = (d) => new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(d);

export function NoteModal({ note, onClose, onSave, onDelete }) {
  const [editText, setEditText] = useState(note.text);
  const [editDate, setEditDate] = useState(note.date);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const startRef = useRef(null);
  const endRef = useRef(null);

  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 5000);
  };

  const toYMD = (dateString) => {
    if (!dateString) return '';
    const d = new Date(`${dateString.trim()}, ${new Date().getFullYear()}`);
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSave = () => {
    onSave(note.id, editText, editDate);
    setIsEditing(false);
  };

  const handleStartPick = (e) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-');
    const startDate = new Date(y, m - 1, d);
    const startFormatted = fmt(startDate);

    // Check if current editDate has a range
    const parts = editDate.split(' - ');
    if (parts.length === 2) {
      const endPart = parts[1].trim();
      // Compare by parsing the end date in the same year
      const endDate = new Date(`${endPart}, ${startDate.getFullYear()}`);
      
      if (startDate > endDate) {
        showError('Start date cannot be after end date');
      } else {
        setEditDate(`${startFormatted} - ${endPart}`);
      }
    } else {
      setEditDate(startFormatted);
    }
  };

  const handleEndPick = (e) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-');
    const endDate = new Date(y, m - 1, d);
    const endFormatted = fmt(endDate);

    // Get the start part (or current single date)
    const parts = editDate.split(' - ');
    const startPart = parts[0].trim();
    const startDate = new Date(`${startPart}, ${endDate.getFullYear()}`);
    
    if (startDate > endDate) {
      showError('End date cannot be before start date');
    } else {
      setEditDate(`${startPart} - ${endFormatted}`);
    }
  };

  const removeEndDate = () => {
    const parts = editDate.split(' - ');
    setEditDate(parts[0]);
  };

  // Parse the current date label
  const dateParts = editDate.split(' - ');
  const hasRange = dateParts.length === 2;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px] animate-fade-in"></div>
      
      {/* Global Error Toast */}
      {errorMsg && (
        <div className="absolute top-6 right-6 bg-red-500 text-white text-[12px] font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-[0_12px_32px_rgba(239,68,68,0.4)] z-[200] animate-fade-in flex items-center gap-2 pointer-events-none">
          <span className="material-symbols-outlined text-[20px]">error</span>
          {errorMsg}
        </div>
      )}

      {/* Modal */}
      <div 
        className="relative bg-white rounded-[16px] shadow-[0_24px_48px_rgba(0,0,0,0.12)] w-full max-w-[480px] animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"></div>
        
        <div className="p-6">
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 text-xl">calendar_today</span>
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  {/* Date pickers row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Start date picker */}
                    <input ref={startRef} type="date" value={toYMD(dateParts[0])} onChange={handleStartPick} className="sr-only" />
                    <button
                      type="button"
                      onClick={() => startRef.current?.showPicker()}
                      className="cursor-pointer flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors text-[11px] uppercase tracking-[0.1em] text-indigo-600 font-bold"
                    >
                      {dateParts[0]}
                      <span className="material-symbols-outlined text-indigo-400 text-[14px]">edit_calendar</span>
                    </button>

                    {hasRange && (
                      <>
                        <span className="text-slate-400 text-xs font-bold">—</span>
                        {/* End date picker */}
                        <input ref={endRef} type="date" value={toYMD(dateParts[1])} onChange={handleEndPick} className="sr-only" />
                        <button
                          type="button"
                          onClick={() => endRef.current?.showPicker()}
                          className="cursor-pointer flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors text-[11px] uppercase tracking-[0.1em] text-indigo-600 font-bold"
                        >
                          {dateParts[1].trim()}
                          <span className="material-symbols-outlined text-indigo-400 text-[14px]">edit_calendar</span>
                        </button>
                        <button
                          type="button"
                          onClick={removeEndDate}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove end date"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </>
                    )}

                    {!hasRange && (
                      <>
                        <input ref={endRef} type="date" value={toYMD(dateParts[0])} onChange={handleEndPick} className="sr-only" />
                        <button
                          type="button"
                          onClick={() => endRef.current?.showPicker()}
                          className="cursor-pointer flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-dashed border-slate-300 hover:bg-indigo-50 hover:border-indigo-200 transition-colors text-[10px] uppercase tracking-wider text-slate-400 hover:text-indigo-500 font-bold"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                          End date
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <span className="text-[12px] uppercase tracking-[0.2em] text-indigo-600 font-bold">{note.date}</span>
              )}
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Note content */}
          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full bg-slate-50 rounded-[12px] text-sm p-4 focus:ring-2 focus:ring-indigo-600 h-[100px] resize-none text-slate-800 outline-none"
              autoFocus
            />
          ) : (
            <p className="text-slate-800 text-[16px] leading-relaxed font-medium min-h-[80px] whitespace-pre-wrap">
              {note.text}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-6 pt-2">
            {isEditing ? (
              <button 
                onClick={() => { setIsEditing(false); setEditText(note.text); setEditDate(note.date); }}
                className="px-5 py-2 text-sm font-semibold text-slate-500 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            ) : (
              <button 
                onClick={() => { onDelete(note.id); onClose(); }}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-red-500 transition-colors cursor-pointer px-2 py-2"
              >
                <span className="material-symbols-outlined text-base">delete</span>
                Delete
              </button>
            )}
            
            <div className="flex gap-2">
              {isEditing ? (
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shadow-md shadow-indigo-200"
                >
                  Save
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
