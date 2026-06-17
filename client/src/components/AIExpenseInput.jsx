import { useState } from 'react';
import axios from 'axios';

export default function AIExpenseInput({ onAdd }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/api/expenses/parse', { text });
      onAdd(res.data);
      setText('');
    } catch (err) {
      setError('Could not understand that. Try something like "spent 200 on coffee".');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Try: "Paid 450 for groceries today"'
        style={{ width: '100%', padding: '10px', fontSize: '14px', boxSizing: 'border-box' }}
      />
      <button type="submit" disabled={loading} style={{ marginTop: '8px', padding: '8px 16px' }}>
        {loading ? 'Parsing...' : 'Add with AI'}
      </button>
      {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
    </form>
  );
}