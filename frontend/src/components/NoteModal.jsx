import React, { useState, useEffect } from 'react';

export function NoteModal({ note, onClose, onSave, onDelete }) {
  const [editText, setEditText] = useState(note.text);
  const [editDate, setEditDate] = useState(note.date);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDatePick = (e) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-');
    const pickedDate = new Date(y, m - 1, d);
    const formatted = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(pickedDate);
    setEditDate(formatted);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px] animate-fade-in"></div>
      
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
            <div className="flex items-center gap-2 relative">
              <label className="cursor-pointer flex items-center relative overflow-hidden group">
                <span className="material-symbols-outlined text-indigo-600 text-xl group-hover:text-indigo-800 transition-colors">
                  calendar_today
                </span>
                {isEditing && (
                  <input 
                    type="date"
                    onChange={handleDatePick}
                    className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                  />
                )}
              </label>
              {isEditing ? (
                <input 
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="text-[12px] uppercase tracking-[0.2em] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded outline-none border border-indigo-100 placeholder:text-indigo-300 w-36"
                  placeholder="Date/Label"
                />
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
