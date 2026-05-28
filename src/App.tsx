import { useState, useEffect } from "react";
import { 
  Terminal, 
  Smartphone, 
  Tablet, 
  Monitor, 
  ZoomIn, 
  ZoomOut, 
  Copy, 
  Check, 
  Sparkles, 
  Trash2, 
  Undo,
  MessageSquare,
  ChevronRight,
  Code2,
  RotateCcw
} from "lucide-react";

import Navbar from "./components/Navbar";
import VisualConfigurator from "./components/VisualConfigurator";
import CheatSheetGrid from "./components/CheatSheetGrid";
import LibraryPanel from "./components/LibraryPanel";
import ChallengeCorriere from "./components/ChallengeCorriere";
import TutorPanel from "./components/TutorPanel";

const DEFAULT_SANDBOX_CODE = `<div class="p-8 max-w-sm mx-auto bg-white rounded-3xl shadow-xl space-y-4 border border-slate-150 transition-all duration-300 hover:shadow-2xl">\n  <div class="text-4xl text-center select-none">🚀</div>\n  <h2 class="text-xl font-bold text-slate-900 text-center">Spazio Sperimentale</h2>\n  <p class="text-xs text-slate-500 text-center leading-relaxed">\n    Modifica l'HTML nell'editor o usa i controlli visuali sotto per vedere le variazioni in tempo reale!\n  </p>\n  <div class="flex justify-center pt-2">\n    <button class="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition duration-200 cursor-pointer">\n      Cliccami\n    </button>\n  </div>\n</div>`;

export default function App() {
  const [activeCode, setActiveCode] = useState(DEFAULT_SANDBOX_CODE);
  const [currentTab, setCurrentTab] = useState("sandbox");
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [viewportWidth, setViewportWidth] = useState("100%");
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [copied, setCopied] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);

  // Load completed challenges from localStorage on initialization
  useEffect(() => {
    const saved = localStorage.getItem("tailwind_completed_challenges");
    if (saved) {
      try {
        setCompletedChallenges(JSON.parse(saved));
      } catch (err) {
        console.error("Error loading completed challenges:", err);
      }
    }
  }, []);

  const handleCompleteChallenge = (id: number) => {
    if (!completedChallenges.includes(id)) {
      const updated = [...completedChallenges, id];
      setCompletedChallenges(updated);
      localStorage.setItem("tailwind_completed_challenges", JSON.stringify(updated));
    }
  };

  const handleResetSandbox = () => {
    setShowResetModal(true);
  };

  const handleCopyCodeAll = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadChallengeCode = (code: string) => {
    setActiveCode(code);
  };

  const handleInsertClassAtCursor = (className: string) => {
    // Add specific class into the first class tag attributes
    const classRegex = /class=["']([^"']*)["']/;
    const classMatch = activeCode.match(classRegex);

    if (classMatch && classMatch[0]) {
      const currentClasses = classMatch[1];
      if (!currentClasses.includes(className)) {
        const updatedClasses = `${currentClasses} ${className}`.trim();
        const updatedCode = activeCode.replace(classRegex, `class="${updatedClasses}"`);
        setActiveCode(updatedCode);
      }
    } else {
      // Build basic class wrapper
      const firstTagRegex = /<([a-zA-Z0-9]+)/;
      const match = activeCode.match(firstTagRegex);
      if (match && match[0]) {
        const updatedCode = activeCode.replace(firstTagRegex, `${match[0]} class="${className}"`);
        setActiveCode(updatedCode);
      }
    }
  };

  // Generate HTML source doc for encapsulated rendering of Tailwind 4 JIT
  const generateIframeSrcDoc = () => {
    return `
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="utf-8">
        <!-- In-browser Tailwind CSS v4 compiler JIT engine -->
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <style>
          body {
            margin: 0;
            padding: 24px;
            font-family: system-ui, -apple-system, sans-serif;
            background-color: #f1f5f9; /* Slate 100 base check */
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 48px);
          }
        </style>
      </head>
      <body>
        ${activeCode}
      </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 leading-normal">
      {/* Top Navigation Frame */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onResetDeveloperSandbox={handleResetSandbox}
        completedCount={completedChallenges.length}
        totalChallenges={8}
      />

      {/* Main Core Playground Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-stretch gap-6 min-h-0">
        <div id="playground-grid" className="flex flex-col lg:flex-row gap-6 items-stretch flex-1 min-h-0">
          
          {/* Workspace Tabs Router */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {currentTab === "sandbox" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1 min-h-0">
                {/* Visual control & Code Input Column */}
                <div className="md:col-span-6 flex flex-col gap-5 min-h-0">
                  
                  {/* Codice Editor Board */}
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col flex-grow">
                    <div className="bg-slate-800/40 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
                        <span className="font-display font-semibold text-xs sm:text-xs text-slate-200">
                          Editor Codice Live (Tailwind)
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={handleCopyCodeAll}
                          className="px-2 py-1 text-[10px] font-bold text-slate-350 hover:text-white bg-slate-800 border border-slate-700/60 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3 w-3 text-sky-400" />
                              <span>Copiato!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copia</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex-grow relative">
                      <textarea
                        value={activeCode}
                        onChange={(e) => setActiveCode(e.target.value)}
                        className="w-full h-full custom-editor-textarea font-mono p-4 bg-slate-950 text-emerald-400 border-none outline-none resize-none focus:ring-0 min-h-[300px]"
                        placeholder="<!-- Inserisci qui il tuo HTML con le utility classes di Tailwind -->"
                      />
                    </div>
                  </div>

                  {/* Dynamic control inputs */}
                  <VisualConfigurator
                    activeCode={activeCode}
                    onChangeCode={setActiveCode}
                  />
                </div>

                {/* Live Preview Column */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-2xl flex-grow flex flex-col min-h-[350px]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-850 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-ping"></div>
                        <span className="font-display font-semibold text-xs text-slate-200">
                          Anteprima Istantanea (Isolated Frame)
                        </span>
                      </div>

                      {/* Viewports resizing keys */}
                      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-shrink-0">
                        <button
                          onClick={() => setViewportWidth("375px")}
                          title="Mobile (375px)"
                          className={`p-1.5 rounded-lg transition ${
                            viewportWidth === "375px" ? "bg-slate-800 text-slate-100 shadow-sm" : "text-slate-450 hover:text-slate-200"
                          } cursor-pointer`}
                        >
                          <Smartphone className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setViewportWidth("768px")}
                          title="Tablet (768px)"
                          className={`p-1.5 rounded-lg transition ${
                            viewportWidth === "768px" ? "bg-slate-800 text-slate-100 shadow-sm" : "text-slate-450 hover:text-slate-200"
                          } cursor-pointer`}
                        >
                          <Tablet className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setViewportWidth("100%")}
                          title="Desktop (Responsive)"
                          className={`p-1.5 rounded-lg transition ${
                            viewportWidth === "100%" ? "bg-slate-800 text-slate-100 shadow-sm" : "text-slate-450 hover:text-slate-200"
                          } cursor-pointer`}
                        >
                          <Monitor className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Zoom modifiers */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                          className="p-1 border border-slate-800 bg-slate-950 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer transition-all"
                        >
                          <ZoomOut className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono text-[10px] text-slate-400 font-bold w-12 text-center select-none">
                          {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                          onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.25))}
                          className="p-1 border border-slate-800 bg-slate-950 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer transition-all"
                        >
                          <ZoomIn className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Rendering Iframe wrapper with width controls */}
                    <div className="flex-grow flex items-center justify-center bg-slate-950/40 rounded-xl border border-slate-850 relative overflow-hidden min-h-[250px] p-2">
                      <div
                        style={{ 
                          width: viewportWidth, 
                          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: "center center"
                        }}
                        className="h-full bg-slate-950/80 rounded-lg border-4 border-slate-900 shadow-inner overflow-hidden flex flex-col shrink-0"
                      >
                        <iframe
                          title="Tailwind JIT dynamic previewer"
                          srcDoc={generateIframeSrcDoc()}
                          className="w-full h-full border-none bg-white flex-grow"
                          sandbox="allow-scripts"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === "lessons" && (
              <ChallengeCorriere
                completedChallenges={completedChallenges}
                onCompleteChallenge={handleCompleteChallenge}
                onLoadChallengeCode={handleLoadChallengeCode}
                onSetCurrentTab={setCurrentTab}
                activeCode={activeCode}
              />
            )}

            {currentTab === "library" && (
              <LibraryPanel
                onLoadIntoSandbox={handleLoadChallengeCode}
                onSetCurrentTab={setCurrentTab}
              />
            )}

            {currentTab === "help" && (
              <CheatSheetGrid
                onInsertClass={handleInsertClassAtCursor}
              />
            )}
          </div>

          {/* Persistent AI Tutor Panel Side Column */}
          {isAIPanelOpen ? (
            <div className="w-full lg:w-[360px] flex flex-col flex-shrink-0">
              <TutorPanel
                activeCode={activeCode}
                onApplyCode={setActiveCode}
              />
              <button
                onClick={() => setIsAIPanelOpen(false)}
                className="mt-2 text-center text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-all tracking-wide cursor-pointer uppercase"
              >
                Nascondi Tutor AI ✕
              </button>
            </div>
          ) : (
            <div className="flex items-start">
              <button
                onClick={() => setIsAIPanelOpen(true)}
                className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
                <span className="text-xs font-bold leading-none pr-1">Chiedi al Tutor AI</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Custom Iframe-Safe Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative space-y-4 animate-scale-up">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-100 text-sm">
                  Ripristinare il Workspace?
                </h3>
                <p className="font-mono text-[9px] text-red-400 font-bold uppercase tracking-wider">
                  Azione Irreversibile
                </p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Sei sicuro di voler ripristinare il tuo spazio di lavoro al modello predefinito di partenza? Questa azione cancellerà tutto l'HTML corrente nell'editor.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700/50 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  setActiveCode(DEFAULT_SANDBOX_CODE);
                  setShowResetModal(false);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl transition cursor-pointer shadow-lg shadow-red-500/10"
              >
                Sì, Ripristina
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
