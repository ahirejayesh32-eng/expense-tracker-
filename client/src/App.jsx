import { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpenseForm from './components/AddExpenseForm';
import AIExpenseInput from './components/AIExpenseInput';
import ExpenseList from './components/ExpenseList';
import SpendingChart from './components/SpendingChart';

const API = 'http://localhost:3001/api';

export default function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`${API}/expenses`).then(r => setExpenses(r.data));
  }, []);

  const addExpense = async (data) => {
    const res = await axios.post(`${API}/expenses`, data);
    setExpenses(prev => [res.data, ...prev]);
  };

  const addAIExpense = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API}/expenses/${id}`);
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Expense tracker</h1>
      <AIExpenseInput onAdd={addAIExpense} />
      <AddExpenseForm onAdd={addExpense} />
      <SpendingChart expenses={expenses} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}