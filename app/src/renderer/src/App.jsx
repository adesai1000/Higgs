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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      <div className="welcome-root">
        <div className="welcome-card">
          <h1 className="welcome-title">Higgs</h1>

          <p className="welcome-subtitle">
            Let&apos;s set up your personal finance space.
          </p>

          <p className="welcome-label">WHAT SHOULD WE CALL YOU?</p>

          <div className="welcome-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleOnboard()}
              placeholder="Your name"
              className="welcome-input"
            />

            <button
              onClick={handleOnboard}
              disabled={!name.trim()}
              className="welcome-button"
            >
              Continue →
            </button>
          </div>

          <p className="welcome-hint">
            You can reset everything anytime from the sidebar.
          </p>
        </div>

        <style>
          {`
            .welcome-root {
              height: 100vh;
              width: 100vw;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #f5f5f5;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
                sans-serif;
            }

            .welcome-card {
              position: relative;
              padding: 40px 52px;
              border-radius: 26px;
              max-width: 520px;
              width: 100%;
              border: 1px solid rgba(255, 255, 255, 0.08);
              background: rgba(5, 5, 10, 0.7);
              backdrop-filter: blur(18px) saturate(160%);
              -webkit-backdrop-filter: blur(18px) saturate(160%);
              box-shadow:
                0 26px 60px rgba(0, 0, 0, 0.75),
                0 0 60px rgba(120, 80, 255, 0.12);
              overflow: hidden;
              transform: translateY(10px);
              opacity: 0;
              animation: welcomeIn 0.7s ease-out forwards;
            }

            /* soft gradient glow that ties into the background curves */
            .welcome-card::before {
              content: "";
              position: absolute;
              inset: -35%;
              background:
                radial-gradient(circle at 0% 0%, rgba(120, 100, 255, 0.20), transparent 60%),
                radial-gradient(circle at 120% 120%, rgba(255, 80, 180, 0.22), transparent 60%);
              mix-blend-mode: screen;
              opacity: 0.6;
              pointer-events: none;
            }

            .welcome-card:hover {
              box-shadow:
                0 32px 90px rgba(0, 0, 0, 0.9),
                0 0 80px rgba(140, 100, 255, 0.25);
              background: rgba(8, 8, 16, 0.9);
              transform: translateY(0);
              transition: all 0.28s ease-out;
            }

            .welcome-title {
              margin: 0;
              font-size: 46px;
              letter-spacing: 0.03em;
              color: #ffffff;
              text-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
            }

            .welcome-subtitle {
              margin-top: 14px;
              margin-bottom: 30px;
              opacity: 0.88;
              font-size: 16px;
              color: #ececec;
            }

            .welcome-label {
              margin: 0;
              font-size: 11px;
              letter-spacing: 0.14em;
              opacity: 0.7;
              text-transform: uppercase;
              color: #d0d0d0;
            }

            .welcome-row {
              display: flex;
              gap: 10px;
              margin-top: 12px;
            }

            .welcome-input {
              flex: 1;
              padding: 10px 16px;
              border-radius: 999px;
              border: 1px solid rgba(255, 255, 255, 0.18);
              background: rgba(0, 0, 0, 0.55);
              color: #ffffff;
              font-size: 15px;
              outline: none;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.55);
              transition:
                border-color 0.2s ease,
                box-shadow 0.2s ease,
                background 0.2s ease,
                transform 0.15s ease;
            }

            .welcome-input::placeholder {
              color: rgba(230, 230, 230, 0.7);
            }

            .welcome-input:focus {
              border-color: rgba(255, 255, 255, 0.7);
              background: rgba(0, 0, 0, 0.84);
              box-shadow:
                0 0 0 1px rgba(255, 255, 255, 0.15),
                0 0 24px rgba(140, 100, 255, 0.6);
              transform: translateY(-1px);
            }

            .welcome-button {
              padding: 10px 22px;
              border-radius: 999px;
              border: none;
              font-weight: 600;
              font-size: 14px;
              background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.95),
                rgba(230, 230, 230, 0.85)
              );
              color: #111;
              cursor: pointer;
              white-space: nowrap;
              box-shadow:
                0 10px 24px rgba(0, 0, 0, 0.65),
                0 0 20px rgba(255, 255, 255, 0.45);
              transition:
                transform 0.15s ease,
                box-shadow 0.15s ease,
                background 0.2s ease,
                opacity 0.15s ease;
            }

            .welcome-button:hover:not([disabled]) {
              transform: translateY(-1px);
              box-shadow:
                0 14px 32px rgba(0, 0, 0, 0.75),
                0 0 28px rgba(255, 255, 255, 0.6);
            }

            .welcome-button:active:not([disabled]) {
              transform: translateY(0);
              box-shadow:
                0 10px 20px rgba(0, 0, 0, 0.7),
                0 0 18px rgba(255, 255, 255, 0.45);
            }

            .welcome-button[disabled] {
              opacity: 0.38;
              cursor: not-allowed;
              box-shadow: none;
              background: rgba(255, 255, 255, 0.18);
              color: #777;
            }

            .welcome-hint {
              margin-top: 16px;
              font-size: 12px;
              opacity: 0.7;
              color: #d2d2d2;
            }

            @keyframes welcomeIn {
              from {
                opacity: 0;
                transform: translateY(18px);
              }
              to {
                opacity: 1;
                transform: translateY(10px);
              }
            }
          `}
        </style>
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
      gridTemplateColumns: sidebarCollapsed ? "40px 1fr" : "220px 1fr",
      height: "100vh",
      width: "100vw",
      margin: 0,
      boxSizing: "border-box",
      transition: "grid-template-columns 0.2s ease",
    }}
  >
    <Sidebar
      currentPage={page}
      onChangePage={setPage}
      onReset={handleReset}
      collapsed={sidebarCollapsed}
      onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
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