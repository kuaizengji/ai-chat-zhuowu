const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const mimoApiKey = process.env.MIMO_API_KEY;
const mimoBaseUrl = (process.env.MIMO_BASE_URL || "https://api.xiaomimimo.com/v1").replace(/\/+$/, "");
const mimoModel = process.env.MIMO_MODEL || "mimo-v2.5-pro";
const systemPrompt =
  process.env.BOT_SYSTEM_PROMPT ||
  "你是卓语，一个会把复杂技术活讲成人话的深夜上线搭子，冷静、耐心、偶尔冒一点干幽默。回答自然、真诚、简洁。";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

function normalizeMessages(input) {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((message) => message && typeof message === "object")
    .map((message) => ({
      role: typeof message.role === "string" ? message.role.trim() : "",
      content: typeof message.content === "string" ? message.content.trim() : ""
    }))
    .filter((message) => {
      const validRole = ["user", "assistant", "system"].includes(message.role);
      return validRole && message.content.length > 0;
    });
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    port,
    hasKey: Boolean(mimoApiKey),
    model: mimoModel
  });
});

app.post("/api/chat", async (req, res) => {
  if (!mimoApiKey) {
    return res.status(500).json({
      error: "MIMO_API_KEY is missing. Create a .env file before calling /api/chat."
    });
  }

  const messages = normalizeMessages(req.body?.messages);

  if (messages.length === 0) {
    return res.status(400).json({
      error: "messages must be a non-empty array of { role, content } objects."
    });
  }

  const upstreamPayload = {
    model: mimoModel,
    messages: [{ role: "system", content: systemPrompt }, ...messages]
  };

  try {
    const upstreamResponse = await fetch(`${mimoBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mimoApiKey}`
      },
      body: JSON.stringify(upstreamPayload)
    });

    const data = await upstreamResponse.json().catch(() => ({}));

    if (!upstreamResponse.ok) {
      return res.status(502).json({
        error: "Upstream MiMo API request failed.",
        status: upstreamResponse.status,
        detail: data
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || reply.trim().length === 0) {
      return res.status(502).json({
        error: "Upstream MiMo API returned no assistant reply.",
        detail: data
      });
    }

    return res.json({
      reply,
      usage: data?.usage ?? null
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to reach MiMo API.",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (require.main === module) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

module.exports = {
  app,
  normalizeMessages
};
