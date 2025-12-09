import { useState } from "react";
import { load, save } from "../../../data/repo";
import { recalculateAllStats } from "../../../data/calculations";

export default function InvestmentPage({ onAdded }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!symbol.trim() || !quantity || !buyPrice) {
      alert("Please fill Symbol, Quantity, and Buy Price.");
      return;
    }

    const data = load();
    if (!data) {
      alert("Error: No data found. Please refresh the app.");
      return;
    }

    const investment = {
      id: "inv" + Date.now(),
      symbol: symbol.trim().toUpperCase(),
      quantity: parseFloat(quantity),
      buyPriceCents: Math.round(parseFloat(buyPrice) * 100),
      note: note || null,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    // Ensure investments array exists
    if (!data.investments) {
      data.investments = [];
    }

    data.investments.push(investment);

    // Recalculate all monthly stats and net worth
    const updatedData = recalculateAllStats(data);
    save(updatedData);
    onAdded();

    setSymbol("");
    setQuantity("");
    setBuyPrice("");
    setNote("");

    alert("Investment added!");
  }

  return (
    <div className="form-wrapper">
      <h2>Add Investment</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <label>Symbol</label>
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g., AAPL, MSFT, BTC"
            />
          </div>

          <div className="form-col">
            <label>Quantity</label>
            <input
              type="number"
              step="0.0001"
              placeholder="0.0000"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Buy Price (USD)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
          </div>

          <div className="form-col">
            <label>Note (optional)</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>

        <button type="submit">Add Investment</button>
      </form>
    </div>
  );
}
