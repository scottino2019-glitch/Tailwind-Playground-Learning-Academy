import { useState, useEffect } from "react";
import { Sliders, HelpCircle, Layers, Paintbrush, SquareDot, Layout } from "lucide-react";

interface VisualConfiguratorProps {
  activeCode: string;
  onChangeCode: (newCode: string) => void;
}

export default function VisualConfigurator({ activeCode, onChangeCode }: VisualConfiguratorProps) {
  // Config state representing currently selected properties in the active element
  const [paddingX, setPaddingX] = useState("px-4");
  const [paddingY, setPaddingY] = useState("py-2");
  const [rounded, setRounded] = useState("rounded-lg");
  const [bgColor, setBgColor] = useState("bg-blue-600");
  const [textColor, setTextColor] = useState("text-white");
  const [shadow, setShadow] = useState("shadow-md");
  const [border, setBorder] = useState("border-none");
  const [borderCol, setBorderCol] = useState("border-slate-300");

  // Synchronize state back from HTML code if possible (Basic Parser)
  useEffect(() => {
    // Scan class group matches in the first HTML tag to sync sliders if found
    const classMatch = activeCode.match(/class=["']([^"']*)["']/);
    if (classMatch && classMatch[1]) {
      const classes = classMatch[1].split(/\s+/);
      
      const px = classes.find((c) => c.startsWith("px-"));
      if (px) setPaddingX(px);

      const py = classes.find((c) => c.startsWith("py-"));
      if (py) setPaddingY(py);

      const rd = classes.find((c) => c.startsWith("rounded"));
      if (rd) setRounded(rd);

      const bg = classes.find((c) => c.startsWith("bg-") && !c.includes("opacity") && !c.includes("gradient"));
      if (bg) setBgColor(bg);

      const tx = classes.find((c) => c.startsWith("text-") && !c.includes("center") && !c.includes("left") && !c.includes("right"));
      if (tx) setTextColor(tx);

      const sh = classes.find((c) => c.startsWith("shadow"));
      if (sh) setShadow(sh);

      const bd = classes.find((c) => c === "border" || c.startsWith("border-") && !c.startsWith("border-slate") && !c.startsWith("border-violet") && !c.startsWith("border-pink") && !c.startsWith("border-emerald"));
      if (bd) setBorder(bd);

      const bdc = classes.find((c) => c.startsWith("border-slate") || c.startsWith("border-violet") || c.startsWith("border-pink") || c.startsWith("border-emerald"));
      if (bdc) setBorderCol(bdc);
    }
  }, [activeCode]);

  // Regenerate class string inside HTML on change
  const applyClassUpdate = (updates: {
    paddingX?: string;
    paddingY?: string;
    rounded?: string;
    bgColor?: string;
    textColor?: string;
    shadow?: string;
    border?: string;
    borderCol?: string;
  }) => {
    // Merge updates with current states
    const px = updates.paddingX !== undefined ? updates.paddingX : paddingX;
    const py = updates.paddingY !== undefined ? updates.paddingY : paddingY;
    const rd = updates.rounded !== undefined ? updates.rounded : rounded;
    const bg = updates.bgColor !== undefined ? updates.bgColor : bgColor;
    const tx = updates.textColor !== undefined ? updates.textColor : textColor;
    const sh = updates.shadow !== undefined ? updates.shadow : shadow;
    const bd = updates.border !== undefined ? updates.border : border;
    const bdc = updates.borderCol !== undefined ? updates.borderCol : borderCol;

    // Retrieve active tags class segment
    const classRegex = /class=["']([^"']*)["']/;
    const classMatch = activeCode.match(classRegex);

    if (classMatch && classMatch[0]) {
      const originalClasses = classMatch[1].split(/\s+/);
      
      // Filter out old categories
      const filtered = originalClasses.filter((c) => {
        return (
          !c.startsWith("px-") &&
          !c.startsWith("py-") &&
          !c.startsWith("rounded") &&
          !(c.startsWith("bg-") && !c.includes("opacity") && !c.includes("gradient")) &&
          !(c.startsWith("text-") && !c.includes("center") && !c.includes("left") && !c.includes("right") && !c.includes("xs") && !c.includes("sm") && !c.includes("base") && !c.includes("lg") && !c.includes("xl") && !c.includes("xx")) &&
          !c.startsWith("shadow") &&
          !(c === "border" || (c.startsWith("border-") && !c.startsWith("border-slate") && !c.startsWith("border-violet") && !c.startsWith("border-pink") && !c.startsWith("border-emerald") && !c.includes("style"))) &&
          !(c.startsWith("border-slate") || c.startsWith("border-violet") || c.startsWith("border-pink") || c.startsWith("border-emerald"))
        );
      });

      // Construct list of classes to append
      const toAdd = [px, py, rd, bg, tx, sh];
      if (bd && bd !== "border-none") toAdd.push(bd);
      if (bd && bd !== "border-none" && bdc) toAdd.push(bdc);

      const finalClasses = [...filtered, ...toAdd].filter(Boolean).join(" ");
      const newCode = activeCode.replace(classRegex, `class="${finalClasses}"`);
      
      onChangeCode(newCode);
    } else {
      // No class segment found, create basic initial class wrap on the outer element
      const firstTagRegex = /<([a-zA-Z0-9]+)/;
      const match = activeCode.match(firstTagRegex);
      if (match && match[0]) {
        const toAdd = [px, py, rd, bg, tx, sh];
        if (bd !== "border-none") toAdd.push(bd);
        if (bd !== "border-none" && bdc) toAdd.push(bdc);

        const replacement = `${match[0]} class="${toAdd.filter(Boolean).join(" ")}"`;
        const newCode = activeCode.replace(firstTagRegex, replacement);
        onChangeCode(newCode);
      }
    }
  };

  const handleUpdate = (category: string, value: string) => {
    const fresh: any = {};
    if (category === "paddingX") { setPaddingX(value); fresh.paddingX = value; }
    if (category === "paddingY") { setPaddingY(value); fresh.paddingY = value; }
    if (category === "rounded") { setRounded(value); fresh.rounded = value; }
    if (category === "bgColor") { setBgColor(value); fresh.bgColor = value; }
    if (category === "textColor") { setTextColor(value); fresh.textColor = value; }
    if (category === "shadow") { setShadow(value); fresh.shadow = value; }
    if (category === "border") { setBorder(value); fresh.border = value; }
    if (category === "borderCol") { setBorderCol(value); fresh.borderCol = value; }

    applyClassUpdate(fresh);
  };

  // Color options
  const BG_COLORS = [
    { value: "bg-white", name: "Bianco" },
    { value: "bg-slate-100", name: "Grigio" },
    { value: "bg-slate-900", name: "Ardesia" },
    { value: "bg-red-500", name: "Rosso" },
    { value: "bg-amber-400", name: "Ambra" },
    { value: "bg-emerald-500", name: "Smeraldo" },
    { value: "bg-blue-600", name: "Blu" },
    { value: "bg-violet-600", name: "Viola" },
    { value: "bg-pink-500", name: "Rosa" },
  ];

  const TX_COLORS = [
    { value: "text-slate-900", name: "Scuro" },
    { value: "text-slate-500", name: "Grigio" },
    { value: "text-white", name: "Bianco" },
    { value: "text-red-600", name: "Rosso" },
    { value: "text-amber-600", name: "Ambra" },
    { value: "text-emerald-600", name: "Smeraldo" },
    { value: "text-blue-600", name: "Blu" },
    { value: "text-violet-600", name: "Viola" },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-5 shadow-2xl text-slate-250">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Sliders className="h-4.5 w-4.5 text-sky-450" />
        <h3 className="font-display font-bold text-slate-100 text-sm">
          Pannello di Interazione Visuale
        </h3>
      </div>
      
      <p className="text-[11px] text-slate-400 leading-normal">
        Modifica questi selettori rapidi. I tuoi valori aggiorneranno l'HTML del sandbox in corsa automatica!
      </p>

      <div className="space-y-4">
        {/* Row 1: Padding spacing sliders */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center justify-between">
            <span>Spaziatura Orizzontale (paddingX)</span>
            <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              {paddingX}
            </span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {["px-2", "px-4", "px-6", "px-8"].map((v) => (
              <button
                key={v}
                onClick={() => handleUpdate("paddingX", v)}
                className={`py-1 text-[10px] font-mono font-bold rounded-lg transition-all ${
                  paddingX === v ? "bg-sky-550 text-slate-950 shadow-md shadow-sky-550/15 font-black" : "bg-slate-950 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                } cursor-pointer`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center justify-between">
            <span>Spaziatura Verticale (paddingY)</span>
            <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              {paddingY}
            </span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {["py-2", "py-3", "py-4", "py-6"].map((v) => (
              <button
                key={v}
                onClick={() => handleUpdate("paddingY", v)}
                className={`py-1 text-[10px] font-mono font-bold rounded-lg transition-all ${
                  paddingY === v ? "bg-sky-550 text-slate-950 shadow-md shadow-sky-550/15 font-black" : "bg-slate-955 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                } cursor-pointer`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Border radius shapes */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center justify-between">
            <span>Smussamento Angoli (rounded)</span>
            <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              {rounded}
            </span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {["rounded-none", "rounded-md", "rounded-2xl", "rounded-full"].map((v) => (
              <button
                key={v}
                onClick={() => handleUpdate("rounded", v)}
                className={`py-1 text-[10px] font-mono font-semibold rounded-lg transition-all ${
                  rounded === v ? "bg-sky-550 text-slate-950 shadow-md shadow-sky-550/15 font-black" : "bg-slate-950 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                } cursor-pointer`}
              >
                {v.replace("rounded-", "").replace("rounded", "pill")}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Solid background colors */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center justify-between">
            <span>Sfondo Solido (bgColor)</span>
            <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              {bgColor}
            </span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {BG_COLORS.map((item) => (
              <button
                key={item.value}
                onClick={() => handleUpdate("bgColor", item.value)}
                title={item.name}
                className={`w-6 h-6 rounded-full border border-slate-750/80 relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110 ${
                  item.value === "bg-white" ? "bg-white" : item.value === "bg-slate-100" ? "bg-slate-100" : item.value === "bg-slate-900" ? "bg-slate-900" : item.value
                }`}
              >
                {bgColor === item.value && (
                  <span className={`w-2 h-2 rounded-full ${item.value === "bg-white" || item.value === "bg-slate-100" ? "bg-slate-950" : "bg-white"}`}></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Flat text colors */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center justify-between">
            <span>Colore Testo (textColor)</span>
            <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              {textColor}
            </span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {TX_COLORS.map((item) => (
              <button
                key={item.value}
                onClick={() => handleUpdate("textColor", item.value)}
                title={item.name}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                  textColor === item.value
                    ? "bg-sky-550 border-sky-550 text-slate-950 font-black shadow-md shadow-sky-550/15"
                    : "bg-slate-950 border-slate-800 text-slate-450 hover:bg-slate-800 hover:text-slate-200"
                } cursor-pointer`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Row 5: Shadows & Depth */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center justify-between">
            <span>Ombra (shadow)</span>
            <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              {shadow}
            </span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {["shadow-none", "shadow-sm", "shadow-md", "shadow-xl"].map((v) => (
              <button
                key={v}
                onClick={() => handleUpdate("shadow", v)}
                className={`py-1 text-[10px] font-semibold rounded-lg transition-all ${
                  shadow === v ? "bg-sky-550 text-slate-950 shadow-md shadow-sky-550/15" : "bg-slate-955 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                } cursor-pointer`}
              >
                {v === "shadow-none" ? "no shadow" : v.replace("shadow-", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Row 6: Outline Borders */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center justify-between">
            <span>Spessore Bordo (border)</span>
            <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              {border}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { val: "border-none", display: "Bordo No" },
              { val: "border", display: "Sottile" },
              { val: "border-4", display: "Spesso" },
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => handleUpdate("border", item.val)}
                className={`py-1 text-[10px] font-semibold rounded-lg transition-all ${
                  border === item.val ? "bg-sky-550 text-slate-950 shadow-md shadow-sky-550/15" : "bg-slate-950 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                } cursor-pointer`}
              >
                {item.display}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
