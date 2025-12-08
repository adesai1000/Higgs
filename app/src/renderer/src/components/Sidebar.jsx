export const PAGES = [
  { key: "home", label: "Home" },
  { key: "income", label: "Income" },
  { key: "expenses", label: "Expenses" },
  { key: "investments", label: "Investments" },
  { key: "loans", label: "Loans" },
  { key: "assets", label: "Assets" }
];

export default function Sidebar({ currentPage, onChangePage, onReset }) {
  return (
    <aside
      style={{
        borderRight: "1px solid #eee",
        padding: 16,
        background: "#fafafa"
      }}
    >
      <h3 style={{ marginTop: 0 }}>Higgs</h3>
      <nav style={{ display: "grid", gap: 8 }}>
        {PAGES.map(p => (
          <button
            key={p.key}
            onClick={() => onChangePage(p.key)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: currentPage === p.key ? "#111" : "#fff",
              color: currentPage === p.key ? "#fff" : "#111",
              textAlign: "left",
              cursor: "pointer"
            }}
          >
            {p.label}
          </button>
        ))}
        <hr />
        <button onClick={onReset} style={{ color: "crimson" }}>
          Reset Data
        </button>
      </nav>
    </aside>
  );
}