import React, { useState } from "react";
import { load, save } from "../../../data/repo";

export default function IncomeForm({ onAdded }) {
  const data = load();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newIncome = {
      id: "inc" + Date.now(),
      date,
      amountCents: Math.round(parseFloat(amount) * 100),
      source,
      note,
    };

    data.incomes.push(newIncome);

    const monthKey = date.slice(0, 7);
    if (!data.monthly[monthKey]) {
      data.monthly[monthKey] = {
        incomeCents: 0,
        expenseCents: 0,
        netWorthCents: 0,
        byCategory: {},
      };
    }

    data.monthly[monthKey].incomeCents += newIncome.amountCents;

    save(data);
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h3>Add Income</h3>

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

      <label>Source</label>
      <input value={source} onChange={(e) => setSource(e.target.value)} />

      <label>Note</label>
      <input value={note} onChange={(e) => setNote(e.target.value)} />

      <button type="submit">Add Income</button>
    </form>
  );
}
