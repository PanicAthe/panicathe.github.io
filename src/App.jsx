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

const education = [
  {
    id: 'ai-sw-maestro-busan-17',
    name: 'AI·SW마에스트로 부산 17기',
    label: '참여 중',
    date: '2026.05 ~ 현재',
    linkUrl: 'https://www.swmaestro.ai/busan/sw/main/main.do',
    description: '팀 프로젝트 진행 중'
  },
  {
    id: 'shinhan-ds-finance-sw-academy',
    name: '신한DS 금융 SW 아카데미',
    label: '수료 · 총 976시간',
    date: '2025.04 ~ 2025.10',
    description: '금융 도메인 기반 SW 개발 교육 과정을 수료하며 풀스택 경험 축적'
  },
  {
    id: 'inu-computer-science',
    name: '인천대학교 컴퓨터공학부',
    label: '학사 졸업',
    date: '2021.03 ~ 2025.02',
    description: '컴퓨터공학 전공 학사 과정 졸업'
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
      '/images/projects/raim/entry.png',
      '/images/projects/raim/checkin.png',
    ],
    galleryVideoUrls: [],
    overview: '서울로봇인공지능과학관 현장 방문자 입장 데이터를 수집·백업하는 운영용 웹 시스템입니다. AI 얼굴 인식 기반 성별·연령대 감지와 수동 입력을 함께 제공하고, Firestore 데이터를 Google Sheets로 자동 백업하도록 구성했습니다.',
    role: [
      '1인 개발로 요구사항 분석·명세서 작성부터 배포·운영까지 전 과정 진행',
      'localStorage 기반 일일 통계와 관람실별 현황 화면을 구성해 현장 운영자가 입장 현황을 즉시 확인할 수 있도록 개선',
      '페이지네이션 조회, 500건 단위 배치 삭제, 재시도 로직을 적용해 Firestore 무료 한도 내에서 안정적으로 운영 가능한 구조 설계',
      'PIN 기반 관리자 대시보드와 수동 백업 기능을 제공해 운영자가 장애 상황에 직접 대응할 수 있는 범위 확장',
      '백업 실패 이메일 알림과 재시도 전략을 적용해 데이터 누락 리스크 완화',
      'GitHub 연동 Vercel 자동 배포로 코드 push 시 즉시 반영되는 배포 파이프라인 구성'
    ],
    learnings: [
      '현장 운영자가 사용하는 실제 입장 등록·통계·백업 워크플로우 구축',
      '서버리스 환경에서 수집부터 백업까지 이어지는 데이터 파이프라인 자동화',
      '무료 한도와 실행 시간 제약을 고려한 배치 처리·재시도·장애 대응 구조 설계'
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
    overview: '걷기·식습관 데이터를 탄소 절감량으로 환산하고, 리워드를 친환경 소비와 기부로 연결하는 모바일 플랫폼입니다. 사용자의 실천 데이터를 시각적 피드백과 보상 구조로 연결해 친환경 행동을 지속하도록 설계했습니다.',
    role: [
      '펭걸음 기능 풀스택 개발: 앱에서 수집한 이동 데이터를 탄소 절감량으로 계산해 서버에 저장하는 전체 흐름 설계 및 구현',
      '허위 이동 입력 방지: 이동 중 비정상적으로 빠른 속도가 감지되면 데이터 수집을 자동 중단해 보상 시스템의 신뢰도 확보',
      '배터리 최적화: 목적지에 충분히 가까워지면 위치 추적을 자동 종료해 불필요한 배터리 소모 최소화',
      'Docker 기반 배포: Spring Boot + MariaDB 컨테이너 구성 및 배포 파이프라인 주도',
      'Expo SDK 호환성 이슈를 해결하고 Android 빌드·배포 과정 전담',
      '랭킹·마이페이지 등 데이터 로딩 화면의 상태 처리를 개선해 사용자 대기 경험 보완'
    ],
    learnings: [
      '시범 운영 결과, 사용자 94.4%가 친환경 습관 형성에 도움이 됐다고 응답',
      '신한금융 SW 아카데미 최우수상 수상 — 서비스 완성도와 기술력을 인정받음',
      '기획부터 서버·앱 개발, 실제 배포·운영까지 전 과정을 팀과 함께 경험'
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
    overview: '소상공인이 펀딩 상품을 등록하고, LLM 기반 홍보글 생성·리뷰 요약·추천 기능을 활용할 수 있는 마케팅 플랫폼입니다.',
    role: [
      'FastAPI 기반 AI 모듈 분리 후 Spring 서버와 MSA 구조로 연동',
      '추천 시스템 구현: TF-IDF + 코사인 유사도 결합한 하이브리드 알고리즘 적용',
      '리뷰 요약(TextRank) 및 긍·부정 키워드 추출로 대시보드 데이터 제공',
      'Context Injection, Output Formatting, Regex 검증, Retry를 적용해 LLM 응답 파싱 안정화',
      'Spring Legacy + Oracle 기반 핵심 API 개발 및 Swagger 문서화로 프론트엔드 협업 효율 개선',
      'JSP + Chart.js 기반 대시보드를 구현하고 AWS EC2 환경에서 직접 배포·운영'
    ],
    learnings: [
      'FastAPI와 Spring 서버를 분리해 AI 기능을 독립 모듈로 연동',
      'LLM 응답 품질과 파싱 안정성을 높이는 프롬프트·후처리 구조 설계',
      '추천·요약·키워드 분석 결과를 대시보드까지 연결하는 엔드투엔드 기능 구현'
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
    overview: 'GPS 기반 위치 인증을 통해 주변 사용자 간 소통과 정보 공유를 지원하는 모바일 커뮤니티 서비스입니다.',
    role: [
      '팀장으로 일정/이슈 관리 및 핵심 기술 의사결정 주도',
      'Spring Security + JWT 기반 인증/인가 설계로 Stateless 보안 체계 구축',
      'ERD 설계 및 핵심 API 전담, 기능 명세·데이터 모델링 주도',
      'EXPLAIN 기반 실행계획 분석 후 댓글 목록·마커 조회·알림 조회 등 조건 조회/정렬 쿼리에 인덱스를 설계해 Full Scan 위험 완화',
      'Redis 기반 인증번호 TTL 저장, 인기 게시글 캐시, refresh token 저장 구조를 적용해 반복 DB 접근을 줄이고 다중 인스턴스 확장성을 고려',
      '신고 프로세스 구축으로 악성 사용자 제재 및 커뮤니티 안정성 강화',
      'AWS EC2 + RDS(MySQL) 배포로 실제 서비스 운영 환경 구성'
    ],
    learnings: [
      '인천대학교 졸업작품 경진대회 장려상 수상',
      '댓글 목록 API 기준 응답시간 0.271s → 0.033s로 단축해 DB 조회 성능 개선',
      '인덱스 설계와 Redis 캐시 적용으로 데이터 증가 상황에서의 조회 병목 완화',
      '팀장으로 프로젝트를 리딩하며 요구사항 관리, 일정 조율, 기술 의사결정 경험 축적',
      '인증·인가, 데이터 모델링, 성능 개선, 배포까지 포함한 백엔드 전반 설계'
    ],
    technologies: ['Spring Boot', 'JPA', 'Java', 'Spring Security', 'GitHub', 'Postman', 'Git', 'Notion', 'MySQL', 'Redis', 'JWT', 'AWS', 'AWS EC2', 'AWS RDS']
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

        <section id="education" className="section">
          <Row title="Education" items={education} rowType="certifications" />
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
    <ProjectProvider projects={allProjects}>
      <Routes>
        <Route path="/" element={<PortfolioContent />} />
        <Route path="/project/:projectId" element={<ProjectDetailPage projects={allProjects} />} />
      </Routes>
    </ProjectProvider>
  );
}

export default App;
