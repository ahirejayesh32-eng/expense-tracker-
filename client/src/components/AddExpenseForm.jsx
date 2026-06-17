import { useState } from 'react';

export default function AddExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAdd({ amount: parseFloat(amount), category, description, date });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '8px', flex: '1 1 100px' }}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px' }}>
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Shopping</option>
        <option>Entertainment</option>
        <option>Health</option>
        <option>Other</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '8px', flex: '1 1 150px' }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
    </form>
  );
}