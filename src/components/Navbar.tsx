import { Sparkles, HelpCircle, BookOpen, RotateCcw } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onResetDeveloperSandbox: () => void;
  completedCount: number;
  totalChallenges: number;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  onResetDeveloperSandbox,
  completedCount,
  totalChallenges
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo and Brand */}
        <div id="nav-brand" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-violet-600 shadow-lg shadow-sky-550/15">
            <span className="font-display text-lg font-black text-slate-950">T</span>
          </div>
          <div>
            <h1 className="font-display text-sm font-bold tracking-tight text-slate-100 sm:text-base">
              Academy & Sandbox
            </h1>
            <p className="font-mono text-[9px] font-semibold text-sky-450 uppercase tracking-widest">
              Tailwind CSS v4 Interactive
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav id="nav-actions" className="hidden lg:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setCurrentTab("sandbox")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              currentTab === "sandbox"
                ? "bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            💻 Sandbox Editor
          </button>
          <button
            onClick={() => setCurrentTab("lessons")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === "lessons"
                ? "bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            🎓 Scuola di Tailwind
            {completedCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-500 px-1 text-[9px] font-bold text-slate-950">
                {completedCount}/{totalChallenges}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentTab("library")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              currentTab === "library"
                ? "bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            📚 Libreria Componenti
          </button>
          <button
            onClick={() => setCurrentTab("help")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              currentTab === "help"
                ? "bg-slate-800 text-slate-100 shadow-sm border border-slate-700/50"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            🔍 Guida Rapida Classes
          </button>
        </nav>

        {/* Quick Utility Control & Progress */}
        <div className="flex items-center gap-2">
          {/* Mobile view alert helper/tab list */}
          <div className="lg:hidden flex bg-slate-900 border border-slate-800 p-1 rounded-xl max-w-xs">
            <select
              value={currentTab}
              onChange={(e) => setCurrentTab(e.target.value)}
              className="text-xs font-semibold bg-transparent border-none outline-none text-slate-200 py-1 px-2 cursor-pointer"
            >
              <option value="sandbox">💻 Sandbox</option>
              <option value="lessons">🎓 Lezioni ({completedCount}/{totalChallenges})</option>
              <option value="library">📚 Componenti</option>
              <option value="help">🔍 Guida</option>
            </select>
          </div>

          <button
            onClick={onResetDeveloperSandbox}
            title="Ripristina Sandbox"
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-900 hover:border-red-500/50 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-sky-500/10 px-3 py-1.5 border border-sky-500/20">
            <Sparkles className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-sky-400">
              Vite Dev Server Live
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
