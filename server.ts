import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Outfit Recommendations
  app.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { preferences, style } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the user's style preference: "${style}" and current preferences: "${preferences}", suggest 3 streetwear outfits from our brand "Bodwé Klodynn". For each outfit, provide a name, a list of items (Hoodie, T-Shirt, or Custom Wear), and a brief description of the vibe. Return the response in JSON format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } },
                vibe: { type: Type.STRING }
              },
              required: ["name", "items", "vibe"]
            }
          }
        }
      });

      res.json(JSON.parse(response.text || "[]"));
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to get AI recommendations" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
