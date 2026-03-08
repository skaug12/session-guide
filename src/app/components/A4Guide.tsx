// HFK A4 Session Guide — Pretendard + Media 77
import hfkLogo from "../../assets/hfk-logo.png";

const F = {
  sans: "'Pretendard Variable', 'Pretendard', -apple-system, sans-serif",
  serif: "'Media 77', Georgia, 'Times New Roman', serif",
};

// ── Data ──────────────────────────────────────────
const timetable = [
  { time: "10:30 – 10:40", label: "스몰토크", main: false },
  { time: "10:40 – 11:40", label: "멤버 및 파트너 소개", main: true },
  { time: "11:40 – 11:50", label: "쉬는 시간", main: false },
  { time: "11:50 – 12:50", label: "파트너의 발표 진행", main: true },
  { time: "12:50 – 13:00", label: "4L 리뷰 작성", main: false },
];

const partner = { name: "박민우", org: "보이스랩" };
const members = [
  { name: "송서현", org: "서울특별시청" },
  { name: "김다영", org: "(주)다다씨앤씨" },
  { name: "서지희", org: "신젠타코리아" },
  { name: "이승원", org: "HD현대일렉트릭" },
  { name: "이홍진", org: "다이소코리아" },
  { name: "전소영", org: "아모레퍼시픽" },
  { name: "홍수경", org: "대한항공" },
];

const notices = [
  "봄시즌은 16개 팀, 멤버 123명, 파트너 17명, 크루 2명이 서로 자극을 주고 받으며 성장합니다.",
  "HFK의 모든 공지는 슬랙으로 전달드리지만, 별도 공지방을 카톡 팀 채팅방으로 오픈했습니다. 반드시 챙겨야 할 스케줄이니 꼭 확인해주세요.",
  "이번 봄에도 다양한 클럽이 오픈됩니다! 총 31개 클럽 — 온라인 8개, 오프라인 23개를 준비했습니다. (클럽 리스트는 슬랙과 카톡 팀 채팅방의 구글 링크에서 확인)",
];

const events = [
  { day: "03.18", dow: "수", time: "19:30–21:00", venue: "오아시스 덕수궁", title: "브랜드 토크: 태평양조" },
  { day: "03.21", dow: "토", time: "15:00–16:30", venue: "오아시스 덕수궁", title: "저자 북토크: <매출을 부르는 회계 감각>" },
  { day: "03.25", dow: "수", time: "19:30–21:00", venue: "오아시스 덕수궁", title: "PEST 브리핑" },
];

// ── Design tokens ─────────────────────────────────
const M = 44; // page margin
const ROW_H = 26; // unified row height for 4L + memo
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

// ── Section heading — black pill label ────────────
function Heading({ children }: { children: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span style={{
        display: "inline-block",
        fontSize: 9,
        fontWeight: 700,
        color: "#fff",
        background: C.black,
        padding: "3.5px 10px 3px",
        borderRadius: 2,
        letterSpacing: 0.3,
      }}>{children}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────
export function A4Guide() {
  return (
    <div
      className="a4-page"
      style={{
        width: 794,
        height: 1123,
        background: "#fff",
        fontFamily: F.sans,
        boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
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
        padding: `24px ${M}px 20px`,
        borderBottom: `1px solid ${C.rule}`,
        flexShrink: 0,
      }}>
        <div style={{
          fontSize: 10,
          fontWeight: 500,
          color: C.cap,
          letterSpacing: 0.2,
          marginBottom: 8,
        }}>
          2025 봄시즌&ensp;&middot;&ensp;소통의기술&ensp;&middot;&ensp;2025. 03. 07 토요일
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: C.faint, letterSpacing: -0.5 }}>01</span>
          <span style={{ fontSize: 21, fontWeight: 800, color: C.black, letterSpacing: -0.8 }}>정보-전달 시각화 1</span>
        </div>
      </div>

      {/* ▌ Quick info */}
      <div style={{
        padding: `9px ${M}px`,
        borderBottom: `1px solid ${C.rule}`,
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4px 0",
        fontSize: 8.5,
        lineHeight: 1.6,
        color: C.sub,
      }}>
        {[
          ["캘린더", "thehfk.org/calendar"],
          ["인스타그램", "@hfk_official"],
          ["Wi-Fi", "501_oasisdsg (pw. oasis00000)"],
          ["화장실", "W 4F (비번없음) · M 5F (0000)"],
        ].map(([label, value], i) => (
          <div key={i}>
            <span style={{ fontWeight: 700, color: C.dark, marginRight: 6 }}>{label}</span>
            {value}
          </div>
        ))}
      </div>

      {/* ▌ Two-column body */}
      <div style={{
        flex: 1,
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Center divider with top/bottom margin */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 20,
          bottom: 20,
          width: 1,
          background: C.ruleLight,
        }} />

        {/* ── Left ── */}
        <div style={{
          flex: 1,
          padding: `22px 22px 20px ${M}px`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>

          {/* Timetable */}
          <div style={{ marginBottom: 26 }}>
            <Heading>타임테이블</Heading>
            {timetable.map((row, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "baseline",
                padding: "7px 0",
                borderBottom: i < timetable.length - 1 ? `1px solid ${C.ruleLight}` : "none",
              }}>
                <span style={{
                  width: 106,
                  fontSize: 10,
                  fontWeight: 500,
                  color: row.main ? C.sub : C.faint,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: -0.2,
                  flexShrink: 0,
                }}>{row.time}</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: row.main ? 700 : 400,
                  color: row.main ? C.black : C.faint,
                  letterSpacing: -0.3,
                }}>{row.label}</span>
              </div>
            ))}
            <p style={{
              margin: "16px 0 0",
              fontSize: 9.5,
              color: C.sub,
              lineHeight: 1.65,
            }}>
              다음 <strong style={{ color: C.black }}>2회차</strong>는{" "}
              <strong style={{ color: C.black }}>3월 21일 (토) 10:30</strong>{" "}
              오아시스 덕수궁입니다.
            </p>
          </div>

          {/* Small talk */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Heading>스몰토크</Heading>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}>
              <span style={{
                fontSize: 7,
                fontWeight: 700,
                background: C.black,
                color: "#fff",
                padding: "2.5px 7px 2px",
                letterSpacing: 0.8,
                lineHeight: 1,
              }}>PARTNER</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.black, letterSpacing: -0.3 }}>
                {partner.name}
              </span>
              <span style={{ fontSize: 9.5, color: C.cap }}>{partner.org}</span>
            </div>

            {members.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "baseline",
                padding: "6px 0",
                borderBottom: `1px solid ${C.ruleLight}`,
                gap: 8,
              }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.dark,
                  letterSpacing: -0.2,
                  flexShrink: 0,
                  minWidth: 52,
                }}>{m.name}</span>
                <span style={{ fontSize: 9.5, color: C.cap, letterSpacing: -0.1 }}>{m.org}</span>
              </div>
            ))}

            <p style={{
              margin: "18px 0 0",
              fontSize: 9.5,
              color: C.cap,
              lineHeight: 1.65,
            }}>
              멤버에게 궁금한 질문이 있다면 자유롭게 공유해주세요.
            </p>
            <div style={{ flex: 1, minHeight: 50 }} />
          </div>
        </div>

        {/* ── Right ── */}
        <div style={{
          flex: 1,
          padding: `22px ${M}px 20px 22px`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>

          {/* Notices */}
          <div style={{ marginBottom: 26 }}>
            <Heading>주요 공지</Heading>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {notices.map((text, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    width: 18,
                    height: 18,
                    minWidth: 18,
                    background: C.black,
                    color: "#fff",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8.5,
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 2,
                  }}>{i + 1}</span>
                  <span style={{
                    fontSize: 10.5,
                    color: C.body,
                    lineHeight: 1.75,
                    letterSpacing: -0.1,
                  }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <Heading>다가오는 이벤트</Heading>
            {events.map((ev, i) => (
              <div key={i} style={{
                display: "flex",
                padding: "10px 0",
                borderBottom: `1px solid ${C.ruleLight}`,
                gap: 12,
              }}>
                <div style={{ width: 46, flexShrink: 0, textAlign: "center" as const }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.black, lineHeight: 1, letterSpacing: -0.5 }}>
                    {ev.day.split(".")[1]}
                  </div>
                  <div style={{ fontSize: 8, color: C.faint, marginTop: 3, fontWeight: 500 }}>
                    3월 ({ev.dow})
                  </div>
                </div>
                <div style={{ flex: 1, paddingTop: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.black, lineHeight: 1.35, letterSpacing: -0.2 }}>
                    {ev.title}
                  </div>
                  <div style={{ fontSize: 9, color: C.cap, marginTop: 4, lineHeight: 1.4 }}>
                    {ev.venue}&ensp;&middot;&ensp;{ev.time}
                  </div>
                </div>
              </div>
            ))}
            <p style={{ margin: "14px 0 0", fontSize: 8.5, color: C.faint, lineHeight: 1.65 }}>
              * 봄시즌 등록된 멤버 모두 참여 가능<br />
              * 슬랙의 각 이벤트 채널에서 신청
            </p>
          </div>
        </div>
      </div>

      {/* ▌ 4L Review + memo */}
      <div style={{
        margin: `0 ${M}px`,
        borderTop: `1.5px solid ${C.black}`,
        padding: `12px 0 24px`,
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.dark, letterSpacing: 0.5 }}>4L REVIEW</span>
          <div style={{ flex: 1, height: 1, background: C.ruleLight }} />
        </div>

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
