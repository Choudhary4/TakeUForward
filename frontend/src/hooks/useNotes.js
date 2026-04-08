import { useState, useEffect } from 'react';

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('calendar_notes');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    
    // Default initial data for September 2026 based on the UI
    return [
      { id: 1, text: "Finalize quarterly report and send for review.", date: "Sept 04", category: "indigo" },
      { id: 2, text: "Marketing workshop kick-off session.", date: "Sept 12", category: "tertiary" },
      { id: 3, text: "Renew architectural software licenses.", date: "Sept 21", category: "slate" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('calendar_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text, dateStr) => {
    if (!text.trim()) return;
    const newNote = {
      id: Date.now(),
      text,
      date: dateStr || "General",
      category: "primary" // Default new ones to primary
    };
    setNotes(prev => [...prev, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const updateNote = (id, newText, newDate) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, text: newText, date: newDate !== undefined ? newDate : n.date } : n));
  };

  return { notes, addNote, deleteNote, updateNote };
}
