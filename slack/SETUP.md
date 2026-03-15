# growth 앱 — 핸드아웃 조회 설정 가이드

김재윤(Chief Crew)이 Slack에서 날짜를 입력하면 핸드아웃을 조회/다운로드할 수 있도록 설정합니다.

## 전체 흐름

```
김재윤: /handout 2026-03-14
        ↓
growth 앱 → Google Apps Script (서버리스 백엔드)
        ↓
    1. GitHub Pages index.json에서 핸드아웃 검색
    2. Google Calendar에서 해당 날짜 팀 세션 확인
        ↓
Slack 응답: 팀별 핸드아웃 링크 (버튼으로 열기)
        ↓
브라우저에서 핸드아웃 확인 → 인쇄/PDF 다운로드
```

## Step 1: Google Apps Script 배포

1. [script.google.com](https://script.google.com) 접속
2. **새 프로젝트** 생성, 이름: `HFK 핸드아웃 조회`
3. `handout-lookup.gs`의 코드를 붙여넣기
4. **배포** → **새 배포** 클릭
   - 유형: **웹 앱**
   - 실행 주체: **나** (sklee)
   - 액세스: **모든 사용자**
5. **배포** 클릭 → 웹 앱 URL 복사 (예: `https://script.google.com/macros/s/AKfyc.../exec`)

### Google Calendar 권한

- 첫 실행 시 Google Calendar 접근 권한 승인 필요
- HFK 캘린더 (`9744qeoh62655l2r1o6uegs2go@group.calendar.google.com`)에 대한 읽기 권한 확인

## Step 2: growth 앱에 Slash Command 추가

1. [api.slack.com/apps](https://api.slack.com/apps) 접속
2. **growth** 앱 선택
3. 왼쪽 메뉴 → **Slash Commands** → **Create New Command**
4. 설정:
   - **Command**: `/handout`
   - **Request URL**: Step 1에서 복사한 Google Apps Script 웹 앱 URL
   - **Short Description**: `세션 핸드아웃 조회`
   - **Usage Hint**: `[날짜] 예: 2026-03-14, 3월 14일, 오늘`
5. **Save** 클릭
6. 앱 재설치: **Install App** → **Reinstall to Workspace**

## Step 3: 사용법

Slack 어느 채널에서든:

```
/handout 2026-03-14
/handout 3월 14일
/handout 03/14
/handout 오늘
```

### 응답 예시

```
📋 2026. 3. 14 (토) 세션 핸드아웃

소통의기술  ·  01회차
정보-전달 시각화 1
                        [핸드아웃 열기]

넘버앤센스  ·  03회차
데이터 분석의 힘
                        [핸드아웃 열기]

───────────────────
전체 핸드아웃 목록 보기
```

- **핸드아웃 열기** 버튼 → 브라우저에서 A4 핸드아웃 렌더링
- 브라우저에서 **인쇄 / PDF 다운로드** 버튼 클릭 → PDF 저장

## 핸드아웃 등록 (운영자)

핸드아웃은 `/generate-handout` 실행 시 자동으로 GitHub Pages에 배포됩니다.

```
/generate-handout 2026-03-14
```

이 명령이 실행되면:
1. PDF가 ~/Downloads/에 생성됨
2. JSON 데이터가 public/data/handouts/에 저장됨
3. GitHub Pages에 자동 배포됨
4. 이후 `/handout 2026-03-14` 조회 시 바로 핸드아웃 링크 제공
