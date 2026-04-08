# The Curator — Interactive Calendar Component

A premium, interactive React calendar component built for the **Frontend Engineering Challenge**. It features a wall calendar aesthetic with a hero image banner, day range selection, integrated notes, goals tracking, and a fully responsive design.

![The Curator](https://lh3.googleusercontent.com/aida-public/AB6AXuCig2721HZf0sFS5hRSCpftfaK7LP3mE8RgpgRWBXAUx8TrHg-wQKJH-jVni9ktQCcM3-HClotYnQObXgWmPJmKT6gk_UuhRnEZq7YyPzj1JcHO1u9rFpPJi8-Jz7FYsT1eDD_mzBS2qaJfYo_C4nbOehKPy9wpLCFYSQ1xn69S5RfqEL_5Yjnf6roBmIy2g12M4tnCv_qE9BIVw1ihQ6MAufr44js6xWsPnDoQy1Eyl2TQ7dnSo5QZZbu39G6I35I6MO1ZFLRnl90)

## ✨ Features

### Core Requirements
- **Wall Calendar Aesthetic**: Hero image banner with month-specific imagery, spiral binding detail, and a clean editorial layout
- **Day Range Selector**: Click to select start/end dates with visual states for start, end, and in-between days
- **Integrated Notes**: Add notes linked to selected date ranges, edit/delete via modal, with color-coded categories
- **Fully Responsive**: Desktop sidebar layout gracefully collapses to a mobile-first stacked layout with bottom navigation

### Creative Extras
- **Goals Tracker**: Set goals with High/Medium/Low priority, track progress with an animated progress bar
- **Memos View**: Full-page grid view of all notes with All/Recent filtering
- **Data Export**: Export all notes and goals as CSV from Settings
- **Design System**: Premium "Indigo Vellum" design system with glassmorphic sidebar, tonal layering, and Manrope + Inter typography
- **Keyboard Shortcuts**: Enter to save, Escape to close modals
- **Note Indicators**: Colored dots on calendar dates that have notes

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Styling with custom design tokens |
| **date-fns** | Date manipulation & formatting |
| **localStorage** | Client-side data persistence |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/Choudhary4/TakeUForward.git
cd TakeUForward/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Production Build

```bash
npm run build    # Outputs to frontend/dist/
npm run preview  # Preview the production build locally
```

## 📁 Architecture

```
frontend/src/
├── App.jsx                    # Root layout & view routing
├── main.jsx                   # Entry point
├── index.css                  # Design tokens & global styles
├── hooks/
│   ├── useCalendarState.js    # Calendar navigation & range selection
│   ├── useNotes.js            # Notes CRUD with localStorage
│   └── useGoals.js            # Goals CRUD with localStorage
└── components/
    ├── HeroBanner.jsx         # Hero image banner with month navigation
    ├── CalendarGrid.jsx       # 7-column calendar grid with range highlights
    ├── NotesSidebar.jsx       # Side panel for notes + quick add
    ├── NoteModal.jsx          # Detail/edit modal for notes
    ├── SideNavBar.jsx         # Desktop glassmorphic sidebar navigation
    ├── TopNavBar.jsx          # Mobile top navigation bar
    ├── BottomNavBar.jsx       # Mobile bottom tab bar
    ├── MemosView.jsx          # Full-page memos grid
    ├── GoalsView.jsx          # Goals tracker with progress
    └── SettingsView.jsx       # Data export & management
```

## 🎨 Design Decisions

1. **Wall Calendar Metaphor**: The hero banner acts as the "top" of a wall calendar with spiral binding details, while the grid below maintains the physical calendar feel.
2. **Tonal Layering over Borders**: Following the design system's "No-Line Rule", sections are separated by background color shifts and shadows instead of explicit borders.
3. **Glassmorphic Sidebar**: The navigation sidebar uses a frosted glass effect (`backdrop-blur-xl`) to create depth and premium polish.
4. **Custom Hooks for State**: Each data domain (calendar, notes, goals) has its own custom hook, keeping components focused purely on UI.
5. **localStorage Persistence**: All data is automatically synced to localStorage, surviving page refreshes with zero configuration.

## 📱 Responsive Breakpoints

- **Desktop (≥1024px)**: Sidebar navigation + side-by-side Notes/Calendar layout
- **Mobile (<1024px)**: Bottom tab bar + stacked vertical layout + top header

## 📄 License

MIT
