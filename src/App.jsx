import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Row from './components/Row/Row';
import Footer from './components/Footer/Footer';
import ProjectModal from './components/ProjectModal/ProjectModal';
import StackModal from './components/StackModal/StackModal';
import ContactModal from './components/ContactModal/ContactModal';
import { ProjectProvider, useProjects } from './contexts/ProjectContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProjectDetailPage from './pages/ProjectDetailPage';

// --- DATA ---
const languagesAndWeb = [
  { id: 'java', name: 'Java', imageUrl: 'https://techstack-generator.vercel.app/java-icon.svg' },
  { id: 'python', name: 'Python', imageUrl: 'https://techstack-generator.vercel.app/python-icon.svg' },
  { id: 'js', name: 'JavaScript', imageUrl: 'https://techstack-generator.vercel.app/js-icon.svg' },
  { id: 'html', name: 'HTML', imageUrl: 'https://skillicons.dev/icons?i=html' },
  { id: 'css', name: 'CSS', imageUrl: 'https://skillicons.dev/icons?i=css' },
];

const backendAndInfra = [
  { id: 'springboot', name: 'Spring Boot', imageUrl: 'https://github.com/user-attachments/assets/64e9355d-d1f6-4fe3-9657-9e297d79e9ee' },
  { id: 'spring', name: 'Spring Legacy', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { id: 'rest', name: 'REST API', imageUrl: 'https://techstack-generator.vercel.app/restapi-icon.svg' },
  { id: 'docker', name: 'Docker', imageUrl: 'https://techstack-generator.vercel.app/docker-icon.svg' },
  { id: 'aws', name: 'AWS', imageUrl: 'https://techstack-generator.vercel.app/aws-icon.svg' },
];

const dbAndTools = [
  { id: 'mysql', name: 'MySQL', imageUrl: 'https://techstack-generator.vercel.app/mysql-icon.svg' },
  { id: 'oracle', name: 'Oracle', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
  { id: 'postman', name: 'Postman', imageUrl: 'https://skillicons.dev/icons?i=postman' },
  { id: 'git', name: 'Git', imageUrl: 'https://skillicons.dev/icons?i=git' },
  { id: 'github', name: 'GitHub', imageUrl: 'https://techstack-generator.vercel.app/github-icon.svg' },
];

const collaborationAndDesign = [
  { id: 'slack', name: 'Slack', imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg' },
  { id: 'notion', name: 'Notion', imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg' },
  { id: 'figma', name: 'Figma', imageUrl: 'https://skillicons.dev/icons?i=figma' },
];

const awards = [
  {
    id: 'shinhan-best',
    name: '신한 DS 금융 SW 아카데미',
    label: '🥇 최우수상',
    date: '2025.10',
    project: '펭글로브 (Penglobe)',
    projectId: 1, // Penglobe 프로젝트 ID
    description: '팀 프로젝트에서 기술 완성도와 서비스 구현력에서 높은 평가를 받아 수상'
  },
  {
    id: 'inu-encouragement',
    name: '인천대학교 졸업작품 경진대회',
    label: '🥉 장려상',
    date: '2024.05',
    project: 'commINUty',
    projectId: 3, // commINUty 프로젝트 ID
    description: 'GPS 기반 커뮤니티 앱 서비스 개발 프로젝트로 수상'
  },
];

const certifications = [
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect – Associate',
    label: 'Pass',
    date: '2026.01',
    linkUrl: 'https://www.credly.com/badges/2e996661-2393-4397-99f5-49fb2f83b5ce/public_url',
  },
  {
    id: 'info-proc',
    name: '정보처리기사',
    label: 'Pass',
    date: '2025.09',
  },
  {
    id: 'sqld',
    name: 'SQLD',
    label: 'Pass',
    date: '2025.09',
  },
  {
    id: 'toeic',
    name: 'TOEIC',
    label: '900',
    date: '2025.11',
  },
  {
    id: 'toeic-speaking',
    name: 'TOEIC Speaking',
    label: 'IH (150)',
    date: '2025.12',
  },
];


const allProjects = [
  {
    id: 4,
    name: 'RAIM 방문자 입장 등록 시스템',
    period: '2026.01 ~ 2026.02',
    thumbnailUrl: '/images/projects/raim/entry.png',
    galleryImageUrls: [
      '/images/projects/raim/entry.png'
    ],
    galleryVideoUrls: [],
    overview: '서울시 청년 시정 서포터즈 활동 중 서울로봇인공지능과학관 현장 운영을 위해 개발한 웹 기반 방문자 입장 등록·통계·자동 백업 시스템입니다. 무료 티어 기반으로 비용 최소화를 목표로 설계했습니다.',
    role: [
      '1인 개발로 요구사항 분석·명세서 작성부터 배포·운영까지 전 과정 진행',
      '데이터 파이프라인 설계: 입력 데이터를 localStorage(일일 통계)와 Firestore(임시 저장)에 동시 저장 후, Apps Script로 Sheets 백업 및 Firestore 자동 정리',
      '자동 백업/삭제 엔진 구현: Firestore 페이지네이션 + Batch Delete로 실행 시간 제약을 고려한 처리 흐름 설계',
      'React 프론트엔드 바이브 코딩',
      '관리자 대시보드 및 접근 제어: PIN 기반 잠금 화면과 통계·설정·수동 백업 기능 제공',
      '오류 대응 자동화: 이메일 알림 및 재시도 전략으로 백업 실패 리스크 최소화'
    ],
    learnings: [
      '서버리스 기반 백엔드 파이프라인과 운영 자동화를 통한 안정적 데이터 흐름 구축 경험',
      '시간 제한/쿼터 제약 환경에서의 대량 데이터 처리 및 비용 최적화 설계 역량 강화',
      '현장 운영 관점의 유지보수 체크리스트와 장애 대응 프로세스 구축 경험'
    ],
    technologies: ['React', 'Vite', 'Firebase Firestore', 'Google Apps Script', 'Google Sheets', 'face-api.js', 'Vercel'],
    githubUrls: {
      repository: 'https://github.com/PanicAthe/raim-visitor-checkin'
    }
  },
  {
    id: 1,
    name: '🐧 Penglobe - 친환경 가치 소비 플랫폼',
    period: '2025.08 ~ 2025.09',
    thumbnailUrl: '/images/projects/penglobe/8.jpg',
    galleryImageUrls: [
      '/images/projects/penglobe/10.jpg',
      '/images/projects/penglobe/13.jpg',
      '/images/projects/penglobe/14.jpg',
      '/images/projects/penglobe/15.jpg',
      '/images/projects/penglobe/16.jpg',
      '/images/projects/penglobe/17.jpg',
      '/images/projects/penglobe/18.jpg',
      '/images/projects/penglobe/19.jpg',
      '/images/projects/penglobe/20.jpg',
      '/images/projects/penglobe/22.jpg',
      '/images/projects/penglobe/24.jpg',
      '/images/projects/penglobe/26.jpg',
      '/images/projects/penglobe/28.jpg',
    ],
    galleryVideoUrls: [
      'https://panicathe.github.io/images/projects/penglobe/Penglobe_Demo.mp4',
      'https://panicathe.github.io/images/projects/penglobe/Penglobe_Interview.mp4'
    ],
    overview: 'GPS 기반 이동 데이터를 탄소 절감량으로 환산해 시각화하고, 포인트로 전환해 기부/금융 상품과 연동하는 ESG 플랫폼입니다.',
    role: [
      '이동거리 보정 알고리즘 구현: React Native에서 좌표 튐(Drift) 제거 및 이동 수단별 속도 제한 로직 적용',
      '펭걸음 기능 풀스택 개발: 보정 데이터 수신 → 탄소 절감량 계산 → DB 적재 서버 파이프라인 설계',
      'Docker 기반 배포: Spring Boot + MariaDB 컨테이너 구성 및 배포 파이프라인 주도',
      'Expo SDK 호환성 이슈 대응: 안정 버전 롤백 및 Android 빌드/배포 전담',
      '로딩 스크린 최적화로 초기 진입 체감 대기 시간 단축'
    ],
    learnings: [
      '시범 운영 사용자 94.4%가 친환경 습관 형성에 도움을 느꼈다고 응답',
      '신한금융 SW 아카데미 최우수상 수상 (서비스 구현력·기술 완성도 인정)',
      '모바일-서버 연동 전 구간 설계 및 운영 경험 확보'
    ],
    technologies: ['Java', 'Spring Boot', 'JPA', 'Swagger', 'React Native', 'Expo', 'Postman', 'TailwindCSS', 'MariaDB', 'Groq AI', 'FoodLens SDK', 'Ubuntu', 'Docker', 'GitHub', 'Figma', 'Notion', 'Slack', 'Git', 'REST API', 'JavaScript'],
    githubUrls: {
      organization: 'https://github.com/Penglobe',
      backend: 'https://github.com/Penglobe/server',
      frontend: 'https://github.com/Penglobe/front'
    }
  },
  {
    id: 2,
    name: '딱쿠(Takku) – 소상공인 펀딩 플랫폼',
    period: '2025.06 ~ 2025.07',
    thumbnailUrl: '/images/projects/takku/takku_1.gif',
    galleryImageUrls: [
      '/images/projects/takku/takku_1.gif',
      '/images/projects/takku/takku_2.gif',
    ],
    galleryVideoUrls: [
      'https://panicathe.github.io/images/projects/takku/Takku_Demo.mp4'
    ],
    overview: '펀딩 기능에 더해 LLM 기반 홍보글 생성, 리뷰 요약/추천을 제공하는 소상공인 올인원 마케팅 플랫폼입니다.',
    role: [
      'FastAPI 기반 AI 모듈 분리 후 Spring 서버와 MSA 구조로 연동',
      '추천 시스템 구현: TF-IDF + 코사인 유사도 결합한 하이브리드 알고리즘 적용',
      '리뷰 요약(TextRank) 및 긍·부정 키워드 추출로 대시보드 데이터 제공',
      'LLM 파이프라인 개선: Context Injection + Output Formatting, Regex/Retry로 파싱 안정화',
      'Spring Legacy + Oracle 핵심 API 개발 및 Swagger 문서화로 협업 효율 향상',
      'JSP + Chart.js 대시보드 구현, AWS EC2 직접 운영으로 비용 절감'
    ],
    learnings: [
      'FastAPI·Spring 간 서비스 분리/연동 경험으로 확장 가능한 구조 설계 역량 강화',
      'LLM 응답 품질과 안정성을 높이는 프롬프트·후처리 설계 경험',
      '데이터 시각화까지 포함한 엔드투엔드 백엔드 기능 제공 경험'
    ],
    technologies: ['Spring Legacy', 'Servlet', 'MyBatis', 'OracleDB', 'Tomcat', 'Postman', 'AWS', 'JSP', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'Groq AI', 'Iamport', 'SOLAPI', 'GitHub', 'Notion','Figma',  'Slack', 'Swagger', 'Python', 'Java', 'Git', 'Oracle', 'Docker', 'Chart.js'],
    githubUrls: {
      organization: 'https://github.com/4-team-project/takku',
      aiApi: 'https://github.com/4-team-project/takku-ai-api'
    }
  },
  {
    id: 3,
    name: 'commINUty – 위치 기반 소셜 네트워킹 앱',
    period: '2023.09 ~ 2024.05',
    thumbnailUrl: 'https://panicathe.github.io/images/projects/comminuty/comINUty_Demo.mp4',
    galleryImageUrls: [],
    galleryVideoUrls: [
      'https://panicathe.github.io/images/projects/comminuty/comINUty_Demo.mp4',
      '/images/projects/comminuty/1.PNG',
    ],
    overview: 'GPS 기반 커뮤니티 서비스로 주변 사용자 간 소통과 정보 공유를 지원하는 위치 기반 SNS입니다.',
    role: [
      '9개월 팀 리딩: 일정/이슈 관리 및 핵심 기술 의사결정 주도',
      'Spring Security + JWT 기반 인증/인가 설계로 Stateless 보안 체계 구축',
      'ERD 설계 및 핵심 API 전담, 기능 명세·데이터 모델링 주도',
      '신고 프로세스 구축으로 악성 사용자 제재 및 커뮤니티 안정성 강화',
      'AWS EC2 + RDS(MySQL) 배포로 실제 서비스 운영 환경 구성'
    ],
    learnings: [
      '인천대학교 졸업작품 경진대회 장려상 수상',
      '장기 프로젝트 완주와 리더십·커뮤니케이션 역량 강화',
      '보안·인프라까지 포함한 백엔드 전반 설계 경험 확보'
    ],
    technologies: ['Spring Boot', 'JPA', 'Java', 'Spring Security', 'GitHub', 'Postman', 'Git', 'Notion', 'MySQL', 'JWT', 'AWS', 'AWS EC2', 'AWS RDS']
  }

];

function PortfolioContent() {
  const { 
    selectedProject, 
    closeProjectModal, 
    selectProject, 
    selectStack,
    isContactModalOpen,
    closeContactModal
  } = useProjects();

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <section id="hero" className="section">
          <Banner />
        </section>

        <section id="projects" className="section">
          <Row 
            title="Projects" 
            items={allProjects} 
            onItemClick={selectProject} 
            rowType="projects"
          />
        </section>

        <section id="awards" className="section">
          <Row 
            title="Awards" 
            items={awards} 
            rowType="certifications"
            onItemClick={(award) => {
              const project = allProjects.find(p => p.id === award.projectId);
              if (project) {
                selectProject(project);
              }
            }}
          />
        </section>

        <section id="certifications" className="section">
          <Row title="Certifications" items={certifications} rowType="certifications" />
        </section>

        <section id="skills" className="section section--skills">
          <h2 className="section-title">Skills</h2>
          <div className="skills-categories">
            <Row title="Languages & Web" items={languagesAndWeb} onItemClick={selectStack} rowType="stacks" projects={allProjects} />
            <Row title="Backend & Infra" items={backendAndInfra} onItemClick={selectStack} rowType="stacks" projects={allProjects} />
            <Row title="Databases & Dev Tools" items={dbAndTools} onItemClick={selectStack} rowType="stacks" projects={allProjects} />
            <Row title="Collaboration & Design" items={collaborationAndDesign} onItemClick={selectStack} rowType="stacks" projects={allProjects} />
          </div>
        </section>
      </main>

      <Footer />

      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      <StackModal />
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProjectProvider projects={allProjects}>
        <Routes>
          <Route path="/" element={<PortfolioContent />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage projects={allProjects} />} />
        </Routes>
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;
