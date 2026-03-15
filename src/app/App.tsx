import { useState, useEffect } from "react";
import { A4Guide, type HandoutData } from "./components/A4Guide";
import { HandoutIndexPage } from "./components/HandoutIndex";
import hfkLogo from "../assets/hfk-logo.png";

const F = {
  sans: "'Pretendard Variable', 'Pretendard', -apple-system, sans-serif",
  serif: "'Media 77', Georgia, 'Times New Roman', serif",
};

// GAS 웹앱 URL (배포 후 업데이트 필요)
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbw_mVUiUYVJGh7Ah_PRmBxmHY-Txt_bRfud2cp60QLtpCYXIOBWeF7SZVRRuGPoYNHT1g/exec";

interface SessionEntry {
  team: string;
  session: number;
  date: string;
  day: string;
  topic: string;
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const team = params.get("team");
  const date = params.get("date");
  const isHandoutView = team && date;
  const isDateView = !team && date;

  // PDF 생성 모드: 로컬 파일로 열면 A4Guide 바로 렌더링
  const isLocal = window.location.protocol === "file:";
  if (isLocal && !isHandoutView && !isDateView) {
    return <A4GuideDefault />;
  }

  if (isHandoutView) return <HandoutView team={team} date={date} />;
  if (isDateView) return <DateView date={date} />;
  return <HandoutIndexPage />;
}

// ── 날짜별 핸드아웃 (A4 렌더링) ──────────────────────
function DateView({ date }: { date: string }) {
  const [handouts, setHandouts] = useState<HandoutData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GAS API에서 해당 날짜 팀 목록 조회 → 각 팀별 HandoutData 조회
    fetch(`${GAS_API_URL}?date=${date}`)
      .then((r) => r.json())
      .then((listData) => {
        const teams: { team: string }[] = listData.teams || [];
        if (teams.length === 0) {
          setLoading(false);
          return;
        }
        // 각 팀의 HandoutData를 병렬 조회
        return Promise.all(
          teams.map((t) =>
            fetch(`${GAS_API_URL}?team=${encodeURIComponent(t.team)}&date=${date}`)
              .then((r) => r.json())
              .then((d) => (d && d.team ? d : buildHandoutFromParams(t.team, date)) as HandoutData)
              .catch(() => buildHandoutFromParams(t.team, date))
          )
        ).then((results) => {
          setHandouts(results);
          setLoading(false);
        });
      })
      .catch(() => {
        // GAS 실패 시 sessions.json 폴백
        fetch(`${import.meta.env.BASE_URL}data/sessions.json`)
          .then((r) => r.json())
          .then((data) => {
            const filtered = (data.sessions || []).filter((s: SessionEntry) => s.date === date);
            setHandouts(filtered.map(buildHandoutFromSession));
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [date]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.sans,
        color: "#8e8e8e",
        fontSize: 14,
      }}>불러오는 중...</div>
    );
  }

  if (handouts.length === 0) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.sans,
        gap: 12,
      }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#2a2a2a" }}>
          해당 날짜에 예정된 세션이 없습니다
        </p>
        <a href="./" style={{ fontSize: 13, color: "#0f0f0f", marginTop: 8 }}>
          ← 목록으로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <>
      <div
        className="screen-wrapper"
        style={{
          minHeight: "100vh",
          background: "#d1d5db",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          padding: "48px 0 60px",
          gap: 32,
        }}
      >
        {handouts.map((h, i) => (
          <A4Guide key={i} data={h} />
        ))}
      </div>

      <div className="screen-only" style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        gap: 8,
        zIndex: 100,
      }}>
        <a href="./" style={{
          padding: "10px 18px",
          background: "#fff",
          color: "#0f0f0f",
          border: "1px solid #d9d9d9",
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: F.sans,
          textDecoration: "none",
          cursor: "pointer",
        }}>← 목록</a>
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 24px",
            background: "#0f0f0f",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: F.sans,
            cursor: "pointer",
          }}
        >인쇄 / PDF 다운로드</button>
      </div>

      <style>{`
        * { margin: 0; padding: 0; }
        @media print {
          @page { size: 210mm 297mm; margin: 0; }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .screen-wrapper {
            background: #fff !important;
            padding: 0 !important;
            gap: 0 !important;
          }
          .a4-page {
            width: 210mm !important;
            height: 297mm !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-after: always;
          }
          .screen-only { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ── 공통 기본값 ────────────────────────────────────
const SHARED_DEFAULTS = {
  season: "2026 봄시즌",
  venue: "오아시스 덕수궁",
  wifi: { id: "501_oasisdsg", pw: "oasis00000" },
  restroom: "W 4F (비번없음) · M 5F (0000)",
  notices: [
    "봄시즌은 13개 팀, 멤버 123명, 파트너 17명, 크루 2명이 서로 자극을 주고 받으며 성장합니다.",
    "HFK의 모든 공지는 슬랙으로 전달드리지만, 별도 공지방을 카톡 팀 채팅방으로 오픈했습니다. HFK 봄시즌을 참여하며 반드시 챙겨야 할 스케줄이니 꼭 확인해주세요.",
    "이번 봄에도 다양한 클럽이 오픈됩니다! 온라인클럽 8개, 오프라인클럽 23개 총 31개 클럽을 준비했습니다. 클럽 채널이 오픈되었으니, 신청한 분들은 확인해주세요.",
  ],
  events: [
    { day: "03.18", dow: "수", time: "19:30–21:00", venue: "오아시스 덕수궁", title: "브랜드 토크: 태평양조" },
    { day: "03.21", dow: "토", time: "15:00–16:30", venue: "오아시스 덕수궁", title: "저자 북토크: 매출을 부르는 회계 감각" },
    { day: "03.25", dow: "수", time: "19:30–21:00", venue: "오아시스 덕수궁", title: "PEST 브리핑" },
  ],
};

function buildHandoutFromSession(session: SessionEntry): HandoutData {
  const d = new Date(session.date + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dateLabel = `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getDate()).padStart(2, "0")} ${days[d.getDay()]}요일`;

  // 요일별 기본 타임테이블
  const dayOfWeek = d.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const timetable = isWeekend
    ? [
        { time: "10:30 – 10:40", label: "스몰토크", main: false },
        { time: "10:40 – 11:40", label: "파트너의 발표 진행", main: true },
        { time: "11:40 – 11:50", label: "쉬는 시간", main: false },
        { time: "11:50 – 12:50", label: "워크숍 / 토론", main: true },
        { time: "12:50 – 13:00", label: "4L 리뷰 작성", main: false },
      ]
    : [
        { time: "19:30 – 19:40", label: "스몰토크", main: false },
        { time: "19:40 – 20:40", label: "파트너의 발표 진행", main: true },
        { time: "20:40 – 20:50", label: "쉬는 시간", main: false },
        { time: "20:50 – 21:50", label: "워크숍 / 토론", main: true },
        { time: "21:50 – 22:00", label: "4L 리뷰 작성", main: false },
      ];

  return {
    season: SHARED_DEFAULTS.season,
    team: session.team,
    date: dateLabel,
    sessionNumber: String(session.session).padStart(2, "0"),
    topic: session.topic,
    nextSession: "",
    venue: SHARED_DEFAULTS.venue,
    timetable,
    partner: { name: "", org: "" },
    members: [],
    notices: SHARED_DEFAULTS.notices,
    events: SHARED_DEFAULTS.events,
    wifi: SHARED_DEFAULTS.wifi,
    restroom: SHARED_DEFAULTS.restroom,
  };
}

// ── URL 파라미터만으로 기본 핸드아웃 생성 ──────────────
function buildHandoutFromParams(team: string, date: string): HandoutData {
  const d = new Date(date + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dateLabel = `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getDate()).padStart(2, "0")} ${days[d.getDay()]}요일`;

  const dayOfWeek = d.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const timetable = isWeekend
    ? [
        { time: "10:30 – 10:40", label: "스몰토크", main: false },
        { time: "10:40 – 11:40", label: "파트너의 발표 진행", main: true },
        { time: "11:40 – 11:50", label: "쉬는 시간", main: false },
        { time: "11:50 – 12:50", label: "워크숍 / 토론", main: true },
        { time: "12:50 – 13:00", label: "4L 리뷰 작성", main: false },
      ]
    : [
        { time: "19:30 – 19:40", label: "스몰토크", main: false },
        { time: "19:40 – 20:40", label: "파트너의 발표 진행", main: true },
        { time: "20:40 – 20:50", label: "쉬는 시간", main: false },
        { time: "20:50 – 21:50", label: "워크숍 / 토론", main: true },
        { time: "21:50 – 22:00", label: "4L 리뷰 작성", main: false },
      ];

  return {
    season: SHARED_DEFAULTS.season,
    team,
    date: dateLabel,
    sessionNumber: "",
    topic: "",
    nextSession: "",
    venue: SHARED_DEFAULTS.venue,
    timetable,
    partner: { name: "", org: "" },
    members: [],
    notices: SHARED_DEFAULTS.notices,
    events: SHARED_DEFAULTS.events,
    wifi: SHARED_DEFAULTS.wifi,
    restroom: SHARED_DEFAULTS.restroom,
  };
}

// ── 개별 핸드아웃 (A4 렌더링) ──────────────────────
function HandoutView({ team, date }: { team: string; date: string }) {
  const [data, setData] = useState<HandoutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const file = `${team}_${date}.json`;
    // 1차: 전용 핸드아웃 JSON 시도
    fetch(`${import.meta.env.BASE_URL}data/handouts/${file}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => {
        // 2차: GAS API에서 실시간 데이터 조회 (캘린더 + 구글시트)
        fetch(`${GAS_API_URL}?team=${encodeURIComponent(team)}&date=${date}`)
          .then((r) => {
            if (!r.ok) throw new Error("api error");
            return r.json();
          })
          .then((gasData) => {
            if (gasData && gasData.team) {
              setData(gasData as HandoutData);
            } else {
              setData(buildHandoutFromParams(team, date));
            }
            setLoading(false);
          })
          .catch(() => {
            // 3차: URL 파라미터만으로 기본 핸드아웃 생성
            setData(buildHandoutFromParams(team, date));
            setLoading(false);
          });
      });
  }, [team, date]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.sans,
        color: "#8e8e8e",
        fontSize: 14,
      }}>불러오는 중...</div>
    );
  }

  if (!data) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.sans,
        gap: 12,
      }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#2a2a2a" }}>
          핸드아웃을 찾을 수 없습니다
        </p>
        <p style={{ fontSize: 12, color: "#8e8e8e" }}>
          {team} · {date}
        </p>
        <a href="./" style={{ fontSize: 13, color: "#0f0f0f", marginTop: 8 }}>
          ← 목록으로 돌아가기
        </a>
      </div>
    );
  }

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
        <A4Guide data={data} />
      </div>

      <div className="screen-only" style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        gap: 8,
        zIndex: 100,
      }}>
        <a href="./" style={{
          padding: "10px 18px",
          background: "#fff",
          color: "#0f0f0f",
          border: "1px solid #d9d9d9",
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: F.sans,
          textDecoration: "none",
          cursor: "pointer",
        }}>← 목록</a>
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 24px",
            background: "#0f0f0f",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: F.sans,
            cursor: "pointer",
          }}
        >인쇄 / PDF 다운로드</button>
      </div>

      <style>{`
        * { margin: 0; padding: 0; }
        @media print {
          @page {
            size: 210mm 297mm;
            margin: 0;
          }
          html { width: 210mm; height: 297mm; }
          body {
            width: 210mm; height: 297mm;
            overflow: hidden;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .screen-wrapper {
            width: 210mm !important; height: 297mm !important;
            min-height: 0 !important; background: #fff !important;
            padding: 0 !important; margin: 0 !important;
            display: flex !important;
            align-items: stretch !important; justify-content: stretch !important;
            overflow: hidden !important;
          }
          .a4-page {
            width: 210mm !important; height: 297mm !important;
            box-shadow: none !important; overflow: hidden !important;
          }
          .screen-only { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ── PDF 생성용 (로컬 파일 열기) ─────────────────────
function A4GuideDefault() {
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
          @page { size: 210mm 297mm; margin: 0; }
          html { width: 210mm; height: 297mm; }
          body {
            width: 210mm; height: 297mm;
            overflow: hidden;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .screen-wrapper {
            width: 210mm !important; height: 297mm !important;
            min-height: 0 !important; background: #fff !important;
            padding: 0 !important; margin: 0 !important;
            display: flex !important;
            align-items: stretch !important; justify-content: stretch !important;
            overflow: hidden !important;
          }
          .a4-page {
            width: 210mm !important; height: 297mm !important;
            box-shadow: none !important; overflow: hidden !important;
          }
        }
      `}</style>
    </>
  );
}
