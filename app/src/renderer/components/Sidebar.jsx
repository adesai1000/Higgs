import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "8px 10px",
  borderRadius: 8,
  textDecoration: "none",
  color: isActive ? "white" : "#222",
  background: isActive ? "#111" : "transparent"
});

export default function Sidebar({ onReset }) {
  return (
    <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Higgs</h3>
      <div style={{ display: "grid", gap: 8 }}>
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/income" style={linkStyle}>Income</NavLink>
        <NavLink to="/expenses" style={linkStyle}>Expenses</NavLink>
        <NavLink to="/investments" style={linkStyle}>Investments</NavLink>
        <NavLink to="/loans" style={linkStyle}>Loans</NavLink>
        <NavLink to="/assets" style={linkStyle}>Assets</NavLink>
        <hr />
        <button onClick={onReset} style={{ color: "crimson" }}>Reset Data</button>
      </div>
    </aside>
  );
}