import React from 'react';

export function TopNavBar() {
  return (
    <header className="flex lg:hidden justify-between items-center w-full px-8 py-4 sticky top-0 z-30 bg-slate-50 dark:bg-slate-950">
      <span className="text-2xl font-black bg-gradient-to-br from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Digitalist</span>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-slate-500">notifications</span>
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
          <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8SFrUnBcznk69ybGwYHzd5eFOQVnxy_7gTd-j0aDRyu0w7xqEodxTu3eQG_bpTGAXxDBDxqa5IZ73Az0ZT8NGE0UYocg5nko-QMJEO30fof3R-tnWG6Yl1Z6maZ24IQgUkG-Lqy_22l-X2uJNYXyrQfjM17Bm4n8hoVx5a3KHVLiNsAd7Ce0Edjqed7xas96_uXs-GzV8fwXM03w61W7UWhTXBUeEpb9-LXvlEOo96oAefMFi4iJcRovJvBJ3qj5zpAXG5tx-9bA"/>
        </div>
      </div>
    </header>
  );
}
