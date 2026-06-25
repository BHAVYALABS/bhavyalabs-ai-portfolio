import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Claude AI proxy route — keeps API key hidden from frontend
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "No message provided." });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: `You are the AI assistant for BHAVYA LABS — the personal portfolio of Bhavya, a student and builder focused on AI and web projects. Be friendly, concise, and enthusiastic. Know that Bhavya's current projects are: (1) AI Portfolio — this website with AI assistant, (2) Study Copilot — upload PDFs and learn faster with AI Q&A, (3) Future Project — currently in development. Bhavya's focus is AI + Web, currently on Version 1.1. Keep replies short (2-4 sentences max).`,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Anthropic API error:", data.error);
      return res.status(500).json({ reply: "AI error occurred." });
    }

    const reply = data.content?.[0]?.text || "Sorry, I could not generate a response.";
    res.json({ reply });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ reply: "Server error occurred." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
