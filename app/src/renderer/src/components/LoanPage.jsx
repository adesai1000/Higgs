import { useState } from "react";
import { load, save } from "../../../data/repo";
import { recalculateAllStats } from "../../../data/calculations";

export default function LoanPage({ onAdded }) {
  const [name, setName] = useState("");
  const [principalRemaining, setPrincipalRemaining] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !principalRemaining) {
      alert("Please fill Name and Principal Remaining.");
      return;
    }

    const data = load();
    if (!data) {
      alert("Error: No data found. Please refresh the app.");
      return;
    }

    const loan = {
      id: "loan" + Date.now(),
      name: name.trim(),
      principalRemainingCents: Math.round(parseFloat(principalRemaining) * 100),
      interestRate: interestRate ? parseFloat(interestRate) : null,
      note: note || null,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    // Ensure loans array exists
    if (!data.loans) {
      data.loans = [];
    }

    data.loans.push(loan);

    // Recalculate all monthly stats and net worth
    const updatedData = recalculateAllStats(data);
    save(updatedData);
    onAdded();

    setName("");
    setPrincipalRemaining("");
    setInterestRate("");
    setNote("");

    alert("Loan added!");
  }

  return (
    <div className="form-wrapper">
      <h2>Add Loan</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <label>Loan Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mortgage, Car Loan"
            />
          </div>

          <div className="form-col">
            <label>Principal Remaining (USD)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={principalRemaining}
              onChange={(e) => setPrincipalRemaining(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Interest Rate (%) (optional)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>

          <div className="form-col">
            <label>Note (optional)</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>

        <button type="submit">Add Loan</button>
      </form>
    </div>
  );
}
