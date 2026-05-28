import { useState, useEffect } from "react";
import { CheckCircle2, Lock, Play, Trophy, HelpCircle, ChevronRight, RefreshCw, XCircle } from "lucide-react";
import { CHALLENGES } from "../data";
import { Challenge } from "../types";

interface ChallengeCorriereProps {
  completedChallenges: number[];
  onCompleteChallenge: (id: number) => void;
  onLoadChallengeCode: (code: string) => void;
  onSetCurrentTab: (tab: string) => void;
  activeCode: string;
}

export default function ChallengeCorriere({
  completedChallenges,
  onCompleteChallenge,
  onLoadChallengeCode,
  onSetCurrentTab,
  activeCode
}: ChallengeCorriereProps) {
  const [selectedChallengeId, setSelectedChallengeId] = useState<number>(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    missingClasses: string[];
    checked: boolean;
  }>({ success: false, missingClasses: [], checked: false });

  const activeChallenge = CHALLENGES.find((c) => c.id === selectedChallengeId) || CHALLENGES[0];

  // Run validation on demand or automatic
  const handleValidate = () => {
    const required = activeChallenge.validators.requiredClasses;
    const missing: string[] = [];

    required.forEach((cls) => {
      // Create flexible validator logic, check if substrings exist
      if (!activeCode.toLowerCase().includes(cls.toLowerCase())) {
        missing.push(cls);
      }
    });

    // Check optional custom validator
    let customPass = true;
    if (activeChallenge.validators.customValidator) {
      customPass = activeChallenge.validators.customValidator(activeCode);
    }

    const isSuccess = missing.length === 0 && customPass;

    setValidationResult({
      success: isSuccess,
      missingClasses: missing,
      checked: true
    });

    if (isSuccess && !completedChallenges.includes(activeChallenge.id)) {
      onCompleteChallenge(activeChallenge.id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  useEffect(() => {
    // Reset checked status when active code or selected challenge changes
    setValidationResult({ success: false, missingClasses: [], checked: false });
  }, [selectedChallengeId, activeCode]);

  const handleStartChallenge = (challenge: Challenge) => {
    onLoadChallengeCode(challenge.startingCode);
    onSetCurrentTab("sandbox");
  };

  const completedCount = completedChallenges.length;
  const isCompleted = completedChallenges.includes(activeChallenge.id);

  return (
    <div className="space-y-6">
      {/* Academy Intro Banner */}
      <div className="bg-slate-900 border border-slate-805 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Scuola di Tailwind (Academy)
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mt-4 text-slate-100">
              Impara a colpi di Codice
            </h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed max-w-xl">
              Risolvi sfide di stile interattive direttamente nel browser. Modifica il codice sandbox e clicca verifica per misurare il tuo progresso di apprendimento!
            </p>
          </div>
          <div className="bg-slate-950/60 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 border border-slate-800/80 flex-shrink-0 shadow-lg">
            <Trophy className="h-10 w-10 text-sky-400 animate-bounce" />
            <div>
              <p className="text-[10px] font-bold uppercase text-sky-400">Il tuo punteggio:</p>
              <p className="text-xl font-extrabold font-display text-slate-105">
                {completedCount} / {CHALLENGES.length} Risolti
              </p>
              {completedCount === CHALLENGES.length && (
                <span className="text-[10px] font-bold text-sky-400 animate-pulse block mt-0.5">🏆 CAMPIONE TAILWIND!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation panel of challenges */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2 lg:col-span-1">
          <h3 className="font-bold text-slate-200 text-xs px-2 mb-3 uppercase tracking-wider">
            Percorso Educativo (Italiano)
          </h3>
          <div className="space-y-1.5">
            {CHALLENGES.map((ch, idx) => {
              const isChDone = completedChallenges.includes(ch.id);
              const isSelected = selectedChallengeId === ch.id;

              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChallengeId(ch.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-sky-500 bg-sky-500/10 text-sky-300 font-semibold"
                      : "border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isChDone ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-sky-400 flex-shrink-0" />
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                        {idx + 1}
                      </div>
                    )}
                    <span className="text-xs truncate">{ch.title}</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      ch.difficulty === "Facile"
                        ? "bg-slate-905 border border-slate-800/60 text-slate-400"
                        : ch.difficulty === "Medio"
                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {ch.difficulty}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Challenge Details & Interactive verification */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 lg:col-span-2 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-4">
            <div>
              <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-bold uppercase px-2 py-1 rounded-md">
                Modulo {activeChallenge.category}
              </span>
              <h2 className="text-lg font-display font-bold text-slate-100 mt-2">
                {activeChallenge.title}
              </h2>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
                Completato!
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-455 uppercase tracking-wider">OBIETTIVO SFIDA</h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
              <p className="text-xs text-slate-350 leading-relaxed">
                {activeChallenge.description}
              </p>
              <div className="mt-3 text-xs text-slate-450 border-t border-slate-855 pt-3">
                <span className="font-bold text-slate-200 block mb-1">Criterio d'Uscita Visivo:</span>
                {activeChallenge.targetMockupDesc}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-455 uppercase tracking-wider">SUGGERIMENTI UTILI</h4>
            <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-400 leading-relaxed">
              {activeChallenge.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </div>

          {/* Verification section */}
          <div className="border-t border-slate-850 pt-5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div>
                <span className="font-mono text-[10px] text-slate-450 block">Stato del Sandbox Attivo</span>
                <span className="text-xs font-bold text-sky-400">
                  Verifica l'HTML attualmente caricato nell'editor di testo.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartChallenge(activeChallenge)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer border border-slate-700/50"
                >
                  Carica Codice Iniziale
                </button>
                <button
                  onClick={handleValidate}
                  className="px-5 py-2 bg-sky-550 hover:bg-sky-400 text-slate-950 text-xs font-black rounded-xl cursor-pointer shadow-lg shadow-sky-510/15 transition-all"
                >
                  Controlla Soluzione
                </button>
              </div>
            </div>

            {/* Validation Feedback Boxes */}
            {validationResult.checked && (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed transition-all ${
                  validationResult.success
                    ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                    : "bg-red-950/20 border-red-900/30 text-red-400"
                }`}
              >
                {validationResult.success ? (
                  <div className="space-y-1">
                    <p className="font-bold text-slate-100">✨ Grandioso! Sfida Superata!</p>
                    <p className="text-slate-350">Hai inserito correttamente tutte le classi richieste per questa lezione. Continua con il prossimo capitolo per espandere il tuo stile!</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-bold text-rose-400">🚨 Manca Qualcosa!</p>
                    <p className="text-slate-350 mb-2">Le seguenti classi o requisiti richiesti non sono soddisfatti nell'HTML attivo dell'editor:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {validationResult.missingClasses.map((cl) => (
                        <span key={cl} className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[10px]">
                          {cl}*
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
