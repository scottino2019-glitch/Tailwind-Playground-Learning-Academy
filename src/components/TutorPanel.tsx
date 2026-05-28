import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Terminal, Copy, Check, ArrowRight, BookOpen } from "lucide-react";
import { ChatMessage } from "../types";

interface TutorPanelProps {
  activeCode: string;
  onApplyCode: (newCode: string) => void;
}

export default function TutorPanel({ activeCode, onApplyCode }: TutorPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Ciao! Sono il tuo **Tutor AI di Tailwind CSS**.\n\nPosso aiutarti a:\n* **Spiegare** cosa fanno specifiche classi (es: `items-center justify-between p-6`).\n* **Risolvere problemi** (es: 'Perché la mia griglia non è responsiva?').\n* **Generare componenti** completi basati su una tua descrizione.\n\nScrivi una richiesta qui sotto o chiedimi di ottimizzare il codice attualmente nel tuo Sandbox!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [appliedIndex, setAppliedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: inputText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
          activeCode: activeCode
        })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: data.text || "Spiacenti, non sono riuscito a elaborare una risposta.",
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: "Oops! Non sono riuscito a connettermi al server dell'AI Tutor. Verifica se il server full-stack è avviato e se la chiave API di Gemini è stata aggiunta ai Secrets.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleApplyCode = (code: string, index: number) => {
    onApplyCode(code);
    setAppliedIndex(index);
    setTimeout(() => setAppliedIndex(null), 1500);
  };

  // Safe and fast client-side markdown formatter that splits out code chunks
  const renderFormattedContent = (text: string) => {
    const parts = text.split(/(```html[\s\S]*?```|```xml[\s\S]*?```|```[\s\S]*?```)/g);

    return parts.map((part, idx) => {
      // Check if this segment represents a Tailwind block sequence
      if (part.startsWith("```")) {
        const cleaned = part
          .replace(/^```html\n|^```xml\n|^```\n/, "")
          .replace(/```$/, "")
          .trim();

        const isSimpleHTML = cleaned.includes("<") && cleaned.includes(">");

        return (
          <div key={idx} className="my-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="font-mono text-[10px] font-bold text-slate-400 flex items-center gap-1.5 animate-pulse">
                <Terminal className="h-3.5 w-3.5 text-violet-400" />
                Sorgente Tailwind Consigliato
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopyCode(cleaned, idx)}
                  className="px-2 py-1 text-[9px] font-bold text-slate-300 hover:text-white hover:bg-slate-800 rounded transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <span className="text-emerald-400">✓ Copiato!</span>
                  ) : (
                    <>Copia</>
                  )}
                </button>
                {isSimpleHTML && (
                  <button
                    onClick={() => handleApplyCode(cleaned, idx)}
                    className="px-2 py-1 text-[9px] font-bold text-violet-400 hover:text-white bg-violet-600/20 hover:bg-violet-600 rounded transition flex items-center gap-1 cursor-pointer"
                  >
                    {appliedIndex === idx ? (
                      <span className="text-emerald-400">Generato!</span>
                    ) : (
                      <>Apri in Sandbox</>
                    )}
                  </button>
                )}
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-400 whitespace-pre">{cleaned}</pre>
          </div>
        );
      }

      // Simple Inline Markdown renderer: boldings and backticks
      return (
        <div key={idx} className="space-y-2 mt-1">
          {part.split("\n").map((line, lIdx) => {
            const trimmedLine = line.trim();
            // Handle List items
            if (trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ")) {
              return (
                <ul key={lIdx} className="list-disc pl-5 text-xs text-slate-700/90 leading-relaxed my-1">
                  <li>{formatInlineStyles(trimmedLine.substring(2))}</li>
                </ul>
              );
            }
            if (trimmedLine.match(/^\d+\.\s/)) {
              return (
                <ol key={lIdx} className="list-decimal pl-5 text-xs text-slate-700/90 leading-relaxed my-1">
                  <li>{formatInlineStyles(trimmedLine.replace(/^\d+\.\s/, ""))}</li>
                </ol>
              );
            }
            // Handle headings
            if (trimmedLine.startsWith("### ")) {
              return <h4 key={lIdx} className="text-sm font-bold text-slate-100 mt-4 mb-2">{formatInlineStyles(trimmedLine.substring(4))}</h4>;
            }
            if (trimmedLine.startsWith("## ")) {
              return <h3 key={lIdx} className="text-base font-bold text-sky-450 mt-4 mb-2">{formatInlineStyles(trimmedLine.substring(3))}</h3>;
            }

            return trimmedLine === "" ? (
              <div key={lIdx} className="h-1.5" />
            ) : (
              <p key={lIdx} className="text-xs sm:text-xs leading-relaxed text-slate-300">
                {formatInlineStyles(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  // Safe inline regex matcher for boldings and backticks
  const formatInlineStyles = (lineStr: string) => {
    // Regex matches inline backticks `class` and strong text **important**
    const parts = lineStr.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((sub, i) => {
      if (sub.startsWith("**") && sub.endsWith("**")) {
        return <strong key={i} className="text-white font-bold">{sub.slice(2, -2)}</strong>;
      }
      if (sub.startsWith("`") && sub.endsWith("`")) {
        return <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/80 font-mono text-[10px] text-sky-400">{sub.slice(1, -1)}</code>;
      }
      return sub;
    });
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[600px] flex-1">
      {/* Panel header details */}
      <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
          <div>
            <h3 className="font-display font-semibold text-xs sm:text-sm text-slate-100">
              Tutor & Designer AI
            </h3>
            <p className="font-mono text-[9px] text-sky-450 uppercase tracking-wider">
              Gemini model-agent
            </p>
          </div>
        </div>
      </div>

      {/* Messages layout stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <span className="text-[9px] font-bold text-slate-500 mb-1 px-1">
              {msg.role === "user" ? "Tu" : "Tutor AI"}
            </span>
            <div
              className={`p-3.5 rounded-2xl text-xs overflow-x-auto ${
                msg.role === "user"
                  ? "bg-sky-550 text-slate-950 shadow-md rounded-tr-none font-medium"
                  : "bg-slate-900 border border-slate-800 text-slate-100 shadow-sm rounded-tl-none"
              }`}
            >
              {renderFormattedContent(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start max-w-[85%] mr-auto">
            <span className="text-[9px] font-bold text-slate-500 mb-1 px-1">Tutor AI</span>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-2.5 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-200"></div>
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-300"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Il docente sta elaborando le risposte...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestive prompt quick starters */}
      <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-none flex-shrink-0">
        {[
          "Spiega il mio codice",
          "Crea un bottone con animazione hover",
          "Come centro un Div verticale?"
        ].map((promptText) => (
          <button
            key={promptText}
            onClick={() => setInputText(promptText)}
            className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-[10px] font-semibold text-slate-400 hover:text-sky-400 hover:border-sky-500/30 rounded-lg whitespace-nowrap transition cursor-pointer"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* Input container */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Chiedi spiegazioni o chiedi di generare layout..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:bg-slate-950 focus:border-sky-500 focus:ring-1 focus:ring-sky-950 outline-none transition"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !inputText.trim()}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-sky-550 hover:bg-sky-400 disabled:bg-slate-800 text-slate-950 transition shadow-md flex-shrink-0 cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
