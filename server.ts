import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
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

// Ensure server endpoints are registered before Vite middleware
// 1. Lotto Analyzer endpoint
app.post("/api/lotto/analyze", async (req, res) => {
  const { country, game } = req.body;
  if (!country || !game) {
    return res.status(400).json({ error: "Country and game details are required." });
  }

  try {
    const ai = getGemini();
    const prompt = `You are an elite lotto statistician and mathematical analyst. 
Analyze the lottery game "${game}" of country "${country}".
Generate exactly 5 distinct higher-probability combinations of numbers (each ticket should fit the game rules of "${game}").
For example:
- Powerball: 5 numbers (1-69) and 1 Powerball (1-26). Format the extra ball as "PB: X".
- Lotto Max: 7 numbers (1-50).
- Super 6/49: 6 numbers (1-49).
- PCSO 6/58: 6 numbers (1-58).

Also provide a comprehensive analysis explaining:
1. The frequency distribution and parity ratio (odd/even balance).
2. The number sum range sweet spot.
3. Decades/groups representation in your selection.
Ensure the explanation sounds highly mathematical, professional, and is calculated specifically for this game.

Respond STRICTLY in JSON format with the following schema:
{
  "combinations": [
    ["num1", "num2", "num3", "num4", "num5", "optional extra label like PB: X"],
    ...
  ],
  "analysis": "A detailed 3-4 sentence professional mathematical analysis paragraph."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["combinations", "analysis"],
          properties: {
            combinations: {
              type: Type.ARRAY,
              description: "Array of exactly 5 combinations, where each combination is an array of strings or numbers representation of values.",
              items: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            analysis: {
              type: Type.STRING,
              description: "Expert statistical analysis report paragraph."
            }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("Lotto Analysis Error:", error);
    return res.status(500).json({ error: error.message || "Failed to analyze lottery data." });
  }
});

// 2. Brand Stylist and Social hooks endpoint
app.post("/api/stylist/hooks", async (req, res) => {
  const { rawText } = req.body;
  if (!rawText) {
    return res.status(400).json({ error: "Text prompt is required." });
  }

  try {
    const ai = getGemini();
    const prompt = `You are an elite viral brand strategist and social copywriter.
Take this target text/copy: "${rawText}"
Reframe and optimize it to produce three distinct hyper-optimized viral formats with high click-through rates.
1. TikTok/Reels: Use energetic, modern hook language, capitalizations, visual pauses, and trending hashtags. Include emojis.
2. Instagram Post: Elegant, storytelling form with structured line-breaks, a strong focal call to action, and strategic tags.
3. YouTube Short/Video Title & Hook: Extremely clickable, high-retention title format, plus a 1-sentence engaging description.

Respond STRICTLY in JSON format with the following schema:
{
  "tiktok": "TikTok optimized content",
  "instagram": "Instagram optimized description/post",
  "youtube": "YouTube optimized title and quick description"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["tiktok", "instagram", "youtube"],
          properties: {
            tiktok: { type: Type.STRING },
            instagram: { type: Type.STRING },
            youtube: { type: Type.STRING }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("Brand Stylist Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate hooks." });
  }
});

// 3. AI Smart QR Blender styling recommendations
app.post("/api/qr/blend", async (req, res) => {
  const { url, stylePrompt, colorAccent } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL or content is required." });
  }

  try {
    const ai = getGemini();
    const prompt = `You are a creative brand stylist and front-end designer.
We want to create a beautifully styled premium QR card based on:
URL/Content: "${url}"
Styling Prompt: "${stylePrompt || "futuristic holographic glowing cyberpunk"}"
Color Accent Suggestion: "${colorAccent || "Indigo"}"

Generate design tokens and styles that we can apply to style the QR Code container dynamically.
Suggest:
1. "themeName": An elegant theme name (e.g. Neon Cyberpunk, Royal Amber, Emerald Matrix).
2. "bgGradient": A Tailwind CSS gradient class string for the outer card (e.g., "from-slate-950 via-slate-900 to-indigo-950").
3. "glowColor": A soft glow hex or CSS colour class (e.g., "shadow-[0_0_20px_rgba(99,102,241,0.3)]").
4. "qrColor": The hex color suggested for the QR blocks (must be high-contrast, dark/rich enough to be highly scannable, e.g. "#6366f1").
5. "borderColor": Border color utility class (e.g., "border-indigo-500/30").
6. "brandIcon": A suggested icon descriptive keyword (e.g., "globe", "activity", "sparkles").
7. "styleTips": A short stylish brand card tagline (e.g., "Woven with holographic light, ready to scan").

Respond STRICTLY in JSON format with the following schema:
{
  "themeName": "Theme name",
  "bgGradient": "from-cls to-cls",
  "glowColor": "shadow-class",
  "qrColor": "#Hex",
  "borderColor": "border-class",
  "brandIcon": "iconKeyName",
  "styleTips": "Tagline"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["themeName", "bgGradient", "glowColor", "qrColor", "borderColor", "brandIcon", "styleTips"],
          properties: {
            themeName: { type: Type.STRING },
            bgGradient: { type: Type.STRING },
            glowColor: { type: Type.STRING },
            qrColor: { type: Type.STRING },
            borderColor: { type: Type.STRING },
            brandIcon: { type: Type.STRING },
            styleTips: { type: Type.STRING }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("QR Blender Design Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate blend styling." });
  }
});

// 4. AI Startup Generator endpoint
app.post("/api/startup/generate", async (req, res) => {
  const { description, preferredTld } = req.body;
  if (!description) {
    return res.status(400).json({ error: "Description or niche keyword is required." });
  }

  try {
    const ai = getGemini();
    const prompt = `You are a legendary tech-incubator partner, startup naming specialist, and marketing strategist.
Take this startup concept or keyword niche: "${description}"
Preferred Domain TLD: "${preferredTld || "Any (.com, .io, .ai)"}"

Generate exactly 5 highly unique, catchy, memorable startup business names. Each startup name must correspond to a highly creative domain name using the preferred TLD. 
Also provide a professional tagline, value proposition statement, target audience definition, and professional visual brand color recommendation for each.
Finally, write a 2-sentence market context overview for the specified space.

Respond STRICTLY in JSON format with the following schema:
{
  "ideas": [
    {
      "name": "Startup Name",
      "domain": "domain.com",
      "tagline": "Catchy tagline or slogan",
      "valueProp": "A compelling 1-sentence value proposition explaining why it excels.",
      "audience": "Specific defined target demographic.",
      "brandColors": "Description of the visual color theme (e.g. Deep charcoal with electric copper accents)."
    },
    ...
  ],
  "marketContext": "2-sentence professional analysis of market opportunity and trend vectors."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["ideas", "marketContext"],
          properties: {
            ideas: {
              type: Type.ARRAY,
              description: "Array of exactly 5 creative startup brand concepts.",
              items: {
                type: Type.OBJECT,
                required: ["name", "domain", "tagline", "valueProp", "audience", "brandColors"],
                properties: {
                  name: { type: Type.STRING },
                  domain: { type: Type.STRING },
                  tagline: { type: Type.STRING },
                  valueProp: { type: Type.STRING },
                  audience: { type: Type.STRING },
                  brandColors: { type: Type.STRING }
                }
              }
            },
            marketContext: {
              type: Type.STRING,
              description: "2-sentence expert market opportunity analysis summary."
            }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("Startup Generator Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate brand concepts." });
  }
});

// Setup Vite dev server or static distribution directories
async function startServer() {
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
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
