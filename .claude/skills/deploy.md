# /deploy

포트폴리오를 GitHub Pages에 배포한다.

## 실행 순서

> 커밋이 아직 안 됐으면 먼저 `/commit` 흐름을 제안할 것

### 1단계 - 변경 확인
1. 작업 내용이 배포 가능한 상태인지 확인
2. 필요하면 `npm run lint` 실행
3. `npm run build`로 빌드 성공 여부 확인

### 2단계 - 배포
4. 빌드 성공 시 `npm run deploy` 실행
5. 배포 완료 후 `https://panicathe.github.io` 확인 안내

### 3단계 - git 작업은 분리
6. 커밋/푸시가 필요하면 `/commit` 또는 `/pr` 흐름으로 별도 진행

## 브랜치 구조
- `main` : 소스코드
- `gh-pages` : 빌드 결과물 (`npm run deploy`가 자동 반영)

## 주의
- 빌드 실패 시 배포를 중단하고 에러 원인부터 해결
- 배포와 PR 생성을 한 흐름으로 강제하지 말 것
- `npm run deploy`는 `dist`를 기반으로 `gh-pages` 브랜치에 반영함
- 사용자가 원하지 않는 미완성 UI/문구가 없는지 배포 전 한 번 더 확인
