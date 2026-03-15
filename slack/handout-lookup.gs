/**
 * HFK 세션 조회 — Slack Slash Command + Handout Data API
 *
 * growth 앱의 /handout 슬래시 커맨드를 처리합니다.
 * 사용법: /handout (오늘) 또는 /handout 2026-03-14
 *
 * doGet API:
 *   ?date=2026-03-14           → 해당 날짜 세션 목록 (Slack 블록 형식)
 *   ?team=AI부사수&date=2026-03-14 → 해당 팀의 HandoutData JSON
 */

// ── 설정 ──────────────────────────────────────────
var GITHUB_PAGES_BASE = "https://skaug12.github.io/session-guide";
var CALENDAR_ID = "9744qeoh62655l2r1o6uegs2go@group.calendar.google.com";
var SHEET_ID = "1EcMzh2s3pe_ejwZ9eXO1GLviOR8a0DNVNtpXm291Oxo";
var SEASON_TAB = "26봄";
var SEASON_LABEL = "2026 봄시즌";

// 장소별 Wi-Fi / 화장실
var VENUE_INFO = {
  "오아시스 덕수궁": { wifi: { id: "501_oasisdsg", pw: "oasis00000" }, restroom: "W 4F (비번없음) · M 5F (0000)" },
  "소정동": { wifi: { id: "301_sojungdong", pw: "sojungdong00000" }, restroom: "W 4F (비번없음) · M 5F (0000)" },
};
var DEFAULT_VENUE = "오아시스 덕수궁";

// ── Slash Command 핸들러 ──────────────────────────
function doPost(e) {
  var text = (e.parameter.text || "").trim();

  var dateStr = text ? parseDate(text) : Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd");
  if (!dateStr) {
    return jsonResponse({
      response_type: "ephemeral",
      text: "날짜 형식을 확인해주세요.\n사용법: `/handout` (오늘) `/handout 2026-03-14` `/handout 3월 14일`"
    });
  }

  var teams = fetchTeamSessions(dateStr);
  var response = buildSlackResponse(dateStr, teams);

  return jsonResponse(response);
}

// ── GET API 핸들러 ────────────────────────────────
function doGet(e) {
  var teamParam = (e.parameter.team || "").trim();
  var dateParam = (e.parameter.date || "").trim();
  var dateStr = dateParam ? parseDate(dateParam) : Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd");

  if (!dateStr) {
    return jsonOutput({ error: "날짜 형식을 확인해주세요. 예: ?date=2026-03-14" });
  }

  // ?team=X&date=Y → HandoutData JSON 반환
  if (teamParam) {
    var handout = buildHandoutData(teamParam, dateStr);
    return jsonOutput(handout);
  }

  // ?date=Y → 세션 목록
  var teams = fetchTeamSessions(dateStr);
  return jsonOutput({ date: dateStr, teams: teams });
}

// ── HandoutData 생성 ─────────────────────────────
function buildHandoutData(teamName, dateStr) {
  // 1. 캘린더에서 세션 정보
  var session = findTeamSession(teamName, dateStr);
  var venue = (session && session.location) ? session.location : DEFAULT_VENUE;
  var venueInfo = VENUE_INFO[venue] || VENUE_INFO[DEFAULT_VENUE];

  // 2. 날짜 포맷
  var d = new Date(dateStr + "T00:00:00+09:00");
  var days = ["일", "월", "화", "수", "목", "금", "토"];
  var dateLabel = d.getFullYear() + ". " +
    String(d.getMonth() + 1).padStart(2, "0") + ". " +
    String(d.getDate()).padStart(2, "0") + " " +
    days[d.getDay()] + "요일";

  // 3. 타임테이블 (평일/주말)
  var dayOfWeek = d.getDay();
  var isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
  var timetable = isWeekend
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

  // 4. Google Sheets에서 파트너 & 멤버
  var peopleData = fetchTeamPeople(teamName);

  // 5. 다가오는 [이벤트] 조회
  var events = fetchUpcomingEvents(dateStr);

  // 6. 세션 회차 (해당 팀의 캘린더 이벤트 횟수로 추정)
  var sessionNumber = countTeamSessions(teamName, dateStr);

  // 7. 캘린더 이벤트 설명에서 주제 추출
  var topic = (session && session.description) ? extractTopic(session.description) : "";

  return {
    season: SEASON_LABEL,
    team: teamName,
    date: dateLabel,
    sessionNumber: sessionNumber ? String(sessionNumber).padStart(2, "0") : "",
    topic: topic,
    nextSession: "",
    venue: venue,
    timetable: timetable,
    partner: peopleData.partner,
    members: peopleData.members,
    notices: [],
    events: events,
    wifi: venueInfo.wifi,
    restroom: venueInfo.restroom,
  };
}

// ── 캘린더: 특정 팀 세션 찾기 ─────────────────────
function findTeamSession(teamName, dateStr) {
  try {
    var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    if (!calendar) return null;

    var startDate = new Date(dateStr + "T00:00:00+09:00");
    var endDate = new Date(dateStr + "T23:59:59+09:00");
    var events = calendar.getEvents(startDate, endDate);

    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var title = event.getTitle();
      var parsed = parseTeamName(title);
      if (parsed && parsed === teamName) {
        return {
          title: title,
          time: Utilities.formatDate(event.getStartTime(), "Asia/Seoul", "HH:mm") +
                "–" +
                Utilities.formatDate(event.getEndTime(), "Asia/Seoul", "HH:mm"),
          location: event.getLocation() || "",
          description: event.getDescription() || "",
        };
      }
    }
  } catch (e) {
    Logger.log("findTeamSession 오류: " + e.message);
  }
  return null;
}

// ── 캘린더: 팀 세션 회차 계산 ─────────────────────
function countTeamSessions(teamName, upToDateStr) {
  try {
    var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    if (!calendar) return 0;

    // 시즌 시작일부터 해당 날짜까지의 팀 이벤트 수
    var seasonStart = new Date("2025-09-01T00:00:00+09:00");
    var endDate = new Date(upToDateStr + "T23:59:59+09:00");
    var events = calendar.getEvents(seasonStart, endDate);

    var count = 0;
    for (var i = 0; i < events.length; i++) {
      var parsed = parseTeamName(events[i].getTitle());
      if (parsed && parsed === teamName) {
        count++;
      }
    }
    return count;
  } catch (e) {
    Logger.log("countTeamSessions 오류: " + e.message);
    return 0;
  }
}

// ── 캘린더: 다가오는 [이벤트] 조회 ───────────────
function fetchUpcomingEvents(fromDateStr) {
  try {
    var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    if (!calendar) return [];

    var startDate = new Date(fromDateStr + "T00:00:00+09:00");
    var endDate = new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000); // +3주
    var events = calendar.getEvents(startDate, endDate);
    var result = [];

    for (var i = 0; i < events.length; i++) {
      var title = events[i].getTitle();
      if (title.indexOf("[이벤트]") === -1) continue;

      var eventName = title.replace("[이벤트]", "").trim();
      var start = events[i].getStartTime();
      var end = events[i].getEndTime();
      var days = ["일", "월", "화", "수", "목", "금", "토"];

      result.push({
        day: Utilities.formatDate(start, "Asia/Seoul", "MM.dd"),
        dow: days[start.getDay()],
        time: Utilities.formatDate(start, "Asia/Seoul", "HH:mm") + "–" + Utilities.formatDate(end, "Asia/Seoul", "HH:mm"),
        venue: events[i].getLocation() || DEFAULT_VENUE,
        title: eventName,
      });
    }
    return result;
  } catch (e) {
    Logger.log("fetchUpcomingEvents 오류: " + e.message);
    return [];
  }
}

// ── Google Sheets: 파트너 & 멤버 조회 ─────────────
function fetchTeamPeople(teamName) {
  var result = { partner: { name: "", org: "" }, members: [] };

  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var ws = ss.getSheetByName(SEASON_TAB);
    if (!ws) return result;

    var data = ws.getDataRange().getValues();
    var foundTeam = false;

    for (var i = 0; i < data.length; i++) {
      var colA = String(data[i][0]).trim();
      var colB = String(data[i][1]).trim();
      var colC = String(data[i][2]).trim();
      var colD = String(data[i][3]).trim();

      // 팀명 매칭 (숫자로 시작하면 인원수이므로 무시)
      if (colA && !colA.match(/^\d/) && colA === teamName) {
        foundTeam = true;
        continue;
      }

      // 다른 팀이 시작되면 중단
      if (foundTeam && colA && !colA.match(/^\d/) && colA !== teamName) {
        break;
      }

      if (!foundTeam) continue;

      if (colB === "파트너") {
        result.partner = { name: colC, org: colD };
      } else if (colB === "첫등록" || colB === "재등록") {
        if (colC) {
          result.members.push({ name: colC, org: colD });
        }
      }
    }
  } catch (e) {
    Logger.log("fetchTeamPeople 오류: " + e.message);
  }

  return result;
}

// ── 이벤트 설명에서 주제 추출 ─────────────────────
function extractTopic(description) {
  if (!description) return "";
  // 줄바꿈으로 분리, 첫 번째 비어있지 않은 줄을 주제로
  var lines = description.split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].replace(/<[^>]*>/g, "").trim();
    if (line) return line;
  }
  return "";
}

// ── 날짜 파싱 ─────────────────────────────────────
function parseDate(text) {
  if (!text) return null;

  var isoMatch = text.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) return isoMatch[0];

  var krMatch = text.match(/(\d{1,2})월\s*(\d{1,2})일/);
  if (krMatch) {
    var now = new Date();
    var month = krMatch[1].padStart(2, "0");
    var day = krMatch[2].padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }

  var slashMatch = text.match(/(\d{1,2})\/(\d{1,2})/);
  if (slashMatch) {
    var now2 = new Date();
    var month2 = slashMatch[1].padStart(2, "0");
    var day2 = slashMatch[2].padStart(2, "0");
    return now2.getFullYear() + "-" + month2 + "-" + day2;
  }

  if (text === "오늘" || text === "today") {
    return Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd");
  }

  return null;
}

// ── Google Calendar에서 [팀] 이벤트 조회 ───────────
function fetchTeamSessions(dateStr) {
  try {
    var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    if (calendar) {
      return fetchViaCalendarApp(calendar, dateStr);
    }
    return [];
  } catch (e) {
    Logger.log("캘린더 조회 실패: " + e.message);
    return [];
  }
}

function parseTeamName(title) {
  var match = title.match(/\[팀\]\s*(.+)/);
  if (!match) return null;
  return match[1].replace(/\d+봄\s*/, "").replace(/\d+겨울\s*/, "").trim();
}

function fetchViaCalendarApp(calendar, dateStr) {
  var startDate = new Date(dateStr + "T00:00:00+09:00");
  var endDate = new Date(dateStr + "T23:59:59+09:00");
  var events = calendar.getEvents(startDate, endDate);
  var teams = [];

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var title = event.getTitle();
    var team = parseTeamName(title);
    if (team) {
      teams.push({
        team: team,
        title: title,
        time: Utilities.formatDate(event.getStartTime(), "Asia/Seoul", "HH:mm") +
              "–" +
              Utilities.formatDate(event.getEndTime(), "Asia/Seoul", "HH:mm"),
        location: event.getLocation() || ""
      });
    }
  }
  return teams;
}

// ── Slack 응답 생성 ───────────────────────────────
function buildSlackResponse(dateStr, teams) {
  var d = new Date(dateStr + "T00:00:00+09:00");
  var days = ["일", "월", "화", "수", "목", "금", "토"];
  var dateLabel = d.getFullYear() + ". " + (d.getMonth() + 1) + ". " + d.getDate() + " (" + days[d.getDay()] + ")";

  var blocks = [];

  blocks.push({
    type: "header",
    text: { type: "plain_text", text: "📋 " + dateLabel + " 세션 안내" }
  });

  if (teams.length === 0) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: "해당 날짜에 예정된 팀 세션이 없습니다." }
    });
    return { response_type: "ephemeral", blocks: blocks };
  }

  for (var i = 0; i < teams.length; i++) {
    var t = teams[i];
    var teamUrl = GITHUB_PAGES_BASE + "/?team=" + encodeURIComponent(t.team) + "&date=" + dateStr;
    var info = "*" + t.team + "*";
    if (t.time) info += "\n🕐 " + t.time;
    if (t.location) info += "  ·  📍 " + t.location;

    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: info },
      accessory: {
        type: "button",
        text: { type: "plain_text", text: "핸드아웃 열기" },
        url: teamUrl,
        action_id: "open_" + i
      }
    });
  }

  blocks.push({ type: "divider" });

  blocks.push({
    type: "actions",
    elements: [{
      type: "button",
      text: { type: "plain_text", text: "📄 전체 핸드아웃 (인쇄/PDF)" },
      url: GITHUB_PAGES_BASE + "/?date=" + dateStr,
      action_id: "open_all"
    }]
  });

  blocks.push({
    type: "context",
    elements: [{
      type: "mrkdwn",
      text: "총 " + teams.length + "개 팀 세션 예정"
    }]
  });

  return {
    response_type: "in_channel",
    blocks: blocks
  };
}

// ── JSON 응답 유틸 ────────────────────────────────
function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}
