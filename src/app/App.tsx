import { A4Guide } from "./components/A4Guide";

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print button — hidden when printing */}
      <div
        className="print:hidden"
        style={{
          position: "fixed",
          top: 20,
          right: 24,
          zIndex: 100,
        }}
      >
        <button
          onClick={handlePrint}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            letterSpacing: 0.3,
            fontFamily:
              "'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          PDF로 출력
        </button>
      </div>

      {/* Page background */}
      <div
        className="print:bg-white print:p-0"
        style={{
          minHeight: "100vh",
          background: "#d1d5db",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "48px 0 60px",
        }}
      >
        <A4Guide />
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </>
  );
}