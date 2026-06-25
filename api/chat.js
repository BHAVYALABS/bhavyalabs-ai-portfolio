export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: 'No message provided' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: `You are the AI assistant for BHAVYA LABS — the personal portfolio of Bhavya, a student and builder focused on AI and web projects. Be friendly, concise, and enthusiastic. Know that Bhavya's current projects are: (1) AI Portfolio — this website with AI assistant, (2) Study Copilot — upload PDFs and learn faster with AI Q&A, (3) Future Project — currently in development. Bhavya's focus is AI + Web, currently on Version 1.1. Keep replies short (2-4 sentences max).`,
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Anthropic error:', data.error);
      return res.status(500).json({ reply: 'AI error occurred.' });
    }

    const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response.';
    res.status(200).json({ reply });

  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ reply: 'Server error occurred.' });
  }
}
