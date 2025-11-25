import React, { useState } from "react";
import { getMeta, setMeta, load, save, resetAll } from "./data/repo";
import { createSeedData } from "./data/seedData";

const dollars = v => `$${(v/100).toLocaleString(undefined,{ maximumFractionDigits: 2 })}`;

export default function App() {
  const meta = getMeta();
  const [onboarded, setOnboarded] = useState(meta.onboarded);
  const [name, setName] = useState("");
  const [data, setData] = useState(load());
  const [page, setPage] = useState("home");

  function handleOnboard() {
    if (!name.trim()) return;
    const seeded = createSeedData(name.trim());
    save(seeded);
    setMeta({ onboarded: true });
    setData(seeded);
    setOnboarded(true);
  }

  function handleReset() {
    if (confirm("Reset all data?")) {
      resetAll();
      setOnboarded(false);
      setData(null);
      setName("");
      setPage("home");
    }
  }

  if (!onboarded) {
    return (
      <div style={{ padding: 24, maxWidth: 480 }}>
        <h1>Higgs</h1>
        <p>What is your name?</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
        <button onClick={handleOnboard} style={{ marginLeft: 8 }}>Continue</button>
      </div>
    );
  }

  // Home read, minimal
  const months = Object.keys(data.monthly).sort();
  const activeKey = months[months.length - 1];
  const m = data.monthly[activeKey] || { netWorthCents: 0, byCategory: {} };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", height: "100vh" }}>
      <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Higgs</h3>
        <div style={{ display: "grid", gap: 8 }}>
          <button onClick={()=>setPage("home")}>Home</button>
          <button onClick={()=>setPage("income")}>Income</button>
          <button onClick={()=>setPage("expenses")}>Expenses</button>
          <hr />
          <button onClick={handleReset} style={{ color: "crimson" }}>Reset Data</button>
        </div>
      </aside>

      <main style={{ padding: 16 }}>
        {page === "home" && (
          <>
            <h2>Home</h2>
            <p>Month: {activeKey}</p>
            <p>Total Net Worth: <strong>{dollars(m.netWorthCents)}</strong></p>
            <p>Income this month: {dollars(m.incomeCents)}</p>
            <p>Expenses this month: {dollars(m.expenseCents)}</p>
            <p>By Category: {Object.entries(m.byCategory).map(([k,v]) => `${k}: ${dollars(v)}`).join("  |  ")}</p>
          </>
        )}
        {page === "income" && <h2>Income page stub</h2>}
        {page === "expenses" && <h2>Expenses page stub</h2>}
      </main>
    </div>
  );
}