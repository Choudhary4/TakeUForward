import React, { useState } from 'react';

const PRIORITY_STYLES = {
  high: { badge: 'bg-red-50 text-red-500', label: 'High' },
  medium: { badge: 'bg-amber-50 text-amber-600', label: 'Medium' },
  low: { badge: 'bg-emerald-50 text-emerald-600', label: 'Low' },
};

export function GoalsView({ goals, addGoal, toggleGoal, deleteGoal }) {
  const [newGoal, setNewGoal] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAdd = () => {
    if (newGoal.trim()) {
      addGoal(newGoal, priority);
      setNewGoal('');
    }
  };

  const completed = goals.filter(g => g.completed).length;
  const total = goals.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[32px] font-extrabold font-headline tracking-tight text-slate-800">Goals</h2>
          <p className="text-sm text-slate-400 mt-1">Track your progress</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[20px] p-6 text-white mb-8 shadow-[0_12px_24px_rgba(79,70,229,0.25)] relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative flex items-center justify-between mb-6">
          <div>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">Overall Progress</p>
            <p className="text-5xl font-extrabold font-headline mt-2">{progress}%</p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm font-medium">{completed} of {total}</p>
            <p className="text-white/50 text-[11px] uppercase tracking-wider mt-1">goals completed</p>
          </div>
        </div>
        <div className="relative w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Add goal */}
      <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_20px_rgba(44,47,49,0.04)] mb-8 border border-slate-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
            className="flex-1 bg-transparent text-sm p-3 placeholder:text-slate-400 outline-none h-12 text-slate-800"
            placeholder="Add a new goal..."
          />
          <div className="flex gap-3">
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-slate-50 text-slate-600 rounded-xl text-sm px-4 h-12 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer border border-slate-200 font-medium appearance-none"
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <button onClick={handleAdd} className="px-8 h-12 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors cursor-pointer shadow-md shadow-indigo-200">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Goals list */}
      <div className="space-y-3">
        {goals.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-12">No goals yet. Set one above!</p>
        ) : goals.map(goal => {
          const ps = PRIORITY_STYLES[goal.priority] || PRIORITY_STYLES.medium;
          return (
            <div 
              key={goal.id}
              className={`bg-white rounded-[16px] p-4 shadow-[0_2px_10px_rgba(44,47,49,0.03)] border border-slate-50 flex items-center gap-4 group transition-all duration-300 hover:shadow-[0_8px_24px_rgba(44,47,49,0.06)] hover:-translate-y-0.5 ${goal.completed ? 'opacity-60 bg-slate-50/50' : ''}`}
            >
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                  goal.completed 
                    ? 'bg-indigo-600 border-indigo-600 shadow-inner' 
                    : 'border-slate-300 hover:border-indigo-400 bg-slate-50'
                }`}
              >
                {goal.completed && (
                  <span className="material-symbols-outlined text-white text-[18px] font-bold">check</span>
                )}
              </button>
              <p className={`flex-1 text-[15px] font-medium leading-relaxed ${goal.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {goal.text}
              </p>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full ${ps.badge}`}>
                {ps.label}
              </span>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all cursor-pointer p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
