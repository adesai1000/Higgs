import React, { useState } from "react";
import { load, save } from "../../../data/repo";

export default function ExpenseForm({ onAdded }) {
  const data = load();
  const categories = data.categories;

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!date || !amount) return;

    const newExpense = {
      id: "exp" + Date.now(),
      date,
      amountCents: Math.round(parseFloat(amount) * 100),
      category,
      note,
    };

    // Push into expenses array
    data.expenses.push(newExpense);

    // Update monthly rollup
    const monthKey = date.slice(0, 7);
    if (!data.monthly[monthKey]) {
      data.monthly[monthKey] = {
        incomeCents: 0,
        expenseCents: 0,
        netWorthCents:
          data.monthly[Object.keys(data.monthly).pop()].netWorthCents,
        byCategory: {},
      };
    }

    const m = data.monthly[monthKey];
    m.expenseCents += newExpense.amountCents;
    m.byCategory[category] =
      (m.byCategory[category] || 0) + newExpense.amountCents;

    save(data);
    onAdded(); // tell parent to refresh
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h3>Add Expense</h3>

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label>Amount (USD)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label>Note (optional)</label>
      <input value={note} onChange={(e) => setNote(e.target.value)} />

      <button type="submit">Add Expense</button>
    </form>
  );
}
