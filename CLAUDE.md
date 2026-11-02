# Portfolio Project - Claude Instructions

## 프로젝트 개요
GitHub Pages에 배포되는 개인 포트폴리오 사이트 (`https://panicathe.github.io`)

## 기술 스택
- **Framework**: React 19 + Vite 7
- **3D**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- **Routing**: react-router-dom v7
- **Styling**: 일반 `.css` 파일 import 방식 (CSS Modules 아님)
- **Lint**: ESLint 9
- **Deploy**: GitHub Actions → GitHub Pages (main 푸시 시 자동)

## 컴포넌트 구조
```text
src/
  App.jsx              - 라우팅 및 전체 레이아웃
  components/
    Header/            - 네비게이션
    Hero/              - 메인 히어로 (타이포 + 사원증)
    Lanyard/           - 3D 사원증 (R3F + rapier, 지연 로딩)
    Marquee/           - 기술 스택 띠
    WorkStack/         - 겹쳐 쌓이는 프로젝트 카드
    About/             - 수상·교육·자격증
    Footer/            - 연락(LET'S TALK) 푸터
    ProjectModal/      - 프로젝트 사이드 시트 모달
    ProjectSections/   - 모달·상세 페이지 공용 섹션 (성과·역할·스택·링크·썸네일)
    Lightbox/          - 이미지 라이트박스 (상세 페이지)
    LanguageSwitch/    - KO/EN 언어 전환 링크 (헤더·상세 페이지)
  data/                - 포트폴리오 콘텐츠 데이터 (profile, 프로젝트, 수상, 교육, 자격증)
  contexts/            - React Context (언어, 프로젝트·모달 상태)
  utils/               - 카드·모달·상세 페이지 공용 표시 헬퍼
  pages/               - 라우트별 페이지
  assets/              - 이미지, 문서 등 정적 자산
```

## 현재 프로젝트 구조 메모
- 프로젝트, 수상, 교육, 자격증, 연락처 데이터는 `src/data/portfolio.js`에 모여 있음 (수상은 `projectId`로 프로젝트에 자동 연결)
- 다국어(한/영): 주소가 `/en`으로 시작하면 영어. 화면 문구는 `src/data/messages.js`, 영어 콘텐츠는 `src/data/portfolio.en.js`(id별 덮어쓰기)
  - 컴포넌트는 `useLanguage()`로 `t`(문구), `content`(언어별 데이터), `localePath()`(언어 주소)를 받는다
  - 한국어 콘텐츠를 고치면 `portfolio.en.js`의 같은 id 항목도 함께 고칠 것
  - 영어 프로젝트 이름은 "제목 - 부제" 형식, 수상 문장에는 수상 label 문구(이모지 제외)를 그대로 넣어야 수상 카드와 중복되지 않음
- 메인 화면은 섹션 기반 단일 페이지이고 프로젝트 상세는 `/project/:projectId` 라우트를 사용 (영어는 앞에 `/en`)
- 모달 UX와 상세 페이지 UX가 함께 존재하므로 둘 중 하나를 건드리면 다른 쪽 영향도 확인
- 메인 카드는 `cardImageUrl`(경량 WebP), 모달·상세 페이지는 `thumbnailUrl`과 갤러리 원본을 사용함
- 상세 주소 직접 접속은 빌드 시 생성되는 `dist/404.html` 폴백으로 처리함
- 큰 구조 개편은 사용자가 명시적으로 원할 때만 진행

## 커밋 메시지 규칙
이모지 prefix를 반드시 사용한다:

| 타입 | 이모지 | 예시 |
|------|--------|------|
| 새 기능 | ✨ | `✨ 프로젝트 모달 애니메이션 추가` |
| 버그 수정 | 🐛 | `🐛 헤더 스크롤 버그 수정` |
| 스타일/UI | 💄 | `💄 배너 레이아웃 개선` |
| 리팩토링 | ♻️ | `♻️ Row 컴포넌트 리팩토링` |
| 콘텐츠 수정 | 📝 | `📝 프로젝트 설명 수정` |
| 이미지/에셋 | 🖼️ | `🖼️ 프로젝트 썸네일 교체` |
| 삭제 | 🔥 | `🔥 미사용 컴포넌트 삭제` |
| 청소/잡일 | 🧹 | `🧹 미사용 import 정리` |

- 커밋 메시지는 반드시 한국어로 작성
- 커밋 전 사용자에게 메시지 확인 요청

## 코딩 규칙
- 컴포넌트는 함수형으로 작성
- 스타일은 컴포넌트와 같은 폴더의 `.css` 파일에 작성
- 변수명은 camelCase, 컴포넌트명은 PascalCase
- 새 컴포넌트 추가 시 `src/components/컴포넌트명/` 폴더 생성
- `no-unused-vars` 규칙: 대문자로 시작하는 변수는 예외 (`varsIgnorePattern: '^[A-Z_]'`)
- 기존 레이아웃과 애니메이션 톤을 크게 깨지 않는 선에서 수정
- 데이터 구조를 손댈 때는 `src/data/portfolio.js`, `utils/project.js`(`getProjectView`), `WorkStack`, `ProjectModal`, `ProjectDetailPage` 영향 범위를 함께 확인

## 배포
- main 브랜치에 푸시(또는 PR 머지)하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해 GitHub Pages에 배포한다
- 머지 전 로컬에서 `npm run lint`, `npm run build` 확인

## 파일 삭제 규칙
- 파일 또는 폴더 삭제 전 반드시 사용자에게 확인받을 것
- 삭제 대신 주석 처리나 백업을 먼저 제안할 것
- `git reset --hard`, `git clean` 등 되돌리기 어려운 git 명령어도 사용자 승인 필수

## 주의사항
- `dist/` 폴더는 빌드 결과물이므로 직접 수정 금지
- 이미지 등 정적 파일은 `public/` 또는 `src/assets/`에 추가
- Three.js 컴포넌트는 `<Canvas>` 안에서만 사용
- 현재 환경에 따라 `git` 명령이 safe.directory 문제로 막힐 수 있음
