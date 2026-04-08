import React, { useState } from 'react';
import { NoteModal } from './NoteModal';

const BORDER_COLORS = {
  indigo: 'border-indigo-500',
  tertiary: 'border-tertiary',
  slate: 'border-slate-300',
  primary: 'border-primary',
};

export function NotesSidebar({ notes, addNote, deleteNote, updateNote, selection }) {
  const [newNote, setNewNote] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAdd = () => {
    if (newNote.trim()) {
      let dateLabel = "General";
      const fmt = (d) => new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(d);
      if (selection.start && selection.end) {
        dateLabel = `${fmt(selection.start)} - ${fmt(selection.end)}`;
      } else if (selection.start) {
        dateLabel = fmt(selection.start);
      }
      addNote(newNote, dateLabel);
      setNewNote('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <>
      <aside className="w-full lg:w-80 glass-sidebar rounded-xl p-6 shadow-[0px_8px_24px_rgba(44,47,49,0.04)] sticky top-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg font-headline">Notes & Memos</h3>
          <span className="material-symbols-outlined text-slate-400">edit_note</span>
        </div>
        <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-2">
          {notes.length === 0 ? (
            <p className="text-sm text-slate-400 text-center italic">No notes yet. Add one below!</p>
          ) : notes.map(note => (
            <div 
              key={note.id} 
              onClick={() => setSelectedNote(note)}
              className={`bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 ${BORDER_COLORS[note.category] || 'border-primary'} cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{note.date}</span>
              <p className="text-sm text-on-surface mt-1 font-medium whitespace-pre-wrap line-clamp-2">{note.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-3">
          <textarea 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full bg-surface-container-low border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary h-24 resize-none placeholder:text-slate-400 outline-none" 
            placeholder="Quick thought... (Press Enter to add)"
          ></textarea>
          <button onClick={handleAdd} className="w-full py-3 bg-secondary text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary transition-colors cursor-pointer relative z-20">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Note
          </button>
        </div>
      </aside>

      {/* Note Detail Modal */}
      {selectedNote && (
        <NoteModal 
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onSave={(id, text, date) => { updateNote(id, text, date); setSelectedNote({ ...selectedNote, text, date }); }}
          onDelete={deleteNote}
        />
      )}
    </>
  );
}
