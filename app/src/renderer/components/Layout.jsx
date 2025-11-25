import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getMeta, setMeta, load, save, resetAll } from "../data/repo";
import { createSeedData } from "../data/seedData";

export default function Layout() {
  const [data, setData] = useState(load());
  const [onboarded, setOnboarded] = useState(getMeta().onboarded);
  const [name, setName] = useState("");

  useEffect(() => { if (data) save(data); }, [data]);

  function handleOnboard() {
    if (!name.trim()) return;
    const seeded = createSeedData(name.trim());
    save(seeded);
    setMeta({ onboarded: true });
    setData(seeded);
    setOnboarded(true);
  }

  function handleReset() {
    if (confirm("Reset all data and restart onboarding?")) {
      resetAll();
      setData(null);
      setOnboarded(false);
      setName("");
    }
  }

  if (!onboarded) {
    return (
      <div style={{ padding: 24, maxWidth: 480 }}>
        <h1>Higgs</h1>
        <p>What is your name?</p>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        <button onClick={handleOnboard} style={{ marginLeft: 8 }}>Continue</button>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", height: "100vh" }}>
      <Sidebar onReset={handleReset} />
      <main style={{ padding: 16 }}>
        <Outlet context={{ data, setData }} />
      </main>
    </div>
  );
}