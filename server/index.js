require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');


const app = express();
const db = new Database('expenses.db');

app.use(cors());
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL
  )
`);

app.get('/api/expenses', (req, res) => {
  const rows = db.prepare('SELECT * FROM expenses ORDER BY date DESC').all();
  res.json(rows);
});

app.post('/api/expenses', (req, res) => {
  const { amount, category, description, date } = req.body;
  const stmt = db.prepare(
    'INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(amount, category, description, date);
  res.json({ id: result.lastInsertRowid, amount, category, description, date });
});

app.delete('/api/expenses/:id', (req, res) => {
  db.prepare('DELETE FROM expenses WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.post('/api/expenses/parse', async (req, res) => {
  const { text } = req.body;
  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: `Extract expense details from this message: "${text}"
Respond ONLY with valid JSON, no other text, in this exact format:
{"amount": number, "category": "Food|Transport|Bills|Shopping|Entertainment|Health|Other", "description": string, "date": "YYYY-MM-DD"}
Use today's date (${new Date().toISOString().split('T')[0]}) if no date is mentioned.`,
        stream: false,
      }),
    });

    const data = await ollamaRes.json();
    const raw = data.response.trim();
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());

    const stmt = db.prepare(
      'INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(parsed.amount, parsed.category, parsed.description, parsed.date);

    res.json({ id: result.lastInsertRowid, ...parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not parse expense. Try rephrasing.' });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));