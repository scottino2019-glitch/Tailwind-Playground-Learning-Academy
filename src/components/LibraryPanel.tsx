import { useState, useEffect } from "react";
import { Copy, Check, Terminal, LayoutDashboard, Compass, MousePointerClick, HelpCircle } from "lucide-react";
import { COMPONENT_CATEGORIES, PREBUILT_COMPONENTS } from "../data";
import { ComponentItem } from "../types";

interface LibraryPanelProps {
  onLoadIntoSandbox: (code: string) => void;
  onSetCurrentTab: (tab: string) => void;
}

export default function LibraryPanel({ onLoadIntoSandbox, onSetCurrentTab }: LibraryPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState("buttons");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredComponents = PREBUILT_COMPONENTS.filter(
    (comp) => comp.category === selectedCategory
  );

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleLoadAndRedirect = (code: string) => {
    onLoadIntoSandbox(code);
    onSetCurrentTab("sandbox");
  };

  return (
    <div className="space-y-6">
      {/* Visual Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Copy & Paste Boilerplates
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold mt-4 text-slate-100">
            Libreria di Componenti Pronti
          </h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Velocizza il tuo sviluppo! Copia blocchi di codice HTML elegantemente formattati o caricali direttamente nel sandbox interattivo per studiarli, modificarli ed esercitarti.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Side Rails */}
        <div className="lg:col-span-1 flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 px-3.5 mb-1.5 uppercase tracking-wider">
            Sezioni & Layouts
          </span>
          {COMPONENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-sky-550 text-slate-950 shadow-md shadow-sky-550/15 font-bold"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-slate-800/80"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {cat.id === "buttons" && <MousePointerClick className="h-4 w-4" />}
                {cat.id === "cards" && <LayoutDashboard className="h-4 w-4" />}
                {cat.id === "forms" && <Terminal className="h-4 w-4" />}
                {cat.id === "navigation" && <Compass className="h-4 w-4" />}
                {cat.id === "sections" && <HelpCircle className="h-4 w-4" />}
                <span>{cat.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Display Grid of prebuilt components */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col hover:border-slate-700/80 transition-colors"
              >
                {/* Meta details */}
                <div className="p-5 border-b border-slate-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-900">
                  <div>
                    <h3 className="font-display font-bold text-slate-100 text-sm sm:text-base">
                      {comp.name}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">{comp.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleCopy(comp.id, comp.code)}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      {copiedId === comp.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-sky-400" />
                          <span>Copiato!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copia Codice</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleLoadAndRedirect(comp.code)}
                      className="px-3.5 py-1.5 rounded-lg bg-sky-550 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-sky-500/10"
                    >
                      Apri nel Sandbox
                    </button>
                  </div>
                </div>

                {/* Live Static Preview container */}
                <div className="p-8 bg-slate-950/65 flex items-center justify-center border-b border-slate-850 min-h-48 overflow-y-auto">
                  <div className="w-full max-w-full flex justify-center py-4">
                    {/* Render with unrolled raw HTML inside viewport */}
                    <div
                      dangerouslySetInnerHTML={{ __html: comp.code }}
                      className="w-full flex justify-center"
                    />
                  </div>
                </div>

                {/* Expandable Class Viewer */}
                <div className="p-4 bg-slate-950 font-mono text-[11px] text-slate-400 max-h-36 overflow-y-auto max-w-full border-t border-slate-850">
                  <span className="text-slate-500 font-bold block mb-1 uppercase tracking-wide text-[10px]">Struttura HTML & Class:</span>
                  <pre className="whitespace-pre-wrap text-emerald-400 break-words">{comp.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
