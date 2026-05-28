// Netlify Serverless Function per gestire il Tutor AI su Netlify senza bisogno di server Express dedicato.
import { GoogleGenAI } from "@google/genai";

export async function handler(event: any, context: any) {
  // Consenti solo richieste POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const { message, history, activeCode } = JSON.parse(event.body || "{}");

    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          text: `**[Nota di Netlify]** L'API Key di Gemini non è ancora configurata nei Secrets del tuo pannello Netlify.\n\nPer abilitare il Tutor AI:\n1. Vai sul tuo pannello **Netlify > Site settings > Environment variables**.\n2. Registra una nuova variabile chiamata \`GEMINI_API_KEY\` inserendo un token valido di Google Gemini.\n3. Riavvia il deploy del sito.\n\nNel frattempo, puoi usare le schede offline: Sandbox interattivo, Sliders di controllo visuale, la Libreria di Componenti pronti e tutte le Sfide di apprendimento con correttore automatico!`,
          error: "Missing API Key"
        })
      };
    }

    // Inizializza l'SDK ufficiale di Google GenAI
    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build-netlify"
        }
      }
    });

    const systemInstruction = `Sei un Tutor esperto di Tailwind CSS, un docente e assistente di design carismatico ed empatico. Parli in italiano corretto, fluido ed incoraggiante.
Il tuo compito è aiutare lo studente ad imparare, sperimentare e comporre interfacce incredibili con Tailwind CSS (sia versione 3 che la nuovissima versione 4).

Regole di interazione:
1. Rispondi SEMPRE in italiano professionale, fresco e accessibile (evita tecnicismi estremi non spiegati).
2. Quando lo studente ti fa una domanda o ti invia del codice, analizzalo tecnicamente ma spiegalo in modo semplice.
3. Se l'utente chiede spiegazioni di classi, suddividile e spiega cosa fanno.
4. Se propone del codice che non funziona, proponi la soluzione corretta spiegando la mossa chiave.
5. Includi SEMPRE blocchi di codice pulito racchiusi in tag markdown \`\`\`html ... \`\`\` per far sì che possa copiarlo nel Sandbox.
6. Se ricevi il parametro 'activeCode', usalo come contesto diretto. Riferisciti ad esso dicendo cose come "Nel tuo editor attuale vedo che hai..." per guidarlo in tempo reale.
7. Mantieni le risposte scattanti, ben formattate in Markdown elegante, usando tabelle o elenchi puntati per spiegare le classi CSS di Tailwind.`;

    const contents: any[] = [];
    
    // Converti la cronologia
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
    }

    // Aggiungi il codice del sandbox come contesto se presente
    let userPrompt = message;
    if (activeCode) {
      userPrompt = `Ecco il mio codice HTML attuale nel sandbox:\n\`\`\`html\n${activeCode}\n\`\`\`\n\nLa mia domanda o richiesta è:\n${message}`;
    }

    contents.push({
      role: "user",
      parts: [{ text: userPrompt }]
    });

    // Chiamata a Gemini 3.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7
      }
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ text: response.text })
    };
  } catch (error: any) {
    console.error("Netlify Function Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        text: `Spiacenti, errore nella funzione serverless di Netlify: ${error.message || error}`,
        error: true
      })
    };
  }
}
