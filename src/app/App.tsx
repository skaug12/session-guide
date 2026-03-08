import { A4Guide } from "./components/A4Guide";

export default function App() {
  return (
    <>
      <div
        className="screen-wrapper"
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

      <style>{`
        * { margin: 0; padding: 0; }
        @media print {
          @page {
            size: 210mm 297mm;
            margin: 0;
          }
          html {
            width: 210mm;
            height: 297mm;
          }
          body {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .screen-wrapper {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 0 !important;
            background: #fff !important;
            padding: 0 !important;
            margin: 0 !important;
            display: flex !important;
            align-items: stretch !important;
            justify-content: stretch !important;
            overflow: hidden !important;
          }
          .a4-page {
            width: 210mm !important;
            height: 297mm !important;
            box-shadow: none !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </>
  );
}
