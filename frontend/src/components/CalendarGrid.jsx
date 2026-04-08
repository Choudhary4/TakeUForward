import React from 'react';
import { format, isSameMonth } from 'date-fns';

export function CalendarGrid({ days, getDayStatus, onDateClick, monthStart, notes = [] }) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const DOT_COLORS = {
    indigo: 'bg-indigo-500',
    tertiary: 'bg-red-500',
    slate: 'bg-slate-400',
    primary: 'bg-indigo-600',
  };

  const hasNotesForDay = (day) => {
    const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(day);
    // Find first note that contains this date exact string (to handle both single dates and ranges)
    const matchingNote = notes.find(n => n.date && n.date.includes(fmt));
    return matchingNote ? (DOT_COLORS[matchingNote.category] || 'bg-indigo-500') : null;
  };

  return (
    <div className="flex-1 w-full bg-surface-container-lowest rounded-xl p-6 lg:p-10 shadow-[0px_12px_32px_rgba(44,47,49,0.06)]">
      {/* Day Headers */}
      <div className="calendar-grid mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 py-4">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="calendar-grid gap-y-4">
        {days.map((day, idx) => {
          const status = getDayStatus(day);
          const formattedDay = format(day, 'd');
          const dotColor = hasNotesForDay(day);
          
          if (!status.isCurrentMonth) {
            return (
              <div key={idx} className="h-14 lg:h-16 flex items-center justify-center opacity-30">
                <span className="text-slate-600 font-medium text-sm">{formattedDay}</span>
              </div>
            );
          }

          // --- Start or End of range ---
          if (status.isStart || status.isEnd || status.isOnlySelection) {
            return (
              <div 
                key={idx} 
                onClick={() => onDateClick(day)}
                className="relative h-14 lg:h-16 flex flex-col items-center justify-center cursor-pointer"
              >
                {/* Background strip connecting to the range */}
                {status.isStart && !status.isOnlySelection && (
                  <div className="absolute top-1/2 -translate-y-1/2 bottom-0 right-0 left-1/2 h-10 lg:h-12 bg-indigo-50"></div>
                )}
                {status.isEnd && (
                  <div className="absolute top-1/2 -translate-y-1/2 bottom-0 left-0 right-1/2 h-10 lg:h-12 bg-indigo-50"></div>
                )}
                {/* The circle */}
                <div className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
                  <span className="text-sm lg:text-base">{formattedDay}</span>
                </div>
                {/* Sub-dot indicating note */}
                {dotColor && !status.isBetween && (
                  <div className={`absolute bottom-0 w-1.5 h-1.5 rounded-full ${dotColor} opacity-70 z-20 translate-y-3`}></div>
                )}
              </div>
            );
          }
          
          // --- In-between range dates ---
          if (status.isBetween) {
            return (
              <div 
                key={idx} 
                onClick={() => onDateClick(day)}
                className="relative h-14 lg:h-16 flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-10 lg:h-12 bg-indigo-50"></div>
                <span className="relative z-10 text-indigo-700 font-bold text-sm lg:text-base">{formattedDay}</span>
                {/* Sub-dot indicating note */}
                {dotColor && (
                  <div className={`absolute bottom-0 w-1.5 h-1.5 rounded-full ${dotColor} opacity-50 z-20 translate-y-3`}></div>
                )}
              </div>
            );
          }

          // --- Normal unselected day ---
          return (
            <div 
              key={idx} 
              onClick={() => onDateClick(day)}
              className="relative h-14 lg:h-16 flex flex-col items-center justify-center cursor-pointer group"
            >
              <span className="text-slate-600 font-medium group-hover:text-indigo-600 transition-colors text-sm lg:text-base">
                {formattedDay}
              </span>
              {/* Sub-dot indicating note */}
              {dotColor && (
                <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${dotColor} transition-all duration-300 translate-y-2`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
