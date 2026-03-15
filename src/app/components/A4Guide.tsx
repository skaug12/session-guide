// HFK A4 Session Guide — Pretendard + Media 77
import hfkLogo from "../../assets/hfk-logo.png";

const F = {
  sans: "'Pretendard Variable', 'Pretendard', -apple-system, sans-serif",
  serif: "'Media 77', Georgia, 'Times New Roman', serif",
};

// ── Types ─────────────────────────────────────────
export interface HandoutData {
  season: string;
  team: string;
  date: string;
  sessionNumber: string;
  topic: string;
  nextSession: string;
  venue: string;
  timetable: { time: string; label: string; main: boolean }[];
  partner: { name: string; org: string };
  members: { name: string; org: string }[];
  notices: string[];
  events: { day: string; dow: string; time: string; venue: string; title: string }[];
  wifi: { id: string; pw: string };
  restroom: string;
}

// ── Default Data (PDF 생성 호환용) ────────────────
const defaultData: HandoutData = {
  season: "2026 봄시즌",
  team: "저스트두잇",
  date: "2026. 03. 17 화요일",
  sessionNumber: "01",
  topic: "나를 소개하는 Zine 만들기",
  nextSession: "다음 <strong>2회차</strong>는 <strong>3월 31일 (화) 19:30</strong> 오아시스 덕수궁입니다.",
  venue: "오아시스 덕수궁",
  timetable: [
    { time: "19:30 – 19:40", label: "스몰토크", main: false },
    { time: "19:40 – 20:40", label: "멤버 및 파트너 소개", main: true },
    { time: "20:40 – 20:50", label: "쉬는 시간", main: false },
    { time: "20:50 – 21:50", label: "파트너의 발표 진행", main: true },
    { time: "21:50 – 22:00", label: "4L 리뷰 작성", main: false },
  ],
  partner: { name: "김보경", org: "금은보화" },
  members: [
    { name: "유선영", org: "초등교사" },
    { name: "강국주", org: "위즈팜" },
    { name: "김규리", org: "프리랜서" },
    { name: "박소현", org: "fadó" },
    { name: "유희경", org: "매일경제신문" },
  ],
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
  wifi: { id: "501_oasisdsg", pw: "oasis00000" },
  restroom: "W 4F (비번없음) · M 5F (0000)",
};

// ── Design tokens ─────────────────────────────────
const M = 44; // page margin
const ROW_H = 22; // unified row height for 4L + memo
const C = {
  black: "#0f0f0f",
  dark: "#2a2a2a",
  body: "#3d3d3d",
  sub: "#6b6b6b",
  cap: "#8e8e8e",
  faint: "#b5b5b5",
  rule: "#d9d9d9",
  ruleLight: "#ebebeb",
  bg: "#f6f6f6",
};

// ── Section heading — dark pill tag ───────────────
function Heading({ children }: { children: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <span style={{
        display: "inline-block",
        fontSize: 8,
        fontWeight: 700,
        color: "#fff",
        letterSpacing: 0.5,
        background: C.dark,
        padding: "3.5px 10px 3px",
        borderRadius: 10,
      }}>{children}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────
export function A4Guide({ data }: { data?: HandoutData }) {
  const d = data ?? defaultData;

  return (
    <div
      className="a4-page"
      style={{
        width: 794,
        height: 1123,
        background: "#fff",
        fontFamily: F.sans,
        boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >

      {/* ▌ Brand bar */}
      <div style={{
        height: 44,
        background: C.black,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${M}px`,
        flexShrink: 0,
      }}>
        <img src={hfkLogo} alt="HFK" style={{ height: 16 }} />
        <span style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 9.5,
          fontFamily: F.serif,
          letterSpacing: 0.3,
          fontWeight: 400,
        }}>Your Growth Matters.</span>
      </div>

      {/* ▌ Title */}
      <div style={{
        padding: `20px ${M}px 16px`,
        borderBottom: `1px solid ${C.rule}`,
        flexShrink: 0,
      }}>
        <div style={{
          fontSize: 10,
          fontWeight: 500,
          color: C.cap,
          letterSpacing: 0.2,
          marginBottom: 6,
        }}>
          {d.season}&ensp;&middot;&ensp;{d.team}&ensp;&middot;&ensp;{d.date}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 400, color: C.cap, letterSpacing: -0.5, fontFamily: F.serif }}>{d.sessionNumber}</span>
          <span style={{ fontSize: 21, fontWeight: 800, color: C.black, letterSpacing: -0.8 }}>{d.topic}</span>
        </div>
      </div>

      {/* ▌ Quick info */}
      <div style={{
        padding: `8px ${M}px`,
        borderBottom: `1px solid ${C.rule}`,
        background: C.bg,
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3px 0",
        fontSize: 8.5,
        lineHeight: 1.6,
        color: C.sub,
      }}>
        {[
          ["캘린더", "thehfk.org/calendar"],
          ["인스타그램", "@hfk_official"],
          ["Wi-Fi", `${d.wifi.id} (pw. ${d.wifi.pw})`],
          ["화장실", d.restroom],
        ].map(([label, value], i) => (
          <div key={i}>
            <span style={{ fontWeight: 700, color: C.dark, marginRight: 6 }}>{label}</span>
            {value}
          </div>
        ))}
      </div>

      {/* ▌ Two-column body */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto",
        paddingBottom: 230,
        overflow: "hidden",
      }}>

        {/* ── Top-left: Timetable ── */}
        <div style={{
          padding: `18px 22px 16px ${M}px`,
        }}>
          <Heading>타임테이블</Heading>
          {d.timetable.map((row, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "baseline",
              padding: "6px 0",
              borderBottom: i < d.timetable.length - 1 ? `1px solid ${C.ruleLight}` : "none",
            }}>
              <span style={{
                width: 106,
                fontSize: 9.5,
                fontWeight: 500,
                color: row.main ? C.sub : C.faint,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: -0.2,
                flexShrink: 0,
              }}>{row.time}</span>
              <span style={{
                fontSize: 10.5,
                fontWeight: row.main ? 700 : 400,
                color: row.main ? C.black : C.faint,
                letterSpacing: -0.3,
              }}>{row.label}</span>
            </div>
          ))}
          <p style={{
            margin: "14px 0 0",
            fontSize: 9,
            color: C.sub,
            lineHeight: 1.65,
          }} dangerouslySetInnerHTML={{ __html: d.nextSession }} />
        </div>

        {/* ── Top-right: Notices ── */}
        <div style={{
          padding: `18px ${M}px 16px 22px`,
        }}>
          <Heading>주요 공지</Heading>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {d.notices.map((text, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  color: C.black,
                  flexShrink: 0,
                  minWidth: 14,
                  marginTop: 1,
                }}>{i + 1}</span>
                <span style={{
                  fontSize: 10,
                  color: C.body,
                  lineHeight: 1.7,
                  letterSpacing: -0.1,
                }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Horizontal divider ── */}
        <div style={{
          gridColumn: "1 / -1",
          margin: `0 ${M}px`,
          borderTop: `1px solid ${C.ruleLight}`,
        }} />

        {/* ── Bottom-left: Small talk ── */}
        <div style={{
          padding: `16px 22px 16px ${M}px`,
          display: "flex",
          flexDirection: "column",
        }}>
          <Heading>스몰토크</Heading>
          <div style={{ marginBottom: 12 }}>
            <div style={{
              fontSize: 7.5,
              fontWeight: 700,
              color: C.cap,
              letterSpacing: 0.8,
              lineHeight: 1,
              marginBottom: 5,
            }}>PARTNER</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: C.black, letterSpacing: -0.3 }}>
                {d.partner.name}
              </span>
              <span style={{ fontSize: 9, color: C.cap }}>{d.partner.org}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            {d.members.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "baseline",
                padding: "4px 0",
                borderBottom: `1px solid ${C.ruleLight}`,
                gap: 6,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: C.dark,
                  letterSpacing: -0.2,
                  flexShrink: 0,
                }}>{m.name}</span>
                <span style={{ fontSize: 8, color: C.cap, letterSpacing: -0.1 }}>{m.org}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom-right: Events ── */}
        <div style={{
          padding: `16px ${M}px 16px 22px`,
          display: "flex",
          flexDirection: "column",
        }}>
          <Heading>다가오는 이벤트</Heading>
          {d.events.map((ev, i) => (
            <div key={i} style={{
              display: "flex",
              padding: "8px 0",
              borderBottom: `1px solid ${C.ruleLight}`,
              gap: 12,
            }}>
              <div style={{ width: 46, flexShrink: 0, textAlign: "center" as const }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.black, lineHeight: 1, letterSpacing: -0.5 }}>
                  {ev.day.split(".")[1]}
                </div>
                <div style={{ fontSize: 7.5, color: C.faint, marginTop: 3, fontWeight: 500 }}>
                  {ev.day.split(".")[0]}월 ({ev.dow})
                </div>
              </div>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.black, lineHeight: 1.35, letterSpacing: -0.2 }}>
                  {ev.title}
                </div>
                <div style={{ fontSize: 8.5, color: C.cap, marginTop: 3, lineHeight: 1.4 }}>
                  {ev.venue}&ensp;&middot;&ensp;{ev.time}
                </div>
              </div>
            </div>
          ))}
          <p style={{ margin: "12px 0 0", fontSize: 8, color: C.faint, lineHeight: 1.65 }}>
            * 봄시즌 등록된 멤버 모두 참여 가능<br />
            * 슬랙의 각 이벤트 채널에서 신청
          </p>
        </div>
      </div>

      {/* ▌ 4L Review + memo */}
      <div style={{
        position: "absolute" as const,
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        borderTop: `1.5px solid ${C.black}`,
        padding: `16px ${M}px 16px`,
      }}>
        <Heading>4L REVIEW</Heading>

        {[
          { key: "Liked", desc: "오늘 좋았던 점" },
          { key: "Learned", desc: "새로 배우거나, 다시 깨닫게 된 부분" },
          { key: "Lacked", desc: "앞으로 채우고 싶은 부분" },
          { key: "Long for", desc: "오늘을 바탕으로 시도해보고 싶은 것" },
          null, null, null, null,
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            height: ROW_H,
            borderBottom: `1px solid ${C.ruleLight}`,
          }}>
            {item && (
              <>
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: C.dark,
                  width: 62,
                  flexShrink: 0,
                  letterSpacing: -0.2,
                }}>{item.key}</span>
                <span style={{ fontSize: 8.5, color: C.faint }}>{item.desc}</span>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
