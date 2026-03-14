# Codex 프로젝트 메모

이 폴더는 이 저장소에서 작업하는 Codex 계열 에이전트를 위한 간단한 안내 문서 모음입니다.

## 시작 순서
1. `../AGENTS.md` 읽기
2. 필요하면 `../CLAUDE.md`로 추가 문맥 확인
3. `project-context.md`로 현재 구조 확인
4. 코드 수정 후 `npm run lint` 실행

## 저장소 작업 기준
- 현재 React + Vite 구조를 유지할 것
- 사용자가 리디자인을 요청하지 않으면 기존 UI 톤을 유지할 것
- 사용자 승인 없이 파일을 삭제하지 말 것
- `dist/`는 생성물로 취급할 것
- 큰 구조 개편보다 작은 개선, 문구 수정, 섹션 추가 같은 실용 작업을 우선

## 자주 쓰는 명령어
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run deploy`
