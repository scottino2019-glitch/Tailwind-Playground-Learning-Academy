import { Challenge, ComponentCategory, ComponentItem, CheatSheetGroup } from "./types";

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "1. I Primi Passi",
    difficulty: "Facile",
    category: "Colori",
    description: "Impara i fondamentali del colore di sfondo, del colore del testo e degli angoli smussati. Crea un pulsante classico che attiri l'attenzione.",
    targetMockupDesc: "Crea un pulsante con sfondo blu acceso, testo bianco e angoli smussati (arrotondati).",
    startingCode: `<button class="">\n  Cliccami!\n</button>`,
    hints: [
      "Usa bg-blue-600 per impostare lo sfondo blu primario.",
      "Aggiungi text-white per far risaltare il testo.",
      "Usa rounded per arrotondare leggermente gli angoli (oppure rounded-lg o rounded-full)."
    ],
    validators: {
      requiredClasses: ["bg-blue-", "text-white", "rounded"]
    }
  },
  {
    id: 2,
    title: "2. Dimensioni e Spazi (Padding & Margini)",
    difficulty: "Facile",
    category: "Spaziatura",
    description: "Il trucco per un design professionale risiede nello spazio negativo. Un pulsante vuoto non va bene: diamogli 'respiro' spingendo il testo all'interno.",
    targetMockupDesc: "Regola il pulsante precedente applicando una spaziatura orizzontale generosa e una spaziatura verticale moderata.",
    startingCode: `<button class="bg-indigo-600 text-white rounded-md">\n  Pulsante Spaziato\n</button>`,
    hints: [
      "Usa px-X (es: px-6) per il padding orizzontale a sinistra e destra.",
      "Usa py-Y (es: py-3) per il padding verticale in alto e in basso.",
      "Puoi anche sperimentare con p-4 per dare padding uniforme."
    ],
    validators: {
      requiredClasses: ["px-", "py-"]
    }
  },
  {
    id: 3,
    title: "3. Interazioni Dinamiche (Stati & Hover)",
    difficulty: "Medio",
    category: "Stati & Hover",
    description: "Rendi viva l'interfaccia dando feedback immediato all'utente! Facciamo in modo che il pulsante si scurisca quando ci passa sopra il mouse e mostri una morbida transizione.",
    targetMockupDesc: "Crea un pulsante con colore di base verde, effetto hover che scurisce il verde, e transizione animata fluida.",
    startingCode: `<button class="bg-emerald-500 text-white px-5 py-2.5 rounded-lg">\n  Passami Sopra!\n</button>`,
    hints: [
      "Usa hover:bg-emerald-600 (o 700) per cambiare sfondo al passaggio del mouse.",
      "Aggiungi transition per abilitare gli effetti di transizione.",
      "Usa duration-300 o duration-200 per impostare la durata della transizione in millisecondi."
    ],
    validators: {
      requiredClasses: ["hover:bg-", "transition"]
    }
  },
  {
    id: 4,
    title: "4. Il Div Centrato (Flexbox)",
    difficulty: "Medio",
    category: "Flexbox",
    description: "La centratura è la sfida storica degli sviluppatori web. Con Tailwind e Flexbox, è questione di pochissime classi intuitive nel contenitore genitore.",
    targetMockupDesc: "Imposta il div contenitore esterno bluastro in modo che allinei perfettamente al centro sia in verticale che in orizzontale il cerchio bianco interno.",
    startingCode: `<div class="h-64 bg-slate-100 rounded-xl border border-slate-200">\n  <!-- Centra questo elemento all'interno di questo contenitore parent -->\n  <div class="w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-xs font-bold">\n    Centro\n  </div>\n</div>`,
    hints: [
      "Nel div contenitore esterno (riga 1), aggiungi flex per attivare Flexbox.",
      "Includi items-center per centrare l'allineamento sull'asse trasversale (verticale).",
      "Includi justify-center per centrare l'allineamento sull'asse principale (orizzontale)."
    ],
    validators: {
      requiredClasses: ["flex", "items-center", "justify-center"]
    }
  },
  {
    id: 5,
    title: "5. Griglia Responsiva (CSS Grid)",
    difficulty: "Medio",
    category: "Grid",
    description: "Impariamo a posizionare gli elementi in una griglia ordinata. Idealmente, vogliamo che su schermi piccoli (mobile) ci sia 1 sola colonna, e su schermi più grandi (desktop) se ne creino 3 affiancate.",
    targetMockupDesc: "Crea una griglia responsiva: di base ha 1 colonna, ma a partire dallo schermo medio (md) si trasforma in una griglia a 3 colonne con spaziature generose tra loro.",
    startingCode: `<div class="">\n  <div class="p-6 bg-rose-100 text-rose-800 rounded-lg text-center font-bold">Scheda 1</div>\n  <div class="p-6 bg-teal-100 text-teal-800 rounded-lg text-center font-bold">Scheda 2</div>\n  <div class="p-6 bg-amber-100 text-amber-800 rounded-lg text-center font-bold">Scheda 3</div>\n</div>`,
    hints: [
      "Nel div contenitore primario inserisci la classe grid per attivare CSS Grid.",
      "Consiglio: usa grid-cols-1 per il mobile (impostazione predefinita).",
      "Usa md:grid-cols-3 per ordinare 3 colonne da schermi medi in su.",
      "Imposta gap-4 o gap-6 per creare dello spazio elegante tra i box."
    ],
    validators: {
      requiredClasses: ["grid", "grid-cols-", "md:grid-cols-3", "gap-"]
    }
  },
  {
    id: 6,
    title: "6. Design Mooolto Scuro (Dark Mode)",
    difficulty: "Difficile",
    category: "Responsive",
    description: "In Tailwind, puoi gestire la dark mode in modo semplicissimo usando il prefisso dark:. Creiamo una card di profilo che cambia colore di sfondo e colore di testo a seconda del tema.",
    targetMockupDesc: "Crea una card che di giorno è a sfondo bianco con testo nero, ma sotto il tema scuro diventa a sfondo scuro (es: slate-900) con testo bianco o grigio chiaro.",
    startingCode: `<div class="p-6 rounded-2xl border border-slate-200 shadow-sm bg-white text-gray-900">\n  <h3 class="text-xl font-bold">Profilo Sviluppatore</h3>\n  <p class="mt-2 text-gray-600">Sperimento la modalità scura con Tailwind CSS in modo interattivo.</p>\n</div>`,
    hints: [
      "Utilizza dark:bg-slate-900 nel div contenitore per scurire lo sfondo quando la dark mode è attiva.",
      "Usa dark:text-white negli elementi testuali o nel contenitore.",
      "Usa dark:border-slate-800 per mimetizzare o scurire i bordi nel tema scuro."
    ],
    validators: {
      requiredClasses: ["dark:bg-", "dark:text-"]
    }
  },
  {
    id: 7,
    title: "7. Ombre, Bordi ed Effetti Speciali",
    difficulty: "Difficile",
    category: "Effetti",
    description: "Forniamo profondità e modernità. Le interfacce piatte sembrano obsolete, mentre una card tridimensionale morbida cattura subito l'attenzione.",
    targetMockupDesc: "Prendi una card semplice e conferiscile un'ombra profonda (shadow), un bordo color arcobaleno, e un effetto di ingrandimento (scale) coordinato con hover.",
    startingCode: `<div class="p-8 bg-white border rounded-3xl cursor-pointer">\n  <div class="text-3xl">🚀</div>\n  <h4 class="text-lg font-bold mt-2">Tecnologie Avanzate</h4>\n  <p class="text-sm text-gray-500 mt-1">Passa sopra col mouse per vedere la magia.</p>\n</div>`,
    hints: [
      "Aggiungi shadow-xl o shadow-2xl per un'ombra profonda ad alta definizione.",
      "Usa border-2 e border-violet-500 per colorare il contorno.",
      "Inserisci transition-all duration-300 hover:scale-105 per renderla reattiva al mouse."
    ],
    validators: {
      requiredClasses: ["shadow-", "hover:scale-", "transition"]
    }
  },
  {
    id: 8,
    title: "8. Card Profilo Utente Completa",
    difficulty: "Difficile",
    category: "Flexbox",
    description: "Mettiamo tutto insieme! Costruisci una card utente professionale con disposizione orizzontale dei contenuti, immagine del profilo arrotondata e un badge di stato agganciato.",
    targetMockupDesc: "Disponi gli elementi in riga (row) su desktop, usa un'immagine di profilo arrotondata allineata verticalmente, testi gerarchici e un badge verde d'attività.",
    startingCode: `<div class="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center gap-4 border border-slate-800 shadow-xl">\n  <div class="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-2xl font-bold text-slate-900">\n    SM\n  </div>\n  <div class="flex-1 text-center sm:text-left">\n    <div class="flex items-center justify-center sm:justify-start gap-2">\n      <h3 class="text-lg font-bold">Sofia Martello</h3>\n      <span class="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-full">\n        Online\n      </span>\n    </div>\n    <p class="text-slate-400 text-sm mt-1">UX/UI Designer & Tailwind Advocate</p>\n    <p class="text-xs text-slate-500 mt-2">Bologna, Italia</p>\n  </div>\n</div>`,
    hints: [
      "Ispeziona la struttura di questo stupendo componente.",
      "Per completare la sfida, modifica ad esempio il badge dandogli un'animazione pulsante (con animate-pulse) o cambia lo sfondo del cerchio in gradient (es: bg-gradient-to-tr from-amber-400 to-rose-500) per renderlo premium!",
      "Il tuo obiettivo è aggiungere almeno una classe di animazione (come animate-pulse, hover:scale-105 o un gradiente premium)."
    ],
    validators: {
      requiredClasses: ["bg-gradient-to-", "animate-pulse", "hover:", "transition"],
      // User can complete with either of these items
      customValidator: (code) => {
        return code.includes("animate-pulse") || code.includes("bg-gradient-to") || code.includes("hover:") || code.includes("shadow-2xl");
      }
    }
  }
];

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: "buttons",
    name: "Pulsanti & Badge",
    icon: "SquareDot",
    description: "Bottoni moderni, gradienti, pillole animate, badge di stato e notifiche."
  },
  {
    id: "cards",
    name: "Card & Bento",
    icon: "LayoutDashboard",
    description: "Griglie informative, profili utente, card prodotto e bento grids."
  },
  {
    id: "forms",
    name: "Form & Input",
    icon: "FileText",
    description: "Login compatti, caselle di contatto, filtri e checkbox personalizzati."
  },
  {
    id: "navigation",
    name: "Navigazione",
    icon: "Compass",
    description: "Menu di navigazione orizzontali, barre laterali e tab interattive."
  },
  {
    id: "sections",
    name: "Sezioni Hero",
    icon: "Image",
    description: "Sezioni principali d'impatto con testi, bottoni CTA e sfondi premium."
  }
];

export const PREBUILT_COMPONENTS: ComponentItem[] = [
  {
    id: "btn-gradient",
    name: "Neon Cosmic Pulse Button",
    category: "buttons",
    description: "Un pulsante premium con gradiente luminoso, ombra colorata e animazione d'impulso fluttuante su hover.",
    code: `<button class="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/45 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer">\n  Esplora Cosmo\n</button>`
  },
  {
    id: "btn-outline",
    name: "Minimalist Border Stroke",
    category: "buttons",
    description: "Pulsante moderno caratterizzato da contorno nitido, cambio di colore invertito morbido e leggera spaziatura letterale.",
    code: `<button class="px-6 py-2.5 font-medium tracking-wide text-slate-800 bg-transparent border-2 border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white active:scale-95 transition-all duration-200 cursor-pointer">\n  Scopri di Più\n</button>`
  },
  {
    id: "badge-pulse",
    name: "Live Pulse Indicator Badge",
    category: "buttons",
    description: "Disegna uno stato d'attività in tempo reale per monitoraggi o dashboard.",
    code: `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">\n  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>\n  Server Online\n</span>`
  },
  {
    id: "card-blog",
    name: "Card Profilo Tecnica (Bento Style)",
    category: "cards",
    description: "Card ideale per elenchi di post o bento layouts, con hover zoom guidato e tag colorati.",
    code: `<div class="max-w-sm overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">\n  <div class="relative h-48 bg-slate-900 overflow-hidden flex items-center justify-center">\n    <div class="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-rose-600/30"></div>\n    <div class="text-5xl group-hover:scale-110 transition-transform duration-300 select-none">🎨</div>\n  </div>\n  <div class="p-5">\n    <span class="inline-block px-2.5 py-0.5 text-xs font-bold text-violet-700 bg-violet-100 rounded-md">DESIGN</span>\n    <h3 class="mt-3 text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">La Rivoluzione di Tailwind v4</h3>\n    <p class="mt-2 text-sm text-slate-600">Scopri come il nuovo motore basato su Rust accelera la compilazione ed elimina le configurazioni JS pesanti.</p>\n    <div class="flex items-center gap-3 mt-4 border-t border-slate-100 pt-4">\n      <div class="w-8 h-8 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs">M</div>\n      <div>\n        <p class="text-xs font-bold text-slate-800">Marco Rossi</p>\n        <p class="text-[10px] text-slate-500">27 Maggio 2026</p>\n      </div>\n    </div>\n  </div>\n</div>`
  },
  {
    id: "card-pricing",
    name: "Glassmorphic Pricing Card",
    category: "cards",
    description: "Una card di abbonamento premium con effetti sfocati e bordo lucido neon.",
    code: `<div class="max-w-sm p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group">\n  <div class="absolute -right-10 -top-10 w-36 h-36 bg-violet-600/20 rounded-full blur-2xl group-hover:bg-violet-600/40 transition-colors duration-500"></div>\n  <div class="absolute -left-10 -bottom-10 w-36 h-36 bg-pink-600/20 rounded-full blur-2xl group-hover:bg-pink-600/40 transition-colors duration-500"></div>\n  <span class="px-3 py-1 text-xs font-bold tracking-wider text-violet-400 bg-violet-500/10 rounded-full uppercase">Punti Chiave</span>\n  <h3 class="mt-4 text-3xl font-extrabold text-white">Pro Creator</h3>\n  <p class="mt-2 text-sm text-slate-400">Ideale per designer professionisti e team agili.</p>\n  <div class="mt-6 flex items-baseline gap-1">\n    <span class="text-5xl font-black">$29</span>\n    <span class="text-sm text-slate-500">/mese</span>\n  </div>\n  <ul class="mt-6 space-y-3.5 text-sm text-slate-300">\n    <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Componenti Sincronizzati Illimitati</li>\n    <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Assistente Gemini Integrato</li>\n    <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Esportazione in React & Vue</li>\n    <li class="flex items-center gap-2"><span class="text-slate-500">✗</span> Supporto 24/7 Dedicato</li>\n  </ul>\n  <button class="w-full mt-8 py-3 px-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-200 hover:scale-[1.02] active:scale-95 transition-all text-center cursor-pointer">Inizia Gratis</button>\n</div>`
  },
  {
    id: "form-login",
    name: "Modern Floating Form",
    category: "forms",
    description: "Modulo di login scattante con input colorati su focus e bottoni di submit premium.",
    code: `<div class="w-full max-w-md p-8 bg-white rounded-2xl border border-slate-200 shadow-lg">\n  <h3 class="text-2xl font-bold text-slate-900 text-center">Bentornato!</h3>\n  <p class="text-sm text-slate-500 mt-1 text-center">Accedi ed esplora i tuoi prototipi salvati.</p>\n  <form class="mt-6 space-y-4" onsubmit="event.preventDefault()">\n    <div>\n      <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>\n      <input type="email" placeholder="test@esempio.com" class="w-full px-4 py-3 mt-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200" />\n    </div>\n    <div>\n      <div class="flex justify-between">\n        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>\n        <a href="#" class="text-xs text-violet-600 hover:underline">Dimenticata?</a>\n      </div>\n      <input type="password" placeholder="••••••••" class="w-full px-4 py-3 mt-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200" />\n    </div>\n    <button class="w-full py-3.5 mt-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer">Continua</button>\n  </form>\n</div>`
  },
  {
    id: "nav-elegant",
    name: "Responsive Floating Navbar",
    category: "navigation",
    description: "Sbarra di navigazione fluttuante, perfetta come intestazione di landing page.",
    code: `<nav class="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-md max-w-4xl mx-auto">\n  <div class="flex items-center gap-2">\n    <div class="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-white font-black text-xs">P</div>\n    <span class="font-bold tracking-tight text-slate-900">PixelFlow</span>\n  </div>\n  <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">\n    <a href="#" class="hover:text-violet-600 transition-colors">Home</a>\n    <a href="#" class="hover:text-violet-600 transition-colors bg-slate-100 rounded-full px-3 py-1">Caratteristiche</a>\n    <a href="#" class="hover:text-violet-600 transition-colors">Blog</a>\n    <a href="#" class="hover:text-violet-600 transition-colors">Prezzi</a>\n  </div>\n  <button class="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-full transition-all cursor-pointer">Inizia Ora</button>\n</nav>`
  },
  {
    id: "hero-split",
    name: "Interactive Split Hero Section",
    category: "sections",
    description: "Una splendida sezione centrale con gradiente di testo gigante, pulsanti d'azione affiancati e badge fluttuanti.",
    code: `<section class="px-6 py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white text-center">\n  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-violet-100 text-violet-800 uppercase animate-bounce">Nuova Release v4</span>\n  <h1 class="max-w-4xl mx-auto mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">\n    Realizza Interfacce Stradigitali con <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">Tailwind CSS</span>\n  </h1>\n  <p class="max-w-2xl mx-auto mt-6 text-lg text-slate-600 leading-relaxed">\n    Riduci la fatica del foglio di stile manuale. Utilizza classi flessibili e veloci direttamente nel tuo codice per dare forma al layout definitivo.\n  </p>\n  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">\n    <a href="#" class="w-full sm:w-auto px-8 py-4 font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-2xl shadow-lg shadow-violet-600/20 active:scale-95 transition-all text-center">Esplora Sandbox</a>\n    <a href="#" class="w-full sm:w-auto px-8 py-4 font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl active:scale-95 transition-all text-center">Documentazione</a>\n  </div>\n</section>`
  }
];

export const CHEAT_SHEET: CheatSheetGroup[] = [
  {
    name: "Spaziatura & Sizing",
    items: [
      {
        name: "Padding (Interno)",
        classes: ["p-2", "p-4", "p-8", "px-4", "py-2", "pt-6", "pb-4"],
        description: "Imposta lo spazio vuoto all'interno di un elemento rispetto ai propri bordi.",
        example: `<div class="bg-slate-100 p-6">Spazio all'interno</div>`
      },
      {
        name: "Margini (Esterno)",
        classes: ["m-2", "m-4", "mx-auto", "my-4", "mt-6", "mb-3", "-mt-4"],
        description: "Controlla lo spazio di stacco esterno tra elementi adiacenti.",
        example: `<div class="mt-8 bg-blue-100">Staccato di 2rem dal bordo superiore</div>`
      },
      {
        name: "Larghezza (Width)",
        classes: ["w-full", "w-1/2", "w-12", "w-64", "max-w-md", "min-w-0"],
        description: "Stabilisce le dimensioni dell'asse principale orizzontale.",
        example: `<div class="w-3/4 bg-teal-200">Largo 75%</div>`
      },
      {
        name: "Altezza (Height)",
        classes: ["h-12", "h-64", "h-full", "h-screen", "min-h-screen"],
        description: "Imposta l'altezza o dimensione sull'asse verticale.",
        example: `<div class="h-16 bg-pink-100">Altezza fissa 4rem</div>`
      }
    ]
  },
  {
    name: "Flexbox & Grid Layouts",
    items: [
      {
        name: "Display Flex",
        classes: ["flex", "flex-row", "flex-col", "flex-wrap", "flex-1"],
        description: "Layout flessibile lineare per distribuire elementi figli.",
        example: `<div class="flex flex-col gap-2"><div>Figlio A</div><div>Figlio B</div></div>`
      },
      {
        name: "Allineamenti",
        classes: ["items-center", "items-start", "justify-center", "justify-between", "gap-4"],
        description: "Distribuzione degli elementi e centratura lungo i due assi dei flex-containers.",
        example: `<div class="flex justify-between items-center bg-gray-100 p-2"><span>Sinistra</span><span>Destra</span></div>`
      },
      {
        name: "CSS Grid",
        classes: ["grid", "grid-cols-2", "grid-cols-3", "grid-cols-4", "md:grid-cols-3", "gap-6"],
        description: "Griglie bidimensionali avanzate e scalabili in modo responsivo.",
        example: `<div class="grid grid-cols-3 gap-2"><div class="bg-red-100">1</div><div class="bg-blue-100">2</div><div class="bg-green-100">3</div></div>`
      }
    ]
  },
  {
    name: "Colori, Sfondo & Bordi",
    items: [
      {
        name: "Sfondi (Background)",
        classes: ["bg-white", "bg-slate-900", "bg-blue-600", "bg-opacity-50", "bg-gradient-to-r"],
        description: "Modifica il colore o la miscela sfumata nel corpo dell'elemento.",
        example: `<div class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4">Sfumato</div>`
      },
      {
        name: "Bordi & Angoli (Border/Rounded)",
        classes: ["border", "border-2", "border-slate-300", "rounded", "rounded-xl", "rounded-full"],
        description: "Genera e colora pareti, modificando la curvatura degli angoli.",
        example: `<div class="border-2 border-dashed border-indigo-500 rounded-3xl p-4">Custom Border</div>`
      }
    ]
  },
  {
    name: "Tipografia & Testi",
    items: [
      {
        name: "Dimensione & Spessore",
        classes: ["text-xs", "text-sm", "text-base", "text-lg", "text-3xl", "text-6xl", "font-medium", "font-extrabold"],
        description: "Ritiene la gerarchia impostando la grandezza fisica ed il peso del carattere.",
        example: `<p class="text-2xl font-black text-rose-600">Titolo Enorme</p>`
      },
      {
        name: "Allineamento & Colore",
        classes: ["text-left", "text-center", "text-right", "text-gray-500", "text-violet-600", "leading-relaxed"],
        description: "Centra i paragrafi ed applica colori mirati o spaziature di linea.",
        example: `<p class="text-center text-slate-500 leading-loose">Visuale distesa</p>`
      }
    ]
  },
  {
    name: "Design & Ombre (Visual Premium)",
    items: [
      {
        name: "Ombre (Box Shadow)",
        classes: ["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-inner", "shadow-amber-500/10"],
        description: "Offre profondità fisica simulando la spaziatura dall'asse di fondo.",
        example: `<div class="shadow-2xl bg-white p-4 rounded-xl">Profondo</div>`
      },
      {
        name: "Filtri Sfocati (Glassmorphism)",
        classes: ["backdrop-blur-sm", "backdrop-blur-md", "backdrop-blur-lg", "bg-white/40"],
        description: "Effetto vetro traslucido se inserito sopra elementi sovrapposti.",
        example: `<div class="backdrop-blur-md bg-white/30 border border-white/20 p-4">Glass</div>`
      }
    ]
  }
];
