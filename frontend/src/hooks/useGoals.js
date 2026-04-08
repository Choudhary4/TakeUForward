import { useState, useEffect } from 'react';

export function useGoals() {
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('calendar_goals');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    
    return [
      { id: 1, text: "Complete Q3 project deliverables", completed: false, priority: "high" },
      { id: 2, text: "Read 2 books this month", completed: false, priority: "medium" },
      { id: 3, text: "Exercise 4 times a week", completed: true, priority: "high" },
      { id: 4, text: "Learn a new productivity framework", completed: false, priority: "low" },
    ];
  });

  useEffect(() => {
    localStorage.setItem('calendar_goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (text, priority = 'medium') => {
    if (!text.trim()) return;
    setGoals(prev => [...prev, { id: Date.now(), text, completed: false, priority }]);
  };

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const updateGoal = (id, text) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, text } : g));
  };

  return { goals, addGoal, toggleGoal, deleteGoal, updateGoal };
}
