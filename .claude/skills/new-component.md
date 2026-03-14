# /new-component

새 React 컴포넌트를 프로젝트 컨벤션에 맞게 생성한다.

## 사용법
`/new-component 컴포넌트명`

## 생성 규칙
1. `src/components/컴포넌트명/` 폴더 생성
2. `컴포넌트명.jsx` 작성
3. `컴포넌트명.css` 작성
4. 함수형 컴포넌트로 구현
5. CSS Modules가 아닌 일반 CSS import 방식 사용
6. 필요 시 부모 컴포넌트에 import 및 렌더링 연결
7. 생성 후 `npm run lint` 실행

## 예시 구조
```text
src/components/MyComponent/
  MyComponent.jsx
  MyComponent.css
```

## 이 프로젝트에서 특히 볼 것
- 단순 표시용인지, 모달/상세/리스트 공용 컴포넌트인지 먼저 구분
- 비슷한 역할의 기존 컴포넌트가 있으면 새로 만들기보다 재사용 우선
- `Row` 계열 공통 UI인지 별도 섹션 UI인지 확인하고 구조 맞추기
