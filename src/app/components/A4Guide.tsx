// HFK A4 Meeting Guide — Pretendard / Editorial B&W

const F = {
  sans: "'Pretendard Variable', 'Pretendard', -apple-system, sans-serif",
};

// ── Data ──────────────────────────────────────────
const timetable = [
  { time: "10:30 ~ 10:40", title: "스몰토크", bold: false },
  { time: "10:40 ~ 11:40", title: "멤버 및 파트너 소개", bold: true },
  { time: "11:40 ~ 11:50", title: "쉬는 시간", bold: false },
  { time: "11:50 ~ 12:50", title: "파트너의 발표 진행", bold: true },
  { time: "12:50 ~ 13:00", title: "4L 리뷰 작성", bold: false },
];

const smallTalkPartner = "박민우  보이스랩";
const smallTalkMembers = [
  { name: "송서현", company: "서울특별시청" },
  { name: "김다영", company: "(주)다다씨앤씨" },
  { name: "서지희", company: "신젠타코리아" },
  { name: "이승원", company: "HD현대일렉트릭" },
  { name: "이홍진", company: "다이소코리아" },
  { name: "전소영", company: "아모레퍼시픽" },
  { name: "홍수경", company: "대한항공" },
];

const notices = [
  "봄시즌은 16개 팀, 멤버 123명, 파트너 17명, 크루 2명이 지역 자극을 주고 받으며 성장합니다.",
  "HFK의 모든 공지는 슬랙으로 전달드리지만, 별도 공지방을 카톡 팀 채팅방으로 오픈했습니다. HFK 봄시즌을 참여하며 반드시 챙겨야 할 것들 스케줄이니 꼭 확인해주세요.",
  "이번 봄에도 다양한 클럽이 오픈됩니다! 총 31개 클럽이 여러분을 기다립니다. 온라인클럽 8개, 오프라인클럽 23개를 준비했습니다. (클럽 리스트는 HFK 슬랙과 카톡 팀 채팅방에 공유된 구글 링크에서 확인)",
];

const events = [
  { month: "3월", day: "18", dow: "수", time: "19:30 – 21:00", venue: "오아시스 덕수궁", desc: "브랜드 토크: 태평양조" },
  { month: "3월", day: "21", dow: "토", time: "15:00 – 16:30", venue: "오아시스 덕수궁", desc: "저자 북토크: <매출을 부르는 회계 감각>" },
  { month: "3월", day: "25", dow: "수", time: "19:30 – 21:00", venue: "오아시스 덕수궁", desc: "PEST 브리핑" },
];

const eventNotes = [
  "봄시즌 등록된 멤버 모두가 참여 가능합니다.",
  "슬랙의 2번으로 시작하는 각 이벤트별 채널에서 신청할 수 있습니다.",
];

// ── Sub-components ────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{
      padding: "6px 20px",
      background: "#f6f6f6",
      borderBottom: "1px solid #e8e8e8",
      display: "flex",
      alignItems: "center",
      gap: 7,
      flexShrink: 0,
    }}>
      <div style={{ width: 2.5, height: 11, background: "#222", flexShrink: 0 }} />
      <span style={{
        fontSize: 8.5,
        fontWeight: 700,
        color: "#222",
        letterSpacing: 0.8,
        textTransform: "uppercase" as const,
        fontFamily: F.sans,
      }}>
        {title}
      </span>
    </div>
  );
}

// ── Component ─────────────────────────────────────
export function A4Guide() {
  return (
    <div style={{
      width: 794,
      height: 1123,
      overflow: "hidden",
      background: "#fff",
      fontFamily: F.sans,
      boxShadow: "0 8px 48px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Header ── */}
      <div style={{
        height: 38,
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        flexShrink: 0,
      }}>
        <span style={{
          color: "#fff",
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: 3,
          fontFamily: F.sans,
        }}>HFK</span>
        <span style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 9.5,
          fontStyle: "italic",
          letterSpacing: 0.3,
          fontWeight: 300,
        }}>
          Your Growth Matters.
        </span>
      </div>

      {/* ── Title Block ── */}
      <div style={{
        padding: "0 28px",
        borderBottom: "2px solid #111",
        flexShrink: 0,
        display: "flex",
        alignItems: "stretch",
        height: 72,
      }}>
        {/* Left: text stack */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{
              fontSize: 9.5,
              fontWeight: 500,
              color: "#888",
              letterSpacing: -0.1,
            }}>2025 봄시즌</span>
            <span style={{ color: "#ddd", fontSize: 10 }}>·</span>
            <span style={{
              fontSize: 9.5,
              fontWeight: 500,
              color: "#888",
              letterSpacing: -0.1,
            }}>소통의기술</span>
            <span style={{ color: "#ddd", fontSize: 10 }}>·</span>
            <span style={{
              fontSize: 9.5,
              fontWeight: 500,
              color: "#888",
              letterSpacing: -0.1,
            }}>2025. 03. 07 (토)</span>
          </div>
          <div style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#111",
            letterSpacing: -0.5,
            lineHeight: 1,
          }}>
            1회차.&ensp;정보-전달 시각화 1
          </div>
        </div>

        {/* Right: large session number */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: 6,
          paddingLeft: 16,
        }}>
          <span style={{
            fontSize: 58,
            fontWeight: 900,
            color: "#ebebeb",
            letterSpacing: -4,
            lineHeight: 1,
            fontFamily: F.sans,
            userSelect: "none",
          }}>01</span>
        </div>
      </div>

      {/* ── Info Bar ── */}
      <div style={{
        padding: "6px 28px",
        borderBottom: "1px solid #e0e0e0",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap" as const,
        gap: 0,
        background: "#fafafa",
      }}>
        {[
          { label: "캘린더", value: "thehfk.org/calendar" },
          { label: "인스타그램", value: "@hfk_official" },
          { label: "와이파이", value: "501_oasisdsg  (pw. oasis00000)" },
          { label: "화장실", value: "W 4F (비번없음)  ·  M 5F (0000)" },
        ].map((item, i, arr) => (
          <span key={i} style={{ display: "flex", alignItems: "center", fontSize: 9 }}>
            <span style={{ fontWeight: 700, color: "#222", letterSpacing: 0 }}>{item.label}</span>
            <span style={{ color: "#777", marginLeft: 5, letterSpacing: -0.1 }}>{item.value}</span>
            {i < arr.length - 1 && (
              <span style={{ margin: "0 12px", color: "#d8d8d8" }}>|</span>
            )}
          </span>
        ))}
      </div>

      {/* ── Main 2-col Grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        flex: 1,
        overflow: "hidden",
        borderBottom: "none",
      }}>

        {/* ── LEFT COL ── */}
        <div style={{
          borderRight: "1px solid #e4e4e4",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>

          {/* Timetable */}
          <div style={{ flexShrink: 0, borderBottom: "1px solid #e4e4e4" }}>
            <SectionHeader title="타임테이블" />
            <div style={{ padding: "11px 22px 13px" }}>
              {timetable.map((row, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 0",
                  borderBottom: i < timetable.length - 1 ? "1px solid #f2f2f2" : "none",
                }}>
                  <span style={{
                    width: 100,
                    fontSize: 9.5,
                    color: row.bold ? "#333" : "#bbb",
                    fontWeight: row.bold ? 500 : 400,
                    letterSpacing: -0.2,
                    flexShrink: 0,
                  }}>{row.time}</span>
                  <span style={{
                    fontSize: row.bold ? 10.5 : 10,
                    color: "#111",
                    fontWeight: row.bold ? 700 : 400,
                    letterSpacing: -0.2,
                  }}>{row.title}</span>
                </div>
              ))}
              <div style={{
                marginTop: 11,
                paddingTop: 10,
                borderTop: "1px solid #eee",
                fontSize: 9,
                color: "#888",
                lineHeight: 1.65,
                letterSpacing: -0.1,
              }}>
                다음 <strong style={{ color: "#111", fontWeight: 700 }}>2회차</strong>는{" "}
                <strong style={{ color: "#111", fontWeight: 700 }}>3월 21일 (토) 10:30</strong> 오아시스 덕수궁입니다.
              </div>
            </div>
          </div>

          {/* HFK 주요 공지 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <SectionHeader title="HFK 주요 공지" />
            <div style={{ padding: "13px 22px 16px", display: "flex", flexDirection: "column", gap: 13 }}>
              {notices.map((text, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <span style={{
                    width: 18,
                    height: 18,
                    minWidth: 18,
                    border: "1.5px solid #222",
                    color: "#222",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 1.5,
                    letterSpacing: 0,
                  }}>{i + 1}</span>
                  <span style={{
                    fontSize: 9.5,
                    color: "#444",
                    lineHeight: 1.75,
                    letterSpacing: -0.1,
                  }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COL ── */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* 스몰토크 */}
          <div style={{ flexShrink: 0, borderBottom: "1px solid #e4e4e4" }}>
            <SectionHeader title="스몰토크" />
            <div style={{ padding: "11px 22px 13px" }}>
              {/* Partner */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingBottom: 9,
                marginBottom: 8,
                borderBottom: "1px solid #eeeeee",
              }}>
                <span style={{
                  fontSize: 7.5,
                  fontWeight: 700,
                  border: "1px solid #222",
                  color: "#222",
                  padding: "1.5px 6px",
                  letterSpacing: 0.5,
                  textTransform: "uppercase" as const,
                  flexShrink: 0,
                }}>PARTNER</span>
                <span style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#111",
                  letterSpacing: -0.2,
                }}>
                  {smallTalkPartner}
                </span>
              </div>
              {/* Members */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {smallTalkMembers.map((m, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4.5px 0",
                    borderBottom: i < smallTalkMembers.length - 1 ? "1px solid #f3f3f3" : "none",
                  }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#111",
                      minWidth: 54,
                      letterSpacing: -0.2,
                    }}>{m.name}</span>
                    <span style={{
                      fontSize: 9,
                      color: "#888",
                      letterSpacing: -0.1,
                    }}>{m.company}</span>
                  </div>
                ))}
              </div>
              {/* Note */}
              <div style={{
                marginTop: 10,
                paddingTop: 9,
                borderTop: "1px solid #eee",
                fontSize: 9,
                color: "#999",
                lineHeight: 1.65,
                letterSpacing: -0.1,
              }}>
                모임 진행 중 멤버에게 궁금하지만 미처 들어보지 못한 질문이 있다면 자유롭게 공유해주세요.
                <span style={{ color: "#c0c0c0" }}> (예: 업계 소식, 커리어 고민 등)</span>
              </div>
            </div>
          </div>

          {/* 다가오는 이벤트 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <SectionHeader title="다가오는 이벤트" />
            <div style={{ padding: "13px 22px 16px" }}>
              {events.map((ev, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 13,
                  alignItems: "flex-start",
                  padding: "8px 0",
                  borderBottom: i < events.length - 1 ? "1px solid #f2f2f2" : "none",
                }}>
                  {/* Date badge */}
                  <div style={{
                    flexShrink: 0,
                    width: 44,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 1,
                  }}>
                    <span style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#111",
                      lineHeight: 1,
                      letterSpacing: -1,
                    }}>
                      {ev.day}
                    </span>
                    <span style={{
                      fontSize: 8.5,
                      color: "#aaa",
                      marginTop: 2,
                      letterSpacing: -0.1,
                      fontWeight: 400,
                    }}>
                      {ev.month} ({ev.dow})
                    </span>
                  </div>
                  {/* Divider */}
                  <div style={{
                    width: 1,
                    alignSelf: "stretch",
                    background: "#e8e8e8",
                    flexShrink: 0,
                  }} />
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: "#111",
                      lineHeight: 1.4,
                      letterSpacing: -0.2,
                    }}>
                      {ev.desc}
                    </div>
                    <div style={{
                      fontSize: 9,
                      color: "#999",
                      marginTop: 3,
                      letterSpacing: -0.1,
                    }}>
                      {ev.venue}&ensp;·&ensp;{ev.time}
                    </div>
                  </div>
                </div>
              ))}
              {/* Notes */}
              <div style={{
                marginTop: 11,
                paddingTop: 10,
                borderTop: "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}>
                {eventNotes.map((note, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: 7,
                    alignItems: "flex-start",
                    fontSize: 9,
                    color: "#888",
                    lineHeight: 1.65,
                    letterSpacing: -0.1,
                  }}>
                    <span style={{
                      color: "#aaa",
                      fontWeight: 500,
                      fontSize: 11,
                      flexShrink: 0,
                      lineHeight: 1.4,
                    }}>·</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 2, background: "#111", flexShrink: 0 }} />

      {/* ── Memo ── */}
      <div style={{
        padding: "13px 28px 20px",
        display: "flex",
        flexDirection: "column",
        height: 230,
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 9,
        }}>
          <span style={{
            fontSize: 8.5,
            fontWeight: 700,
            color: "#222",
            letterSpacing: 1.5,
            textTransform: "uppercase" as const,
          }}>Memo</span>
          <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
        </div>
        <div style={{
          flex: 1,
          border: "1px solid #d8d8d8",
          position: "relative",
          overflow: "hidden",
        }}>
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.9" fill="#e4e4e4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

    </div>
  );
}
