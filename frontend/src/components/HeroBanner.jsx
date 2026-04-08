import React from 'react';
import { format } from 'date-fns';

const MONTH_IMAGES = {
  0: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=90&auto=format&fit=crop", // Jan (Winter)
  1: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=90&auto=format&fit=crop", // Feb (Office setup)
  2: "https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?w=1920&q=90&auto=format&fit=crop", // Mar (Clean desk)
  3: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90&auto=format&fit=crop", // Apr (Premium office)
  4: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?w=1920&q=90&auto=format&fit=crop", // May (Minimalist interior)
  5: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=90&auto=format&fit=crop", // Jun (Architecture skyline)
  6: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=90&auto=format&fit=crop", // Jul (Team working)
  7: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=90&auto=format&fit=crop", // Aug (Workspace/Office)
  8: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=1920&q=90&auto=format&fit=crop", // Sep (Workspace aesthetic)
  9: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=90&auto=format&fit=crop", // Oct (Work tech)
  10: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=90&auto=format&fit=crop",// Nov (Modern space)
  11: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=90&auto=format&fit=crop" // Dec (Coding desk)
};

export function HeroBanner({ currentDate, nextMonth, prevMonth }) {
  const monthName = format(currentDate, "MMMM yyyy");
  const monthIndex = currentDate.getMonth(); // 0 to 11
  const bgImage = MONTH_IMAGES[monthIndex] || MONTH_IMAGES[0];

  return (
    <section className="relative h-[300px] lg:h-[400px] w-full rounded-xl overflow-hidden mb-8 shadow-[0px_12px_32px_rgba(44,47,49,0.06)]">
      <img
        key={bgImage}
        alt={`${monthName} Banner`}
        className="w-full h-full object-cover animate-fade-in"
        src={bgImage}
        loading="eager"
      />
      {/* Date Overlay */}
      <div className="absolute bottom-0 left-0 p-8 lg:p-12 bg-gradient-to-t from-black/60 to-transparent w-full flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-white/80 font-medium tracking-widest text-xs uppercase mb-1">Planning Ahead</span>
          <div className="flex items-center gap-6">
            <h2 className="text-white text-4xl lg:text-6xl font-extrabold tracking-tight font-headline">{monthName}</h2>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/20">
              <button onClick={prevMonth} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white cursor-pointer">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button onClick={nextMonth} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Spiral Binding Visual Detail */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 -mt-2">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="w-4 h-8 bg-slate-300/40 backdrop-blur-sm rounded-full border border-white/30"></div>
        ))}
      </div>
    </section>
  );
}


