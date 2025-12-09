import { useState } from "react";
import { load, save } from "../../../data/repo";
import { recalculateAllStats } from "../../../data/calculations";

export default function IncomePage({ onAdded }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!date || !amount || !source.trim()) {
      alert("Please fill Date, Amount, and Source.");
      return;
    }

    const data = load();
    if (!data) {
      alert("Error: No data found. Please refresh the app.");
      return;
    }

    const income = {
      id: "inc" + Date.now(),
      date,
      amountCents: Math.round(parseFloat(amount) * 100),
      source,
      note,
    };

    // Ensure incomes array exists
    if (!data.incomes) {
      data.incomes = [];
    }

    data.incomes.push(income);

    // Recalculate all monthly stats and net worth
    const updatedData = recalculateAllStats(data);
    save(updatedData);
    onAdded();

    setDate("");
    setAmount("");
    setSource("");
    setNote("");

    alert("Income added!");
  }

  return (
    <div className="form-wrapper">
      <h2>Add Income</h2>

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
            <label>Source</label>
            <input value={source} onChange={(e) => setSource(e.target.value)} />
          </div>

          <div className="form-col">
            <label>Note (optional)</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>

        <button type="submit">Add Income</button>
      </form>
    </div>
  );
}
