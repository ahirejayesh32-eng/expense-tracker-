export default function ExpenseList({ expenses, onDelete }) {
    if (expenses.length === 0) {
      return <p style={{ color: '#888' }}>No expenses yet. Add one above.</p>;
    }
  
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '8px' }}>Date</th>
            <th style={{ padding: '8px' }}>Category</th>
            <th style={{ padding: '8px' }}>Description</th>
            <th style={{ padding: '8px' }}>Amount</th>
            <th style={{ padding: '8px' }}></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{e.date}</td>
              <td style={{ padding: '8px' }}>{e.category}</td>
              <td style={{ padding: '8px' }}>{e.description}</td>
              <td style={{ padding: '8px' }}>₹{Number(e.amount).toFixed(2)}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => onDelete(e.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }