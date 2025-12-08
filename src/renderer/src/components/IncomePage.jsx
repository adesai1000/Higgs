import React, { useState } from "react";
import { load, save } from "../../../data/repo";

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
    const income = {
      id: "inc" + Date.now(),
      date,
      amountCents: Math.round(parseFloat(amount) * 100),
      source,
      note,
    };

    data.incomes.push(income);

    const month = date.slice(0, 7);
    if (!data.monthly[month]) {
      data.monthly[month] = {
        incomeCents: 0,
        expenseCents: 0,
        netWorthCents: 0,
        byCategory: {},
      };
    }

    data.monthly[month].incomeCents += income.amountCents;

    // Save and tell App to refresh
    save(data);
    onAdded();

    // Clear form
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
