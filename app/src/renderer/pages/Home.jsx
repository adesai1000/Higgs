import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { data } = useOutletContext();
  if (!data) return null;

  const months = Object.keys(data.monthly).sort();
  const activeKey = months[months.length - 1];
  const m = data.monthly[activeKey];

  const dollars = v => `$${(v / 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <div>
      <h2>Home</h2>
      <p>Month: {activeKey}</p>
      <p>Total Net Worth: <strong>{dollars(m.netWorthCents)}</strong></p>
      {/* Hook your charts here using m.byCategory and data.monthly */}
    </div>
  );
}