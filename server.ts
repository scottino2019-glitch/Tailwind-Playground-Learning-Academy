import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GenAI client to prevent crashing on boot if key is missing
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY non configurata o non valida nei Secrets di AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST Endpoint: AI Tutor and Design Assistant
app.post("/api/tutor", async (req, res) => {
  try {
    const { message, history, activeCode } = req.body;

    let ai;
    try {
      ai = getAI();
    } catch (keyErr: any) {
      // Return a graceful explanation in Italian if the key is missing
      return res.json({
        text: `**[Nota di Sistema]** L'API Key di Gemini non è ancora stata configurata nei Secrets del progetto in AI Studio.\n\nPer abilitare questo Tutor AI Interattivo di Tailwind:\n1. Fai clic sul menu **Settings** in alto a sinistra o sulla sezione **Secrets** dell'AI Studio.\n2. Aggiungi una chiave chiamata \`GEMINI_API_KEY\` con un token Gemini valido.\n3. Riavvia la sessione.\n\nNel frattempo, puoi comunque usare **tutte le altre funzionalità offline** come l'Editor Sandbox interattivo, Sliders di controllo visuale, la Libreria di Componenti già pronti e le Sfide di apprendimento guidate con correttore automatico completo!`,
        error: "Missing API Key"
      });
    }

    const systemInstruction = `Sei un Tutor esperto di Tailwind CSS, un docente e assistente di design carismatico ed empatico. Parli in italiano corretto, fluido ed incoraggiante.
Il tuo compito è aiutare lo studente ad imparare, sperimentare e comporre interfacce incredibili con Tailwind CSS (sia versione 3 che la nuovissima versione 4).

Regole di interazione:
1. Rispondi SEMPRE in italiano professionale, fresco e accessibile (evita tecnicismi estremi non spiegati).
2. Quando lo studente ti fa una domanda o ti invia del codice, analizzalo tecnicamente ma spiegalo in modo semplice.
3. Se l'utente chiede spiegazioni di classi, suddividile e spiega cosa fanno (es: 'flex' attiva flexbox, 'items-center' allinea gli elementi sull'asse verticale, ecc.).
4. Se propone del codice che non funziona (es. non centra un elemento, non fa wrap, ecc.), proponi la soluzione corretta spiegando la mossa chiave.
5. Includi SEMPRE blocchi di codice pulito racchiusi in tag markdown \`\`\`html ... \`\`\` evidenziando come copiare/inserire quel codice.
6. Se ricevi il parametro 'activeCode' (il codice attualmente presente nel suo editor sandbox), usalo come contesto diretto. Riferisciti ad esso dicendo cose come "Nel tuo editor attuale vedo che hai..." per far sentire lo studente guidato in tempo reale.
7. Mantieni le risposte scattanti, ben formattate in Markdown elegante, usando tabelle o elenchi puntati per spiegare le classi CSS di Tailwind.`;

    // Process conversion for contents sequence
    // Build chat structure conforming to Google GenAI structure
    const contents: any[] = [];
    
    // Convert history
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
    }

    // Append context of active sandbox code if exists
    let userPrompt = message;
    if (activeCode) {
      userPrompt = `Ecco il mio codice HTML attuale nel sandbox:\n\`\`\`html\n${activeCode}\n\`\`\`\n\nLa mia domanda o richiesta è:\n${message}`;
    }

    contents.push({
      role: "user",
      parts: [{ text: userPrompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Tutor Error:", error);
    res.status(500).json({ 
      text: `Spiacenti, si è verificato un errore durante la generazione della risposta. Dettagli: ${error.message || error}`,
      error: true 
    });
  }
});

// Start dev or production environment
async function init() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

init();
