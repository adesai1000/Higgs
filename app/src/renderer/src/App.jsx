import React, { useState } from "react";
import { getMeta, setMeta, load, save, resetAll } from "../../data/repo";
import { createSeedData } from "../../data/seedData";
import Sidebar, { PAGES } from "./components/Sidebar";

const dollars = v =>
  `$${(v / 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

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
    if (confirm("Reset all data and restart?")) {
      resetAll();
      setOnboarded(false);
      setData(null);
      setName("");
      setPage("home");
    }
  }
  function refreshData(){
    
  }

  if (!onboarded) {
    return (
      <div style={{ padding: 24, maxWidth: 480 }}>
        <h1>Higgs</h1>
        <p>What is your name?</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
        />
        <button onClick={handleOnboard} style={{ marginLeft: 8 }}>
          Continue
        </button>
      </div>
    );
  }

  const months = Object.keys(data.monthly).sort();
  const activeKey = months[months.length - 1];
  const m = data.monthly[activeKey] || {
    incomeCents: 0,
    expenseCents: 0,
    netWorthCents: 0,
    byCategory: {}
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        height: "100vh"
      }}
    >
      <Sidebar
        currentPage={page}
        onChangePage={setPage}
        onReset={handleReset}
      />

      <main style={{ padding: 16 }}>
        {page === "home" && (
          <>
            <h2>Home</h2>
            <p>Month: {activeKey}</p>
            <p>
              Total Net Worth: <strong>{dollars(m.netWorthCents)}</strong>
            </p>
            <p>Income this month: {dollars(m.incomeCents)}</p>
            <p>Expenses this month: {dollars(m.expenseCents)}</p>
            <p style={{ marginTop: 16 }}>
              By Category:{" "}
              {Object.entries(m.byCategory)
                .map(([k, v]) => `${k}: ${dollars(v)}`)
                .join(" | ")}
            </p>
          </>
        )}

        {page === "income" && <h2>Income page stub</h2>}
        {page === "expenses" && <h2>Expenses page stub</h2>}
        {page === "investments" && <h2>Investments page stub</h2>}
        {page === "loans" && <h2>Loans page stub</h2>}
        {page === "assets" && <h2>Assets page stub</h2>}
      </main>
    </div>
  );
}