import React, { useState } from "react";

function dollars(v) {
  return `$${(v / 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

function calculatePercentageChange(oldValue, newValue) {
  // If both are 0, no change
  if (oldValue === 0 && newValue === 0) {
    return 0;
  }
  // If old value is 0 but new value exists, show as new (100% or more)
  if (oldValue === 0 && newValue > 0) {
    return 100; // Show as 100% increase
  }
  // If old value exists but new is 0, show as -100%
  if (oldValue > 0 && newValue === 0) {
    return -100;
  }
  // Normal percentage calculation
  return ((newValue - oldValue) / oldValue) * 100;
}

export default function Home({ data }) {
  if (!data) {
    return (
      <div style={styles.container}>
        <div style={{ color: "#9CA3AF", textAlign: "center", padding: "40px" }}>
          No data available. Start by adding income, expenses, or assets!
        </div>
      </div>
    );
  }

  const [view, setView] = useState("none");
  const [showComparison, setShowComparison] = useState(true);

  // Get current month
  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7);
  
  // Calculate last month
  const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonth = lastMonthDate.toISOString().slice(0, 7);

  // Get monthly data
  const months = Object.keys(data.monthly || {}).sort();
  
  // Current month data
  const currentMonthData = data.monthly[currentMonth] || {
    incomeCents: 0,
    expenseCents: 0,
    netWorthCents: 0,
    byCategory: {},
  };

  // Last month data
  const lastMonthData = data.monthly[lastMonth] || {
    incomeCents: 0,
    expenseCents: 0,
    netWorthCents: 0,
    byCategory: {},
  };

  // Calculate percentage changes
  const incomeChange = calculatePercentageChange(
    lastMonthData.incomeCents,
    currentMonthData.incomeCents
  );
  const expenseChange = calculatePercentageChange(
    lastMonthData.expenseCents,
    currentMonthData.expenseCents
  );
  const netWorthChange = calculatePercentageChange(
    lastMonthData.netWorthCents,
    currentMonthData.netWorthCents
  );

  const savingsRate =
    currentMonthData.incomeCents > 0
      ? Math.max(0, 1 - currentMonthData.expenseCents / currentMonthData.incomeCents)
      : 0;

  const lastMonthSavingsRate =
    lastMonthData.incomeCents > 0
      ? Math.max(0, 1 - lastMonthData.expenseCents / lastMonthData.incomeCents)
      : 0;

  const savingsRateChange = calculatePercentageChange(
    lastMonthSavingsRate * 100,
    savingsRate * 100
  );

  const expenses = data.expenses || [];
  const incomes = data.incomes || [];
  const assets = data.assets || [];
  const loans = data.loans || [];
  const investments = data.investments || [];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <div style={styles.subtle}>Welcome back</div>
          <h1 style={styles.title}>{data.user?.name || "Higgs User"}</h1>
        </div>

        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={styles.subtle}>This Month ({currentMonth})</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "flex-end" }}>
            <label style={{ ...styles.toggleLabel, fontSize: 12 }}>
              <input
                type="checkbox"
                checked={showComparison}
                onChange={(e) => setShowComparison(e.target.checked)}
                style={{ marginRight: 6, cursor: "pointer" }}
              />
              Show Comparison
            </label>
          </div>
        </div>
      </header>

      <section style={styles.cardRow}>
        <StatCard
          icon="💰"
          label="Net worth"
          value={dollars(currentMonthData.netWorthCents)}
          change={showComparison ? netWorthChange : null}
          comparisonValue={showComparison ? dollars(lastMonthData.netWorthCents) : null}
        />
        <StatCard
          icon="📈"
          label="Income"
          value={dollars(currentMonthData.incomeCents)}
          change={showComparison ? incomeChange : null}
          comparisonValue={showComparison ? dollars(lastMonthData.incomeCents) : null}
        />
        <StatCard
          icon="📉"
          label="Expenses"
          value={dollars(currentMonthData.expenseCents)}
          change={showComparison ? expenseChange : null}
          comparisonValue={showComparison ? dollars(lastMonthData.expenseCents) : null}
        />
        <StatCard
          icon="💡"
          label="Savings rate"
          value={`${(savingsRate * 100).toFixed(1)}%`}
          change={showComparison ? savingsRateChange : null}
          comparisonValue={showComparison ? `${(lastMonthSavingsRate * 100).toFixed(1)}%` : null}
        />
      </section>

      <section style={styles.tabRow}>
        {["expenses", "income", "assets", "loans", "investments"].map((key) => (
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

      {view === "expenses" && <ExpensesTable data={expenses} />}
      {view === "income" && <IncomeTable data={incomes} />}
      {view === "assets" && <AssetsTable data={assets} />}
      {view === "loans" && <LoansTable data={loans} />}
      {view === "investments" && <InvestmentsTable data={investments} />}
    </div>
  );
}

function StatCard({ label, value, icon, change, comparisonValue }) {
  const isPositive = change !== null && change > 0;
  const isNegative = change !== null && change < 0;
  const changeColor = isPositive ? "#10b981" : isNegative ? "#ef4444" : "#9CA3AF";

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

      {change !== null && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14, color: changeColor, fontWeight: 600 }}>
              {isPositive ? "↑" : isNegative ? "↓" : "→"} {Math.abs(change).toFixed(1)}%
            </span>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>vs last month</span>
          </div>
          {comparisonValue && (
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
              Last month: {comparisonValue}
            </div>
          )}
        </div>
      )}
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
  // Sort by date descending (newest first)
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB - dateA;
  });

  if (sortedData.length === 0) {
    return (
      <TableWrapper title="Expenses">
        <div style={{ color: "#9CA3AF", padding: "20px", textAlign: "center" }}>
          No expenses recorded yet.
        </div>
      </TableWrapper>
    );
  }

  const total = sortedData.reduce((sum, exp) => sum + (exp.amountCents || 0), 0);

  return (
    <TableWrapper title={`Expenses (${sortedData.length} items) - Total: ${dollars(total)}`}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Note</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              style={styles.tr}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <td style={styles.td}>{row.date || "-"}</td>
              <td style={styles.td}>{row.category || "-"}</td>
              <td style={styles.td}>{dollars(row.amountCents || 0)}</td>
              <td style={{ ...styles.td, opacity: 0.7 }}>
                {row.note || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

function IncomeTable({ data = [] }) {
  // Sort by date descending (newest first)
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB - dateA;
  });

  if (sortedData.length === 0) {
    return (
      <TableWrapper title="Income">
        <div style={{ color: "#9CA3AF", padding: "20px", textAlign: "center" }}>
          No income recorded yet.
        </div>
      </TableWrapper>
    );
  }

  const total = sortedData.reduce((sum, inc) => sum + (inc.amountCents || 0), 0);

  return (
    <TableWrapper title={`Income (${sortedData.length} items) - Total: ${dollars(total)}`}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Source</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Note</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              style={styles.tr}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <td style={styles.td}>{row.date || "-"}</td>
              <td style={styles.td}>{row.source || "-"}</td>
              <td style={styles.td}>{dollars(row.amountCents || 0)}</td>
              <td style={{ ...styles.td, opacity: 0.7 }}>
                {row.note || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

function AssetsTable({ data = [] }) {
  // Sort by value descending (highest first)
  const sortedData = [...data].sort((a, b) => {
    return (b.valueCents || 0) - (a.valueCents || 0);
  });

  if (sortedData.length === 0) {
    return (
      <TableWrapper title="Assets">
        <div style={{ color: "#9CA3AF", padding: "20px", textAlign: "center" }}>
          No assets recorded yet.
        </div>
      </TableWrapper>
    );
  }

  const totalValue = sortedData.reduce(
    (sum, asset) => sum + (asset.valueCents || 0),
    0
  );

  return (
    <TableWrapper title={`Assets (${sortedData.length}) - Total: ${dollars(totalValue)}`}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              style={styles.tr}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <td style={styles.td}>{row.name || "-"}</td>
              <td style={styles.td}>{row.type || "-"}</td>
              <td style={styles.td}>{dollars(row.valueCents || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

function LoansTable({ data = [] }) {
  // Sort by principal remaining descending (highest first)
  const sortedData = [...data].sort((a, b) => {
    return (b.principalRemainingCents || 0) - (a.principalRemainingCents || 0);
  });

  if (sortedData.length === 0) {
    return (
      <TableWrapper title="Loans">
        <div style={{ color: "#9CA3AF", padding: "20px", textAlign: "center" }}>
          No loans recorded yet.
        </div>
      </TableWrapper>
    );
  }

  const totalPrincipal = sortedData.reduce(
    (sum, loan) => sum + (loan.principalRemainingCents || 0),
    0
  );

  return (
    <TableWrapper title={`Loans (${sortedData.length}) - Total Principal: ${dollars(totalPrincipal)}`}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Principal Remaining</th>
            <th style={styles.th}>Interest Rate</th>
            <th style={styles.th}>Note</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              style={styles.tr}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <td style={styles.td}>{row.name || "-"}</td>
              <td style={styles.td}>{dollars(row.principalRemainingCents || 0)}</td>
              <td style={styles.td}>
                {row.interestRate !== null && row.interestRate !== undefined
                  ? `${row.interestRate.toFixed(2)}%`
                  : "-"}
              </td>
              <td style={{ ...styles.td, opacity: 0.7 }}>
                {row.note || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

function InvestmentsTable({ data = [] }) {
  // Sort by total value descending (highest first)
  const sortedData = [...data].sort((a, b) => {
    const valueA = (a.quantity || 0) * (a.buyPriceCents || 0);
    const valueB = (b.quantity || 0) * (b.buyPriceCents || 0);
    return valueB - valueA;
  });

  if (sortedData.length === 0) {
    return (
      <TableWrapper title="Investments">
        <div style={{ color: "#9CA3AF", padding: "20px", textAlign: "center" }}>
          No investments recorded yet.
        </div>
      </TableWrapper>
    );
  }

  const totalValue = sortedData.reduce((sum, inv) => {
    return sum + ((inv.quantity || 0) * (inv.buyPriceCents || 0));
  }, 0);

  return (
    <TableWrapper title={`Investments (${sortedData.length}) - Total Value: ${dollars(totalValue)}`}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Symbol</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Buy Price</th>
            <th style={styles.th}>Total Value</th>
            <th style={styles.th}>Note</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => {
            const totalValue = (row.quantity || 0) * (row.buyPriceCents || 0);
            return (
              <tr
                key={row.id}
                style={styles.tr}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td style={styles.td}>{row.symbol || "-"}</td>
                <td style={styles.td}>{row.quantity || 0}</td>
                <td style={styles.td}>{dollars(row.buyPriceCents || 0)}</td>
                <td style={styles.td}>{dollars(totalValue)}</td>
                <td style={{ ...styles.td, opacity: 0.7 }}>
                  {row.note || "-"}
                </td>
              </tr>
            );
          })}
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
  th: {
    textAlign: "left",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#9CA3AF",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  tr: {
    transition: "background 0.15s ease",
  },
  toggleLabel: {
    display: "flex",
    alignItems: "center",
    color: "#9CA3AF",
    cursor: "pointer",
    userSelect: "none",
  },
};
