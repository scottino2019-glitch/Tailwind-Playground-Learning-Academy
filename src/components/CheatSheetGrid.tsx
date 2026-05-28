import { useState } from "react";
import { Search, Copy, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { CHEAT_SHEET } from "../data";
import { CheatSheetItem } from "../types";

interface CheatSheetGridProps {
  onInsertClass: (className: string) => void;
}

export default function CheatSheetGrid({ onInsertClass }: CheatSheetGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (className: string) => {
    navigator.clipboard.writeText(className);
    setCopiedText(className);
    setTimeout(() => setCopiedText(null), 1500);
  };

  // Filter items based on user search
  const filteredGroups = CHEAT_SHEET.map((group) => {
    const matchedItems = group.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.classes.some((cls) => cls.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return {
      ...group,
      items: matchedItems,
    };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6">
      {/* Intro search banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Dizionario di Tailwind CSS
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold mt-4 text-slate-100">
            Guida Rapida alle Classi Utility
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Filtra le classi principali per importarle istantaneamente nel tuo editor con un clic. Esplora dettagli, casi d'uso e visualizza esempi pratici in italiano.
          </p>

          {/* Search bar */}
          <div className="mt-6 flex items-center bg-slate-950 rounded-2xl px-4 py-2 text-slate-100 shadow-inner border border-slate-800 max-w-xl">
            <Search className="h-5 w-5 text-slate-500 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Cerca classi, categorie o parametri (es: padding, rounded, gap...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent outline-none border-none py-1.5 text-slate-150 placeholder:text-slate-500 focus:ring-0"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs bg-slate-900 border border-slate-805 hover:bg-slate-850 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 cursor-pointer transition-all"
              >
                Cancella
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="text-center p-12 bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            Nessuna classe trovata per "<strong>{searchTerm}</strong>". Prova con parole più generiche.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-5 space-y-4"
            >
              <h3 className="font-display font-bold text-slate-100 border-b border-slate-850 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-sky-400 rounded"></span>
                {group.name}
              </h3>

              <div className="space-y-4 divide-y divide-slate-850/80">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`pt-4 first:pt-0 flex flex-col space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-200">{item.name}</h4>
                      <span className="font-mono text-[10px] text-slate-505">esempio</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Classes quick inserts */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.classes.map((cls) => (
                        <div
                          key={cls}
                          className="group inline-flex items-center bg-slate-950 hover:bg-sky-500/5 border border-slate-800 hover:border-sky-500/20 rounded-lg pl-2.5 pr-1.5 py-1 text-[11px] font-mono text-slate-300 hover:text-sky-400 transition-all duration-150"
                        >
                          <span>{cls}</span>
                          <div className="flex items-center ml-2 border-l border-slate-800 pl-1.5 gap-1">
                            <button
                              onClick={() => handleCopy(cls)}
                              title="Copia"
                              className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
                            >
                              {copiedText === cls ? (
                                <CheckCircle2 className="h-3 w-3 text-sky-400" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                            <button
                              onClick={() => onInsertClass(cls)}
                              title="Inserisci nel Sandbox"
                              className="text-[10px] text-slate-500 hover:text-sky-400 font-bold ml-0.5 cursor-pointer text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Compact preview container of the element */}
                    <div className="mt-2 text-[10px] bg-slate-955 p-2.5 rounded-lg border border-slate-850 overflow-x-auto max-w-full shadow-inner">
                      <span className="font-mono text-slate-500 block mb-1">Codice:</span>
                      <pre className="font-mono text-emerald-400 leading-normal">{item.example}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
