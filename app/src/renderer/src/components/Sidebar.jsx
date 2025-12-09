/* eslint-disable react/prop-types */

// eslint-disable-next-line react-refresh/only-export-components
export const PAGES = [
  { key: "home", label: "Home" },
  { key: "income", label: "Income" },
  { key: "expenses", label: "Expenses" },
  { key: "investments", label: "Investments" },
  { key: "loans", label: "Loans" },
  { key: "assets", label: "Assets" },
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
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        padding: isCollapsed ? "16px 8px 16px 8px" : "20px 20px 20px 20px",
        paddingTop: isCollapsed ? "16px" : "20px",
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: isCollapsed ? "56px" : "240px",
        minWidth: isCollapsed ? "56px" : "240px",
        maxWidth: isCollapsed ? "56px" : "240px",
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        position: "relative",
        margin: 0,
        top: 0,
        left: 0,
        alignSelf: "stretch",
      }}
    >
      {/* Header with title + collapse icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          marginBottom: isCollapsed ? 0 : 24,
          paddingBottom: isCollapsed ? 0 : 16,
          borderBottom: isCollapsed ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
          marginTop: 0,
          paddingTop: 0,
          flexShrink: 0,
        }}
      >
        {!isCollapsed && (
          <h3 style={{ margin: 0, color: "#fff", fontSize: 20, fontWeight: 700 }}>
            Higgs
          </h3>
        )}
        <button
          onClick={onToggleCollapse}
          style={{
            border: isCollapsed 
              ? "2px solid rgba(255, 255, 255, 0.4)" 
              : "1px solid rgba(255, 255, 255, 0.15)",
            background: isCollapsed 
              ? "rgba(255, 255, 255, 0.25)" 
              : "rgba(255, 255, 255, 0.08)",
            cursor: "pointer",
            fontSize: isCollapsed ? 18 : 14,
            padding: isCollapsed ? "10px" : "8px 10px",
            borderRadius: "10px",
            color: isCollapsed ? "#fff" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isCollapsed ? "40px" : "auto",
            minWidth: isCollapsed ? "40px" : "auto",
            height: isCollapsed ? "40px" : "auto",
            minHeight: isCollapsed ? "40px" : "32px",
            transition: "all 0.2s ease",
            opacity: isCollapsed ? 1 : 0.9,
            fontWeight: isCollapsed ? 700 : 400,
            boxShadow: isCollapsed 
              ? "0 2px 8px rgba(255, 255, 255, 0.2), 0 0 12px rgba(255, 255, 255, 0.1)" 
              : "none",
          }}
          onMouseEnter={(e) => {
            if (isCollapsed) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.35)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 255, 255, 0.3), 0 0 16px rgba(255, 255, 255, 0.15)";
            } else {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            }
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            if (isCollapsed) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(255, 255, 255, 0.2), 0 0 12px rgba(255, 255, 255, 0.1)";
            } else {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            }
            e.currentTarget.style.opacity = isCollapsed ? 1 : 0.9;
          }}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Only show nav when expanded */}
      {!isCollapsed && (
        <nav style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          {PAGES.map((p) => (
            <button
              key={p.key}
              onClick={() => onChangePage(p.key)}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "none",
                background:
                  currentPage === p.key
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(255, 255, 255, 0.05)",
                color: currentPage === p.key ? "#fff" : "rgba(255, 255, 255, 0.8)",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: currentPage === p.key ? 600 : 400,
                fontSize: 14,
                transition: "all 0.2s ease",
                transform: "translateX(0)",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== p.key) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== p.key) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              {p.label}
            </button>
          ))}

          <div
            style={{
              marginTop: "auto",
              paddingTop: 16,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <button
              onClick={onReset}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255, 80, 80, 0.3)",
                background: "rgba(255, 80, 80, 0.1)",
                color: "#ff6b6b",
                cursor: "pointer",
                width: "100%",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 80, 80, 0.15)";
                e.currentTarget.style.borderColor = "rgba(255, 80, 80, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 80, 80, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 80, 80, 0.3)";
              }}
            >
              Reset Data
            </button>
          </div>
        </nav>
      )}
    </aside>
  );
}
