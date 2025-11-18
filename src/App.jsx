import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Row from './components/Row/Row';
import Footer from './components/Footer/Footer';
import ProjectModal from './components/ProjectModal/ProjectModal';
import StackModal from './components/StackModal/StackModal';
import ContactModal from './components/ContactModal/ContactModal';
import Lanyard from './components/Lanyard/Lanyard';
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
  { id: 'reactnative', name: 'React Native', imageUrl: 'https://techstack-generator.vercel.app/react-icon.svg' },
];

const backendAndInfra = [
  { id: 'springboot', name: 'Spring Boot', imageUrl: 'https://github.com/user-attachments/assets/64e9355d-d1f6-4fe3-9657-9e297d79e9ee' },
  { id: 'spring', name: 'Spring Legacy', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { id: 'rest', name: 'REST API', imageUrl: 'https://techstack-generator.vercel.app/restapi-icon.svg' },
  { id: 'docker', name: 'Docker', imageUrl: 'https://techstack-generator.vercel.app/docker-icon.svg' },
  { id: 'aws', name: 'AWS', imageUrl: 'https://techstack-generator.vercel.app/aws-icon.svg' },
  { id: 'redis', name: 'Redis', imageUrl: 'https://skillicons.dev/icons?i=redis' },
];

const dbAndTools = [
  { id: 'mysql', name: 'MySQL', imageUrl: 'https://techstack-generator.vercel.app/mysql-icon.svg' },
  { id: 'oracle', name: 'Oracle', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
  { id: 'postman', name: 'Postman', imageUrl: 'https://skillicons.dev/icons?i=postman' },
  { id: 'git', name: 'Git', imageUrl: 'https://skillicons.dev/icons?i=git' },
  { id: 'github', name: 'GitHub', imageUrl: 'https://techstack-generator.vercel.app/github-icon.svg' },
  { id: 'prettier', name: 'Prettier', imageUrl: 'https://techstack-generator.vercel.app/prettier-icon.svg' },
];

const collaborationAndDesign = [
  { id: 'slack', name: 'Slack', imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg' },
  { id: 'notion', name: 'Notion', imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg' },
  { id: 'figma', name: 'Figma', imageUrl: 'https://skillicons.dev/icons?i=figma' },
  { id: 'chartjs', name: 'Chart.js', imageUrl: 'https://www.chartjs.org/media/logo-title.svg' },
];

const certifications = [
    { 
        id: 'info-proc', 
        name: '정보처리기사', 
        imageUrl: 'https://img.shields.io/badge/정보처리기사-2E8B57?style=for-the-badge&logo=google-scholar&logoColor=white', 
        date: '2025-09-12' 
    },
    { 
        id: 'sqld', 
        name: 'SQLD', 
        imageUrl: 'https://img.shields.io/badge/SQLD-003B57?style=for-the-badge&logo=databricks&logoColor=white', 
        date: '2025-09-19' 
    },
    { 
        id: 'toeic', 
        name: 'TOEIC 900점', 
        imageUrl: 'https://img.shields.io/badge/TOEIC-900점-0054A6?logoColor=white&labelColor=ce0018', 
        date: '2025-11-09' 
    }
];


const allProjects = [
  {
    id: 1,
    name: '🐧 Penglobe - 환경 금융 플랫폼 (🏆 최우수상 수상)',
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
    overview: '개인의 작은 실천을 데이터·보상·감정 피드백으로 연결하는 환경 금융 플랫폼.\n걸음, 식습관, 미션 데이터를 기반으로 탄소 절감량을 시각화하고, 얻은 포인트로 친환경 소비나 기부를 실천할 수 있습니다.',
    role: [
      '백엔드 아키텍처 설계, 관리 및 서버 배포 (Ubuntu, Docker)',
      '펭걸음 기능 (GPS 기반 이동거리별 탄소 절감량 계산) 구현',
      'Spring Boot 백엔드 서버 클라우드 배포',
      'MariaDB 스키마 설계 및 연동',
      'Android 빌드 및 배포 관리',
      'AI 툴을 활용한 서비스 캐릭터 및 일러스트 제작'
    ],
    learnings: [
      'React Native 앱과 Spring Boot 서버를 연동한 엔드투엔드 서비스 개발 경험',
      '빌드 및 환경 설정 문제 해결을 통한 운영 최적화 경험',
      '개발뿐 아니라 AI 툴을 활용한 브랜딩/디자인 차별화 경험',
      '신한금융 SW 아카데미 5기 최우수상 수상'
    ],
    technologies: ['Java', 'Spring Boot', 'JPA', 'Swagger', 'React Native', 'Expo', 'TailwindCSS', 'MariaDB', 'Groq AI', 'FoodLens SDK', 'Ubuntu', 'Docker', 'GitHub', 'Figma', 'Notion', 'Slack', 'MySQL', 'Git', 'REST API', 'JavaScript'],
    githubUrls: {
      organization: 'https://github.com/Penglobe',
      backend: 'https://github.com/Penglobe/server',
      frontend: 'https://github.com/Penglobe/front'
    }
  },
  {
    id: 2,
    name: '딱쿠(Takku) – 소상공인 펀딩 기반 쿠폰 플랫폼',
    period: '2025.06 ~ 2025.07',
    thumbnailUrl: '/images/projects/takku/takku_1.gif',
    galleryImageUrls: [
      '/images/projects/takku/takku_1.gif',
      '/images/projects/takku/takku_2.gif',
    ],
    galleryVideoUrls: [
      'https://panicathe.github.io/images/projects/takku/Takku_Demo.mp4'
    ],
    overview: '소상공인을 위한 AI 자동 홍보 및 펀딩형 쿠폰 판매 플랫폼',
    role: [
      '백엔드 API 및 대시보드 기능 개발',
      '서버/DB 배포 담당',
      'Swagger API 문서화',
      'FastAPI 기반 AI 추천/요약 모듈 구현',
      'Chart.js 활용 대시보드 시각화',
      'Groq AI 연동 자동 홍보 문구 생성 기능 구현'
    ],
    learnings: [
      'Spring Legacy, MyBatis 환경에서 핵심 API 구현 경험',
      '비용 문제 해결을 위한 EC2 DB 직접 설치 및 운영 경험',
      '코사인 유사도, TextRank 등 AI 모델 활용 기능 개발',
      '서비스 전체 아키텍처 이해도 증진'
    ],
    technologies: ['Spring Legacy', 'Servlet', 'MyBatis', 'OracleDB', 'Tomcat', 'AWS', 'JSP', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'Groq AI', 'Iamport', 'SOLAPI', 'GitHub', 'Notion','Figma',  'Slack', 'Swagger', 'Python', 'Java', 'Git', 'Oracle', 'Docker', 'Chart.js'],
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
    overview: '사용자 위치 기반으로 소통할 수 있는 소셜 네트워킹 서비스',
    role: [
      '팀 리더로서 프로젝트 기획 및 운영 주도',
      'ERD 설계 및 API 개발',
      'AWS EC2 & RDS 배포 담당'
    ],
    learnings: [
      'Spring Boot, JPA 기반 API 구현',
      'Spring Security, JWT 기반 인증/인가 시스템 구축',
      'AWS EC2 서버 및 RDS 운영 경험'
    ],
    technologies: ['Spring Boot', 'JPA', 'Spring Security', 'JWT', 'AWS EC2', 'AWS RDS']
  },
  {
    id: 4,
    name: '계좌 관리 시스템 – 금융 서비스 백엔드',
    period: '2024.07 ~ 2024.08',
    thumbnailUrl: '',
    galleryImageUrls: [],
    overview: '실제 금융 서비스 환경을 고려한 계좌 생성·거래 관리 시스템',
    role: ['개인 프로젝트'],
    learnings: [
      'Redis 기반 분산 락을 적용하여 거래 동시성 문제 해결',
      '트랜잭션 관리를 통한 데이터 무결성 보장 경험'
    ],
    technologies: ['Spring Boot', 'JPA', 'Redis', 'Git', 'GitHub','REST API', 'Java']
  },
  {
    id: 5,
    name: '매장 예약 관리 시스템 – REST API 서비스',
    period: '2024.08 ~ 2024.09',
    thumbnailUrl: '',
    galleryImageUrls: [],
    overview: '매장 예약 기능과 사용자 인증을 포함한 REST API 서비스',
    role: ['개인 프로젝트'],
    learnings: [
      'Spring Boot, Spring Security, JWT 기반 API 구축',
      '예약 기능 동시성 처리 최적화',
      'Swagger를 활용한 체계적인 API 문서화 역량 강화'
    ],
    technologies: ['Spring Boot', 'JWT', 'Swagger', 'Git','GitHub', 'REST API', 'Java']
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
      <Banner />
      
      <Row 
        title="Projects" 
        items={allProjects} 
        onItemClick={selectProject} 
        rowType="projects"
      />
      
      <Row title="Languages & Web" items={languagesAndWeb} onItemClick={selectStack} rowType="stacks" />
      <Row title="Backend & Infra" items={backendAndInfra} onItemClick={selectStack} rowType="stacks" />
      <Row title="Databases & Dev Tools" items={dbAndTools} onItemClick={selectStack} rowType="stacks" />
      <Row title="Collaboration & Design" items={collaborationAndDesign} onItemClick={selectStack} rowType="stacks" />
      <Row title="Certifications" items={certifications} rowType="certifications" />
      
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
