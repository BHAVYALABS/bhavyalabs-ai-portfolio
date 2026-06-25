const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ reply: 'Method not allowed' });

  const { message } = req.body || {};
  if (!message) return res.status(400).json({ reply: 'No message provided' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ reply: 'API key not configured' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: 'You are the AI assistant for BHAVYA LABS — the personal portfolio of Bhavya, a student and builder focused on AI and web projects. Be friendly, concise, and enthusiastic. Projects: (1) AI Portfolio, (2) Study Copilot — upload PDFs and learn faster, (3) Future Project in development. Keep replies to 2-4 sentences.',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ reply: 'AI error: ' + data.error.message });

    const reply = data.content?.[0]?.text || 'No response generated.';
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ reply: 'Error: ' + err.message });
  }
}
