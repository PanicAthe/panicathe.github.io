# AGENTS.md

## 프로젝트 요약
- GitHub Pages로 배포되는 개인 포트폴리오 사이트
- 배포 주소: `https://panicathe.github.io`
- Vite 기반 React SPA

## 기술 스택
- React 19
- Vite 7
- react-router-dom 7
- Three.js + `@react-three/fiber` + `@react-three/drei` + `@react-three/rapier`
- GSAP, Motion
- CSS Modules가 아닌 일반 `.css` 파일 사용
- ESLint 9

## 주요 경로
```text
src/
  App.jsx                 # 전체 레이아웃과 라우팅
  components/             # 재사용 컴포넌트
  contexts/               # 테마, 프로젝트 상태
  pages/                  # 라우트 단위 페이지
  assets/                 # 번들되는 정적 자산
public/                   # 배포용 정적 파일
dist/                     # 빌드 결과물, 직접 수정 금지
```

## 작업 원칙
- 기존 구조를 최대한 유지하면서 작고 명확하게 수정할 것
- 컴포넌트는 함수형으로 작성하고 이름은 PascalCase 사용
- 변수명과 함수명은 camelCase 사용
- 새 스타일은 해당 컴포넌트 옆 `.css` 파일에 작성
- 새 컴포넌트는 `src/components/컴포넌트명/` 구조로 추가
- `dist/`는 직접 수정하지 말 것
- 정적 파일은 `public/` 또는 `src/assets/`에 둘 것
- Three.js 씬 컴포넌트는 `<Canvas>` 내부에서만 사용할 것

## 안전 규칙
- 파일이나 폴더 삭제 전에는 반드시 사용자 확인을 받을 것
- `git reset --hard`, `git clean` 같은 파괴적 git 명령 전에는 반드시 확인받을 것
- 가능하면 삭제보다 비파괴적 대안을 먼저 고려할 것

## 검증
- 코드 변경 후 가능하면 `npm run lint` 실행
- 배포 영향이 큰 변경은 `npm run build`까지 확인

## 커밋 스타일
- 커밋 시 이모지 prefix 사용
- 예시:
  - `✨ add project modal animation`
  - `🐛 fix header scroll bug`
  - `💄 update banner layout`
  - `♻️ refactor row component`
  - `📝 update project descriptions`
  - `🖼️ update project thumbnail`
  - `🔥 remove unused component`
  - `🧹 clean up imports`

## 에이전트 참고
- 이 저장소에는 이미 `CLAUDE.md`와 `.claude/` 기반 가이드가 있음
- 사용자가 따로 지시하지 않으면 그 규칙과 충돌하지 않게 작업할 것
