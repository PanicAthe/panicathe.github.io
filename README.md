<h1><a href="https://panicathe.github.io/">Panicathe's Interactive Portfolio</a></h1>

<br/>

## ✨ 주요 기능

- **3D 사원증 히어로**: `@react-three/rapier` 물리로 매달린 사원증을 드래그할 수 있습니다. 작은 화면·동작 줄이기 설정에서는 정적 카드로 대체하고, 3D 청크는 화면에 보일 때 늦게 불러옵니다.
- **겹쳐 쌓이는 프로젝트 카드**: 스크롤하면 카드가 위로 쌓이며, 카드에는 경량 WebP 썸네일(`public/images/projects/cards/`)만 사용합니다.
- **사이드 시트 모달 & 케이스 스터디 페이지**: 카드를 누르면 오른쪽 시트에서 성과·역할·기술 스택을 보고, `/project/:id` 상세 페이지로 이어집니다. 상세 주소는 새로고침·공유 링크로 바로 열 수 있습니다(`404.html` 폴백).
- **About 섹션**: 수상·교육·자격증을 3열로 보여주며, 수상 항목은 연관 프로젝트 모달로 연결됩니다.
- **공유 미리보기**: Open Graph 이미지(`public/og-image.png`)와 파비콘을 제공합니다.

<br/>

## 🛠️ 기술 스택

### Frontend
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

### 3D
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-000000?style=for-the-badge&logo=react&logoColor=white)

### Deployment
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

<br/>

## 🤖 AI 도구 활용

| AI 도구 | 활용 방식 |
|---|---|
| **Claude Code** | `CLAUDE.md` 규칙 정의, 위험 명령 차단 훅, 커스텀 슬래시 커맨드 4종 구축 |
| **Codex** | `.codex/` 문맥 문서 및 워크플로우 구성으로 AI 작업 환경 세팅 |

- 파일 수정 시 ESLint 자동 실행 (PostToolUse 훅)
- `/commit`, `/deploy`, `/pr`, `/new-component` 슬래시 커맨드로 반복 작업 표준화

<br/>

## 🚀 시작하기

### TypeCat 제품 홈페이지

- 소개: <https://panicathe.github.io/typecat/>
- 고객지원: <https://panicathe.github.io/typecat/support/>
- 개인정보처리방침: <https://panicathe.github.io/typecat/privacy/>
- 영어 페이지: <https://panicathe.github.io/typecat/en/>

TypeCat은 `public/typecat/`의 독립된 정적 페이지로 배포됩니다. React 포트폴리오의 프로젝트 목록·모달·상세 페이지에서 홈페이지로 연결합니다. 홈페이지 구성은 `scripts/typecat/home.py`, 번역·도움말·개인정보 본문은 `scripts/typecat/generate.py`, 공개 문의처는 같은 폴더의 `content.json`, 스타일과 이미지는 `public/typecat/assets/`에서 관리합니다.

```sh
python3 scripts/typecat/generate.py
npm run build
```

생성된 HTML의 이미지·탐색·언어 전환·canonical URL은 모두 `/typecat/` 경로를 사용합니다. 홈페이지 본문을 수정하면 생성 스크립트를 실행한 뒤 함께 커밋하세요. `dist/`는 직접 수정하지 않습니다.

### 선수 조건

- Node.js (v18 이상 권장)
- npm

### 로컬에서 실행하기

1. **저장소 복제:**
    ```sh
    git clone https://github.com/PanicAthe/panicathe.github.io.git
    cd panicathe.github.io
    ```

2. **의존성 설치:**
    ```sh
    npm install
    ```

3. **개발 서버 실행:**
    ```sh
    npm run dev
    ```
    브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

### 빌드 및 배포

```sh
npm run build       # 프로덕션 빌드 (dist/404.html 폴백 포함)
```

main 브랜치에 푸시하거나 PR을 머지하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해 GitHub Pages에 배포합니다.

<br/>

## 📂 프로젝트 구조

```
panicathe.github.io/
├── public/              # 정적 에셋 (이미지, 비디오 등)
├── src/
│   ├── assets/          # 코드에서 직접 참조하는 에셋
│   ├── components/      # 재사용 가능한 React 컴포넌트
│   ├── contexts/        # React Context (프로젝트·모달 상태)
│   ├── utils/           # 프로젝트 표시용 헬퍼
│   ├── pages/           # 페이지 단위 컴포넌트
│   ├── data/            # 포트폴리오 콘텐츠 데이터 (portfolio.js)
│   ├── App.jsx          # 라우팅, 레이아웃
│   └── main.jsx         # 애플리케이션 진입점
├── .claude/             # Claude Code 설정 (훅, 슬래시 커맨드)
├── .codex/              # Codex 에이전트용 문맥 문서
├── CLAUDE.md            # Claude Code 프로젝트 가이드
├── AGENTS.md            # Codex 에이전트 가이드
└── vite.config.js       # Vite 설정 파일
```

홈페이지의 캐릭터 전환·반응, 명시적으로 누른 음원 미리듣기, 브라우저용 타이머 체험은 `public/typecat/assets/site.js`에 있습니다. 앱의 기본 캐릭터 4종 이미지는 `assets/companions/`, 기본 음원 3종의 짧은 미리듣기는 `assets/sounds/`, 음원 출처는 `sound-credits.txt`에서 관리합니다. 타이머는 웹 체험용이며 설정을 저장하지 않습니다. 시스템의 동작 줄이기 설정을 따르고, 키보드 입력을 수집하는 이벤트는 등록하지 않습니다.

앱 화면 갤러리와 첫 실행 안내는 `scripts/typecat/media.py`에서 구성합니다. `assets/screens/`는 무료 배포판의 실제 SwiftUI/AppKit 컴포넌트로 만든 한영·라이트/다크 캡처이며 개인 파일을 포함하지 않습니다. `assets/reactions/`의 GIF는 앱의 실제 반응 체험 컨트롤러로 만든 60프레임/3초 미리보기입니다. 친구 컬러 밴드의 캐릭터는 평소 정지해 있고, 마우스를 올리면 투명 GIF가 재생됩니다. 클릭·터치·키보드 활성화로는 3초 동안 반응하며, 화면 밖에서는 정지합니다. 동작 줄이기를 켜면 호버 재생을 생략하고 명시적으로 활성화했을 때만 반응합니다. 원본 촬영 및 검증 정보는 `assets/media-provenance.json`을 참고하세요.

앱 UI 촬영 프리셋은 구름 테두리(`frameStyle = .cloud`)입니다. 이미지 교체 시 `media-provenance.json`의 해시·크기를 갱신하고, HTML 및 갤러리 스크립트의 이미지 버전 쿼리도 함께 갱신하여 이전 스크린샷 캐시를 피합니다.

메뉴바 미리보기는 투명 배경의 2배 해상도 PNG를 사용합니다. 캐릭터·음원 편집기 화면은 웹 갤러리에서 제외하며, 기존 원본 파일은 보관합니다.
