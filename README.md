<h1><a href="https://panicathe.github.io/">Panicathe's Interactive Portfolio</a></h1>

<br/>

## ✨ 주요 기능

- **인터랙티브 프로젝트 목록**: 가로 스크롤을 통해 프로젝트 썸네일을 탐색할 수 있습니다.
- **프로젝트 상세 모달 & 페이지**: 프로젝트 클릭 시 기술 스택, 기여 역할, 데모 영상 등을 모달 또는 별도 페이지(`/project/:id`)에서 확인할 수 있습니다.
- **기술 스택 숙련도 시각화**: 프로젝트 참여 횟수 기반으로 스택별 숙련도를 색상으로 표시합니다.
- **동적 텍스트 효과**: GSAP SplitText와 디코딩 애니메이션으로 시각적 인터랙션을 제공합니다.
- **수상 / 자격증 섹션**: 수상 항목 클릭 시 연관 프로젝트 모달로 연결됩니다.

<br/>

## 🛠️ 기술 스택

### Frontend
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

### Animation
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white)

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
npm run build       # 프로덕션 빌드
npm run deploy      # GitHub Pages 배포
```

<br/>

## 📂 프로젝트 구조

```
panicathe.github.io/
├── public/              # 정적 에셋 (이미지, 비디오 등)
├── src/
│   ├── assets/          # 코드에서 직접 참조하는 에셋
│   ├── components/      # 재사용 가능한 React 컴포넌트
│   ├── contexts/        # React Context (테마, 프로젝트 상태)
│   ├── pages/           # 페이지 단위 컴포넌트
│   ├── App.jsx          # 라우팅, 레이아웃, 포트폴리오 데이터
│   └── main.jsx         # 애플리케이션 진입점
├── .claude/             # Claude Code 설정 (훅, 슬래시 커맨드)
├── .codex/              # Codex 에이전트용 문맥 문서
├── CLAUDE.md            # Claude Code 프로젝트 가이드
├── AGENTS.md            # Codex 에이전트 가이드
└── vite.config.js       # Vite 설정 파일
```
