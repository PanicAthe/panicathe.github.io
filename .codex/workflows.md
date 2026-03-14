# 자주 쓰는 작업 흐름

## 컴포넌트 추가
1. `src/components/ComponentName/` 폴더 생성
2. `ComponentName.jsx` 추가
3. `ComponentName.css` 추가
4. 가장 가까운 페이지나 레이아웃에서 import
5. `npm run lint` 실행

## 포트폴리오 콘텐츠 수정
1. 먼저 `src/App.jsx`에 있는 데이터 정의 위치를 확인
2. 텍스트, 링크, 미디어 경로 수정
3. 상세 페이지 반영이 필요한지 `src/pages/ProjectDetailPage.jsx`도 함께 확인
4. 에셋 파일은 `public/` 또는 `src/assets/`에 배치
5. `npm run lint` 실행

## 배포 준비
1. `npm run lint` 실행
2. `npm run build` 실행
3. 사용자가 원하면 `npm run deploy` 진행
