import { useState, useMemo, useEffect } from 'react';
import { 
  addMonths, subMonths, format, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isWithinInterval, isBefore, isAfter,
  parseISO
} from 'date-fns';

export function useCalendarState() {
  const [currentDate, setCurrentDate] = useState(() => {
    return new Date(); // Start on the current actual date
  });
  
  const [selection, setSelection] = useState(() => {
    try {
      const saved = localStorage.getItem('calendar_selection');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          start: parsed.start ? parseISO(parsed.start) : null,
          end: parsed.end ? parseISO(parsed.end) : null
        };
      }
    } catch(e) {}
    return { start: null, end: null };
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('calendar_selection', JSON.stringify({
      start: selection.start ? selection.start.toISOString() : null,
      end: selection.end ? selection.end.toISOString() : null
    }));
  }, [selection]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const onDateClick = (day) => {
    if (!selection.start || (selection.start && selection.end)) {
      // Start a new selection
      setSelection({ start: day, end: null });
    } else {
      // Complete the selection
      if (isBefore(day, selection.start)) {
        // Reversed selection, correct it
        setSelection({ start: day, end: selection.start });
      } else {
        setSelection({ ...selection, end: day });
      }
    }
  };

  const getDayStatus = (day) => {
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isStart = selection.start && isSameDay(day, selection.start);
    const isEnd = selection.end && isSameDay(day, selection.end);
    const isBetween = selection.start && selection.end && 
                      isAfter(day, selection.start) && 
                      isBefore(day, selection.end);
    
    // Check if it's the only selected date (no end date yet)
    const isOnlySelection = isStart && !selection.end;

    return {
      isCurrentMonth,
      isStart,
      isEnd,
      isBetween,
      isOnlySelection
    };
  };

  return {
    currentDate,
    days,
    selection,
    onDateClick,
    nextMonth,
    prevMonth,
    getDayStatus,
    monthStart
  };
}
