import React, { useState } from "react";
import { getMeta, setMeta, load, save, resetAll } from "../../data/repo";
import Home from "./components/Home";
import { createSeedData } from "../../data/seedData";
import Sidebar from "./components/Sidebar";

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

  if (!onboarded) {
    return (
      <div style={{ padding: 24, maxWidth: 480 }}>
        <h1>Higgs</h1>
        <p>What is your name?</p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <button onClick={handleOnboard} style={{ marginLeft: 8 }}>Continue</button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          background: "white",
          borderRight: "1px solid #ddd",
          zIndex: 20,
        }}
      >
        <Sidebar currentPage={page} onChangePage={setPage} onReset={handleReset} />
      </div>

      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: 1400,
          width: "100%",
          margin: "0 auto",
          flex: 1,
          position: "relative",
          background: "transparent",
        }}
      >
        <main
          style={{
            padding: 24,
            width: "100%",
            maxWidth: 1100,
            boxSizing: "border-box",
            position: "relative",
            zIndex: 30,
          }}
        >
          {page === "home" && <Home data={data} />}
          {page === "income" && <h2>Income page stub</h2>}
          {page === "expenses" && <h2>Expenses page stub</h2>}
          {page === "investments" && <h2>Investments page stub</h2>}
          {page === "loans" && <h2>Loans page stub</h2>}
          {page === "assets" && <h2>Assets page stub</h2>}
        </main>
      </div>
    </div>
  );
}
