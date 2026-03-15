// HFK 세션 일정 — 날짜별 세션 목록
import { useState, useEffect } from "react";
import hfkLogo from "../../assets/hfk-logo.png";

const F = {
  sans: "'Pretendard Variable', 'Pretendard', -apple-system, sans-serif",
  serif: "'Media 77', Georgia, 'Times New Roman', serif",
};

interface SessionEntry {
  team: string;
  session: number;
  date: string;
  day: string;
  topic: string;
}

interface SessionsData {
  season: string;
  sessions: SessionEntry[];
}

export function HandoutIndexPage() {
  const [data, setData] = useState<SessionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/sessions.json`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sessions = data?.sessions ?? [];

  // 날짜별 그룹핑
  const grouped = sessions.reduce<Record<string, SessionEntry[]>>(
    (acc, s) => {
      (acc[s.date] ??= []).push(s);
      return acc;
    },
    {},
  );

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const filteredDates = dateFilter
    ? sortedDates.filter((d) => d.includes(dateFilter))
    : sortedDates;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f4f5",
      fontFamily: F.sans,
    }}>
      {/* Header */}
      <div style={{
        background: "#0f0f0f",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={hfkLogo} alt="HFK" style={{ height: 18 }} />
          <span style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: -0.3,
          }}>세션 일정</span>
        </div>
        <span style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: 11,
          fontFamily: F.serif,
          letterSpacing: 0.3,
        }}>Your Growth Matters.</span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px" }}>
        {/* Date filter */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: "#6b6b6b",
            marginBottom: 8,
            letterSpacing: -0.1,
          }}>날짜로 검색</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: 14,
              border: "1px solid #d9d9d9",
              borderRadius: 8,
              fontFamily: F.sans,
              background: "#fff",
              boxSizing: "border-box",
            }}
          />
        </div>

        {loading ? (
          <p style={{ color: "#8e8e8e", fontSize: 14, textAlign: "center", padding: 40 }}>
            불러오는 중...
          </p>
        ) : filteredDates.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#8e8e8e",
          }}>
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
              {dateFilter ? "해당 날짜에 예정된 세션이 없습니다" : "등록된 세션이 없습니다"}
            </p>
          </div>
        ) : (
          filteredDates.map((date) => (
            <div key={date} style={{ marginBottom: 24 }}>
              {/* Date header */}
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#2a2a2a",
                padding: "8px 0",
                borderBottom: "2px solid #0f0f0f",
                marginBottom: 8,
                letterSpacing: -0.2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span>{formatDate(date)}</span>
                <a
                  href={`?date=${date}`}
                  style={{
                    fontSize: 11,
                    color: "#8e8e8e",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >인쇄용 →</a>
              </div>

              {/* Team cards */}
              {grouped[date].map((s) => (
                <div
                  key={`${s.team}-${s.date}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 16px",
                    background: "#fff",
                    borderRadius: 10,
                    marginBottom: 6,
                    color: "inherit",
                    border: "1px solid #ebebeb",
                    gap: 14,
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#0f0f0f",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: F.serif,
                    }}>{String(s.session).padStart(2, "0")}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0f0f0f",
                      letterSpacing: -0.3,
                      marginBottom: 2,
                    }}>{s.team}</div>
                    <div style={{
                      fontSize: 11.5,
                      color: "#8e8e8e",
                      letterSpacing: -0.1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>{s.topic}</div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()} (${days[d.getDay()]})`;
}
