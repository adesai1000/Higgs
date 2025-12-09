import { useState } from "react";
import { load, save } from "../../../data/repo";

export default function ExpensePage({ onAdded }) {
  const { categories } = load();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!date || !amount) {
      alert("Please fill Date and Amount.");
      return;
    }

    const data = load();

    const exp = {
      id: "exp" + Date.now(),
      date,
      amountCents: Math.round(parseFloat(amount) * 100),
      category,
      note,
    };

    data.expenses.push(exp);
    const month = date.slice(0, 7);

    if (!data.monthly[month]) {
      data.monthly[month] = {
        incomeCents: 0,
        expenseCents: 0,
        netWorthCents: 0,
        byCategory: {},
      };
    }

    data.monthly[month].expenseCents += exp.amountCents;
    data.monthly[month].byCategory[category] =
      (data.monthly[month].byCategory[category] || 0) + exp.amountCents;

    save(data);

    onAdded();

    setDate("");
    setAmount("");
    setNote("");

    alert("Expense added!");
  }

  return (
    <div className="form-wrapper">
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-col">
            <label>Amount (USD)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-col">
            <label>Note (optional)</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
