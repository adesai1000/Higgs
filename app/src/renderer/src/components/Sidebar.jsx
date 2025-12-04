export const PAGES = [
  { key: "home", label: "Home" },
  { key: "income", label: "Income" },
  { key: "expenses", label: "Expenses" },
  { key: "investments", label: "Investments" },
  { key: "loans", label: "Loans" },
  { key: "assets", label: "Assets" }
];

export default function Sidebar({
  currentPage,
  onChangePage,
  onReset,
  collapsed,
  onToggleCollapse,
}) {
  const isCollapsed = collapsed;

  return (
    <aside
      style={{
        borderRight: "1px solid #eee",
        padding: isCollapsed ? 8 : 16,
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header with title + collapse icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          marginBottom: 16,
        }}
      >
        {!isCollapsed && <h3 style={{ margin: 0 }}>Higgs</h3>}
        <button
          onClick={onToggleCollapse}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 18,
            padding: 4,
          }}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "»" : "«"}
        </button>
      </div>

      {/* Only show nav when expanded */}
      {!isCollapsed && (
        <nav style={{ display: "grid", gap: 8 }}>
          {PAGES.map(p => (
            <button
              key={p.key}
              onClick={() => onChangePage(p.key)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border:
                  currentPage === p.key ? "1px solid #111" : "1px solid #ddd",
                background: currentPage === p.key ? "#111" : "#fff",
                color: currentPage === p.key ? "#fff" : "#111",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: currentPage === p.key ? 600 : 400,
                transition:
                  "background 0.2s, color 0.2s, border-color 0.2s, transform 0.1s",
              }}
            >
              {p.label}
            </button>
          ))}

          <hr />

          <button
            onClick={onReset}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #f0bcbc",
              background: "#fff5f5",
              color: "crimson",
              cursor: "pointer",
            }}
          >
            Reset Data
          </button>
        </nav>
      )}
    </aside>
  );
}
