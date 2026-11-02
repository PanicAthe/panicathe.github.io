# /deploy

포트폴리오를 GitHub Pages에 배포한다.

배포는 GitHub Actions(`.github/workflows/deploy.yml`)가 담당한다. main 브랜치에 푸시되거나 PR이 머지되면 `npm ci` → `npm run build` → GitHub Pages 업로드가 자동으로 실행된다. 별도 배포 명령은 없다.

## 실행 순서

> 커밋이 아직 안 됐으면 먼저 `/commit` 흐름을 제안할 것

### 1단계 - 변경 확인
1. 작업 내용이 배포 가능한 상태인지 확인
2. `npm run lint` 실행
3. `npm run build`로 빌드 성공과 `dist/404.html` 생성 여부 확인

### 2단계 - 배포
4. 작업 브랜치라면 `/pr` 흐름으로 PR을 만들고, 사용자가 머지
5. main에 바로 반영할 때는 사용자 확인 후 푸시
6. Actions 실행이 성공했는지 확인하고 `https://panicathe.github.io` 확인 안내

## 주의
- 빌드 실패 시 배포를 중단하고 에러 원인부터 해결
- 배포와 PR 생성을 한 흐름으로 강제하지 말 것
- main 푸시는 곧바로 실제 사이트에 반영되므로 사용자 확인 없이 하지 말 것
- 사용자가 원하지 않는 미완성 UI/문구가 없는지 배포 전 한 번 더 확인
