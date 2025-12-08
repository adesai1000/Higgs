import React, { useState } from "react";

function dollars(v) {
  return `$${(v / 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

export default function Home({ data }) {
  if (!data) return null;

  const [view, setView] = useState("none");

  const months = Object.keys(data.monthly || {}).sort();
  const activeMonth = months[months.length - 1];

  const monthly = data.monthly[activeMonth] || {
    incomeCents: 0,
    expenseCents: 0,
    netWorthCents: 0,
  };

  const savingsRate =
    monthly.incomeCents > 0
      ? Math.max(0, 1 - monthly.expenseCents / monthly.incomeCents)
      : 0;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <div style={styles.subtle}>Welcome back</div>
          <h1 style={styles.title}>{data.user?.name || "Higgs User"}</h1>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={styles.subtle}>Active month</div>
          <div style={styles.titleSmall}>{activeMonth}</div>
        </div>
      </header>

      <section style={styles.cardRow}>
        <StatCard icon="💰" label="Net worth" value={dollars(monthly.netWorthCents)} />
        <StatCard icon="📈" label="Income" value={dollars(monthly.incomeCents)} />
        <StatCard icon="📉" label="Expenses" value={dollars(monthly.expenseCents)} />
        <StatCard icon="💡" label="Savings rate" value={`${(savingsRate * 100).toFixed(1)}%`} />
      </section>

      <section style={styles.tabRow}>
        {["expenses", "income", "assets"].map((key) => (
          <button
            key={key}
            onClick={() => setView(key)}
            style={{
              ...styles.tabButtonBase,
              ...(view === key ? styles.tabButtonActive : {}),
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}

        <button
          onClick={() => setView("none")}
          style={{ ...styles.tabButtonBase, opacity: 0.7 }}
        >
          Hide
        </button>
      </section>

      {view === "expenses" && <ExpensesTable data={data.expenses} />}
      {view === "income" && <IncomeTable data={data.incomes} />}
      {view === "assets" && <AssetsTable data={data.assets} />}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div
      style={styles.statCard}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22, opacity: 0.85 }}>{icon}</span>
        <div style={styles.subtle}>{label}</div>
      </div>

      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

function TableWrapper({ title, children }) {
  return (
    <div style={styles.tableCard}>
      <h3 style={styles.tableTitle}>{title}</h3>
      {children}
    </div>
  );
}

function ExpensesTable({ data = [] }) {
  return (
    <TableWrapper title="Expenses">
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.category}</td>
              <td>{dollars(row.amountCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

function IncomeTable({ data = [] }) {
  return (
    <TableWrapper title="Income">
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.source}</td>
              <td>{dollars(row.amountCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

function AssetsTable({ data = [] }) {
  return (
    <TableWrapper title="Assets">
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{dollars(row.valueCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 24,
    color: "white",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtle: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  title: {
    margin: "4px 0 0",
    fontSize: 28,
    fontWeight: 700,
  },
  titleSmall: {
    fontSize: 20,
    fontWeight: 700,
  },
  cardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  statCard: {
    padding: 20,
    borderRadius: 14,
    background: "linear-gradient(145deg, #1b1c1f, #111113)",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
    transition: "transform 0.15s ease",
  },
  statValue: {
    fontSize: 26,
    fontWeight: 700,
    marginTop: 6,
    letterSpacing: "-0.5px",
  },
  tabRow: {
    display: "flex",
    gap: 12,
    marginTop: 10,
  },
  tabButtonBase: {
    padding: "10px 20px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: 14,
    transition: "all 0.2s ease",
  },
  tabButtonActive: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    boxShadow: "0 0 8px rgba(255,255,255,0.25)",
  },
  tableCard: {
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  tableTitle: {
    margin: 0,
    marginBottom: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#e5e7eb",
    fontSize: 14,
  },
};
