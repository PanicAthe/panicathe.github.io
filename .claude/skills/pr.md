# /pr

GitHub Pull Request를 생성한다.

## 실행 순서
1. `git log main..HEAD`로 현재 브랜치 커밋 확인
2. `git diff main...HEAD`로 전체 변경사항 파악
3. `npm run lint`, 필요 시 `npm run build` 확인
4. PR 제목과 본문 초안 작성 후 사용자에게 확인
5. 승인 시 `gh pr create` 실행
6. 생성된 PR URL 안내

## PR 형식
```text
제목: <이모지> <변경 내용 한 줄 요약>

본문:
## 변경 사항
- 변경 내용 bullet point

## 스크린샷
- UI 변경이 있으면 첨부 또는 첨부 예정 명시

## 체크리스트
- [ ] lint 확인
- [ ] build 확인
```

## 주의
- main 브랜치에 직접 push된 경우 PR 대신 이미 반영됐음을 안내
- `gh` CLI 사용 전 사용자 승인 받기
- 현재 환경에서 `git` 또는 `gh`가 제한되면 실행 명령만 정리해서 안내
