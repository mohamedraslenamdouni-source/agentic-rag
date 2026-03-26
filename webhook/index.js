const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple health
app.get('/', (req, res) => res.json({ ok: true }));

// Mock webhook endpoint to simulate a RAG response
app.post('/webhook', async (req, res) => {
  const { message, user } = req.body || {};

  // Very small mock of a RAG/generation pipeline
  const facts = [
    'You are capable of more than you think.',
    'Small steps lead to big change.',
    'Focus on what you can control today.',
    'Remember to breathe and be kind to yourself.'
  ];

  const reply = {
    user: user || 'anonymous',
    input: message || '',
    response: facts[Math.floor(Math.random() * facts.length)],
    timestamp: new Date().toISOString()
  };

  // simulate work
  await new Promise((r) => setTimeout(r, 400));

  res.json(reply);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Webhook listening on http://localhost:${port}`));
