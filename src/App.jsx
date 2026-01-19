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
  { id: 'chartjs', name: 'Chart.js', imageUrl: 'https://www.chartjs.org/media/logo-title.svg' },
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
    overview: '일상 속 친환경 활동을 기록하여 탄소 절감량을 시각화하고, 이를 포인트로 전환하여 기부 및 상품과 연계하는 플랫폼입니다.',
    role: [
      'GPS 정밀 보정 알고리즘 구현: React Native에서 좌표 튐 현상 제거로 이동 거리 측정 정확도 향상',
      '펭걸음 기능 풀스택 개발: 보정 데이터 수신 및 탄소 절감량 계산 서버 로직 설계',
      'Docker 기반 인프라 구축: Spring Boot와 MariaDB 컨테이너 구성 및 배포 파이프라인 주도',
      'Expo 의존성 이슈 해결: SDK 업그레이드 호환성 문제 해결 및 Android 빌드/배포 전담',
      'AI 브랜딩 적용: 생성형 AI(Gemini)를 활용한 캐릭터와 일러스트 제작 및 앱 전반 적용',
      '로딩 스크린 최적화: 앱 초기 진입 시 체감 대기 시간 단축'
    ],
    learnings: [
      '시범 운영 결과 사용자 94.4%가 "친환경 습관 형성에 도움"이라고 긍정 응답',
      '신한금융 SW 아카데미 최우수상 수상 - 기술 완성도와 서비스 구현력에서 높은 평가',
      'React Native 앱과 Spring Boot 서버를 연동한 엔드투엔드 서비스 개발 경험',
      'Android 빌드 이슈 해결을 통해 프로젝트 완성도 제고 및 팀 내 기술적 병목 해소'
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
    overview: '소상공인의 자금 확보를 돕는 크라우드 펀딩 기능과, 생성형 AI(LLM)를 활용한 자동 홍보글 생성 및 고객 리뷰 분석을 제공하는 올인원 마케팅 플랫폼입니다.',
    role: [
      'FastAPI 기반 AI 모듈 분리: Java(Spring)와 Python(FastAPI) 서버를 별도 구축하여 MSA 아키텍처로 분리',
      '하이브리드 추천 시스템: TF-IDF + 코사인 유사도를 결합한 상품 추천 알고리즘 구현',
      '리뷰 요약 기능: TextRank 알고리즘으로 방대한 리뷰 데이터를 긍정/부정 키워드로 자동 요약',
      'LLM 파이프라인 최적화: Context Injection 및 Output Formatting으로 응답 성공률 개선 및 고품질 홍보글 자동 생성',
      'Spring Legacy + Oracle API 개발: 펀딩 생성, 추천, 리뷰 요약 핵심 비즈니스 로직 구현 및 Swagger 문서화',
      '통계 대시보드 풀스택 구현: MyBatis 동적 쿼리로 데이터 추출 후 JSP + Chart.js로 시각화 인터페이스 완성',
      '인프라 구축: AWS EC2에 Server 및 Oracle DB 직접 설치·운영하여 RDS 비용 절감'
    ],
    learnings: [
      '마이크로서비스 구조 설계 및 FastAPI와 Spring 서버 연동 경험',
      'LLM 파이프라인 최적화를 통한 응답 품질 향상 및 후처리 로직 적용 경험',
      '코사인 유사도, TextRank 등 AI 모델을 활용한 실용 기능 개발',
      '비용 최적화를 위한 인프라 직접 운영 경험 및 대시보드 풀스택 구현 능력 강화'
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
    overview: '위치를 기반으로 주변 학우들과 소통하고 정보를 공유하는 소셜 네트워킹 서비스입니다.',
    role: [
      '팀 리더로서 9개월간 프로젝트 기획, 일정 관리, 이슈 트래킹 및 기술적 의사결정 주도',
      '인증/인가 시스템: Spring Security와 JWT를 도입하여 Stateless 환경에서 안전한 로그인 및 API 접근 권한 제어',
      'ERD 설계 및 API 개발: 데이터 모델링과 기능 명세 작성부터 API 설계 전반 담당',
      '인프라 구축: AWS EC2에 서버 배포 및 RDS(MySQL) 연동으로 실제 서비스 가능한 클라우드 환경 구축',
      '프로필 및 인증 관리: 이메일 인증 회원가입 절차 및 프로필 이미지 변경 API 구현'
    ],
    learnings: [
      '인천대학교 졸업작품 경진대회 장려상 수상',
      '장기 프로젝트(9개월) 완주 및 팀 리더십 경험',
      'Spring Boot, JPA, Spring Security, JWT 기반 전체 인증/인가 시스템 구축',
      'AWS 클라우드 환경에서 실제 서비스 운영 경험 및 협업 커뮤니케이션 역량 강화'
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
