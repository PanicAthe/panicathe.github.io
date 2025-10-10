<h1><a href="https://panicathe.github.io/">Panicathe’s Interactive Portfolio</a></h1>

<br/>

## ✨ 주요 기능

- **인터랙티브 프로젝트 목록**: 가로 스크롤을 통해 참여했던 프로젝트들의 썸네일을 동적으로 탐색할 수 있습니다.
- **상세 프로젝트 모달**: 각 프로젝트를 클릭하면 상세 내용, 기술 스택, 기여 역할, 데모 영상 등을 포함한 모달 창이 나타납니다.
- **3D Lanyard 모델 뷰어**: Three.js와 React Three Fiber를 사용하여 구현된 3D 모델을 직접 조작하고 살펴볼 수 있습니다.
- **동적 텍스트 효과**: 스크롤에 따라 텍스트가 암호 해독되듯 나타나는 효과로 시각적 재미를 더했습니다.
- **다크/라이트 테마**: 사용자의 선호에 따라 웹사이트의 전체 테마를 전환할 수 있습니다.

<br/>

## 🛠️ 기술 스택

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### 3D & Animation
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

### Deployment
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

<br/>

## 🚀 시작하기

### 선수 조건

- Node.js (v18 이상 권장)
- npm 또는 yarn

### 로컬에서 실행하기

1.  **저장소 복제:**
    ```sh
    git clone https://github.com/PanicAthe/panicathe.github.io.git
    cd panicathe.github.io
    ```

2.  **의존성 설치:**
    ```sh
    npm install
    ```

3.  **개발 서버 실행:**
    ```sh
    npm run dev
    ```
    이제 브라우저에서 `http://localhost:5173` (또는 터미널에 표시된 다른 주소)으로 접속할 수 있습니다.

### 빌드 및 배포

- **프로덕션 빌드:**
  ```sh
  npm run build
  ```
- **GitHub Pages 배포:**
  ```sh
  npm run deploy
  ```

<br/>

## 📂 프로젝트 구조

```
panicathe.github.io/
├── public/              # 정적 에셋 (이미지, 비디오, 3D 모델 등)
├── src/
│   ├── assets/          # 코드에서 직접 참조하는 에셋
│   ├── components/      # 재사용 가능한 React 컴포넌트
│   ├── contexts/        # React Context (테마, 프로젝트 데이터)
│   ├── pages/           # 페이지 단위 컴포넌트
│   ├── App.jsx          # 메인 애플리케이션 컴포넌트
│   └── main.jsx         # 애플리케이션 진입점
├── vite.config.js       # Vite 설정 파일
└── README.md            # 프로젝트 문서
```