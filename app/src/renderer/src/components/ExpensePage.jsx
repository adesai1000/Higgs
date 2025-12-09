import { useState, useEffect } from "react";
import { load, save } from "../../../data/repo";
import { recalculateAllStats } from "../../../data/calculations";

export default function ExpensePage({ onAdded }) {
  const data = load();
  const categories = data?.categories || [];

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0] || "");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0]);
    }
  }, [categories, category]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!date || !amount || !category) {
      alert("Please fill Date, Amount, and Category.");
      return;
    }

    const currentData = load();
    if (!currentData) {
      alert("Error: No data found. Please refresh the app.");
      return;
    }

    const exp = {
      id: "exp" + Date.now(),
      date,
      amountCents: Math.round(parseFloat(amount) * 100),
      category,
      note,
    };

    // Ensure expenses array exists
    if (!currentData.expenses) {
      currentData.expenses = [];
    }

    currentData.expenses.push(exp);

    // Recalculate all monthly stats and net worth
    const updatedData = recalculateAllStats(currentData);
    save(updatedData);
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
