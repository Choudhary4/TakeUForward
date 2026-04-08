import React, { useState, useRef } from 'react';
import { SideNavBar } from './components/SideNavBar';
import { TopNavBar } from './components/TopNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HeroBanner } from './components/HeroBanner';
import { NotesSidebar } from './components/NotesSidebar';
import { CalendarGrid } from './components/CalendarGrid';
import { MemosView } from './components/MemosView';
import { GoalsView } from './components/GoalsView';
import { SettingsView } from './components/SettingsView';

import { useCalendarState } from './hooks/useCalendarState';
import { useNotes } from './hooks/useNotes';
import { useGoals } from './hooks/useGoals';

function App() {
  const [activeView, setActiveView] = useState('calendar');
  const noteInputRef = useRef(null);

  const { 
    currentDate, days, selection, 
    onDateClick, nextMonth, prevMonth, 
    getDayStatus, monthStart 
  } = useCalendarState();
  
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const { goals, addGoal, toggleGoal, deleteGoal } = useGoals();

  const handleNewEntry = () => {
    setActiveView('calendar');
    // Scroll to note input after a tick
    setTimeout(() => {
      noteInputRef.current?.scrollIntoView({ behavior: 'smooth' });
      noteInputRef.current?.querySelector('textarea')?.focus();
    }, 100);
  };

  const renderView = () => {
    switch (activeView) {
      case 'memos':
        return <MemosView notes={notes} addNote={addNote} deleteNote={deleteNote} updateNote={updateNote} />;
      case 'goals':
        return <GoalsView goals={goals} addGoal={addGoal} toggleGoal={toggleGoal} deleteGoal={deleteGoal} />;
      case 'settings':
        return <SettingsView />;
      case 'calendar':
      default:
        return (
          <>
            <HeroBanner 
              currentDate={currentDate} 
              nextMonth={nextMonth} 
              prevMonth={prevMonth} 
            />
            <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
              <div className="w-full lg:w-80" ref={noteInputRef}>
                <NotesSidebar notes={notes} addNote={addNote} deleteNote={deleteNote} updateNote={updateNote} selection={selection} />
              </div>
              <div className="flex-1 w-full order-first lg:order-last">
                <CalendarGrid 
                  days={days} 
                  getDayStatus={getDayStatus}
                  onDateClick={onDateClick}
                  monthStart={monthStart}
                  notes={notes}
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#f5f7f9' }}>
      <SideNavBar activeView={activeView} onViewChange={setActiveView} onNewEntry={handleNewEntry} />
      <TopNavBar />
      
      <main className="lg:ml-80 min-h-screen p-4 lg:p-8 pb-32 lg:pb-8">
        <div>
          {renderView()}
        </div>
      </main>

      <BottomNavBar activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
}

export default App;
