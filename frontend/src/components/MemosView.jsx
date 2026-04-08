import React, { useState } from 'react';
import { NoteModal } from './NoteModal';

const BORDER_COLORS = {
  indigo: 'border-indigo-600',
  tertiary: 'border-violet-600',
  slate: 'border-slate-300',
  primary: 'border-indigo-600',
};

export function MemosView({ notes, addNote, deleteNote, updateNote }) {
  const [newNote, setNewNote] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState('all'); // all, recent

  const handleAdd = () => {
    if (newNote.trim()) {
      addNote(newNote, new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(new Date()));
      setNewNote('');
    }
  };

  const filteredNotes = filter === 'recent' 
    ? [...notes].reverse().slice(0, 5) 
    : [...notes].reverse();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[32px] font-extrabold font-headline tracking-tight text-slate-800">Memos</h2>
          <p className="text-sm text-slate-400 mt-1">{notes.length} notes saved</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer tracking-wide ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-200/50 text-slate-500 hover:bg-slate-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('recent')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer tracking-wide ${filter === 'recent' ? 'bg-indigo-600 text-white' : 'bg-slate-200/50 text-slate-500 hover:bg-slate-200'}`}
          >
            Recent
          </button>
        </div>
      </div>

      {/* Add memo input */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(44,47,49,0.04)] mb-8 flex gap-3 items-center border border-slate-100">
        <textarea 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd(); } }}
          className="flex-1 bg-transparent text-sm p-3 resize-none text-slate-800 placeholder:text-slate-400 outline-none h-12 pt-3.5"
          placeholder="Write a new memo..."
        />
        <button onClick={handleAdd} className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold hover:bg-indigo-700 transition-all cursor-pointer shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300">
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <p className="text-slate-400 text-sm col-span-2 text-center py-12">No memos yet. Write one above!</p>
        ) : filteredNotes.map((note, index) => {
          // Cycle through some nice border colors if none specified
          const colors = ['border-indigo-600', 'border-violet-600', 'border-pink-500', 'border-amber-500', 'border-emerald-500'];
          const borderClass = BORDER_COLORS[note.category] || colors[index % colors.length];
          
          return (
            <div 
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(44,47,49,0.04)] border-l-4 ${borderClass} cursor-pointer hover:shadow-[0_8px_30px_rgba(44,47,49,0.08)] hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{note.date}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                  className="text-slate-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
              <p className="text-[15px] text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">{note.text}</p>
            </div>
          );
        })}
      </div>

      {selectedNote && (
        <NoteModal 
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onSave={(id, text, date) => { updateNote(id, text, date); setSelectedNote({ ...selectedNote, text, date }); }}
          onDelete={deleteNote}
        />
      )}
    </div>
  );
}
