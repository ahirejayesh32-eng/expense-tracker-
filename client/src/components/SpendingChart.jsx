import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function SpendingChart({ expenses }) {
  if (expenses.length === 0) return null;

  const grouped = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([category, total]) => ({
    category,
    total: Math.round(total * 100) / 100,
  }));

  return (
    <div style={{ margin: '1.5rem 0', height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#0F6E56" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}