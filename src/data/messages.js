// 화면 문구 사전 — 언어별로 같은 키를 갖는다. 콘텐츠(프로젝트·수상 등)는 portfolio.js / portfolio.en.js에 있다

const ko = {
  meta: {
    title: '최은진 — Backend Developer',
    description: '백엔드 개발자 최은진의 포트폴리오 — Spring Boot, AWS, AI 연동 프로젝트',
  },
  header: {
    logoLabel: '최은진 포트폴리오 맨 위로',
    nav: '주요 메뉴',
    switchLanguage: 'View in English',
  },
  hero: {
    eyebrow: '[ 최은진 — 백엔드 개발자 ]',
    srTitle: '최은진, 확장 가능한 시스템을 만드는 백엔드 개발자',
    intro: '확장성 있는 설계와 AI·백엔드 융합을 고민합니다. 서버에서 앱, 배포와 운영까지 끝까지 책임진 프로젝트들을 소개합니다.',
    hint: '드래그해서 카드를 흔들어 보세요',
    cardLabel: (name, email) => `${name} 사원증 카드 — Backend Developer, ${email}`,
  },
  marquee: {
    label: '주요 기술',
  },
  work: {
    note: '카드를 누르면 자세한 내용을 볼 수 있어요',
    cta: '자세히 보기',
    tags: '사용 기술',
  },
  footer: {
    eyebrow: '[ 다음 프로젝트를 함께할 분 ]',
    copy: '이메일 복사',
    copied: '복사했어요',
    copiedLive: '이메일 주소를 클립보드에 복사했습니다.',
  },
  project: {
    media: '프로젝트 미디어',
    video: (title) => `${title} 데모 영상`,
    image: (title) => `${title} 화면`,
    screen: (title, n) => `${title} 화면 ${n}`,
    thumb: (isVideo, n) => `${isVideo ? '영상' : '이미지'} ${n} 보기`,
    websiteLinks: '홈페이지 · 사용 안내 · 개인정보처리방침',
    website: '홈페이지',
  },
  modal: {
    prev: '이전 프로젝트',
    next: '다음 프로젝트',
    close: '닫기',
    openDetail: '상세 페이지 보기',
  },
  detail: {
    nav: '프로젝트 탐색',
    back: '← 목록으로',
    next: (title) => `다음 · ${title} →`,
    toc: '목차',
    sections: { overview: '개요', results: '성과', role: '내가 한 일', stack: '기술 스택', links: '링크' },
    period: '기간',
    award: '수상',
    coreStack: '핵심 스택',
    noRepo: '공개된 저장소가 없는 프로젝트예요.',
    notFound: '프로젝트를 찾을 수 없어요',
    goHome: '메인으로 가기 →',
    title: (title) => `${title} — 최은진`,
  },
  lightbox: {
    label: '크게 보기',
    close: '닫기',
    enlarged: (title) => `${title} 화면 크게 보기`,
  },
};

const en = {
  meta: {
    title: 'Eunjin Choi — Backend Developer',
    description: 'Portfolio of backend developer Eunjin Choi — Spring Boot, AWS, and AI-integrated projects',
  },
  header: {
    logoLabel: 'Back to the top of Eunjin Choi’s portfolio',
    nav: 'Main menu',
    switchLanguage: '한국어로 보기',
  },
  hero: {
    eyebrow: '[ EUNJIN CHOI — BACKEND DEVELOPER ]',
    srTitle: 'Eunjin Choi, a backend developer who builds systems that scale',
    intro:
      'I think about scalable design and bringing AI and backend together. Here are projects I owned end to end — from server and app to deployment and operations.',
    hint: 'Drag the card to swing it',
    cardLabel: (name, email) => `${name} ID card — Backend Developer, ${email}`,
  },
  marquee: {
    label: 'Key skills',
  },
  work: {
    note: 'Click a card to see the details',
    cta: 'View details',
    tags: 'Tech stack',
  },
  footer: {
    eyebrow: '[ BUILDING SOMETHING NEXT? ]',
    copy: 'Copy email',
    copied: 'Copied',
    copiedLive: 'Email address copied to the clipboard.',
  },
  project: {
    media: 'Project media',
    video: (title) => `${title} demo video`,
    image: (title) => `${title} screenshot`,
    screen: (title, n) => `${title} screenshot ${n}`,
    thumb: (isVideo, n) => `View ${isVideo ? 'video' : 'image'} ${n}`,
    websiteLinks: 'Website · Support · Privacy Policy',
    website: 'Website',
  },
  modal: {
    prev: 'Previous project',
    next: 'Next project',
    close: 'Close',
    openDetail: 'Open case study',
  },
  detail: {
    nav: 'Project navigation',
    back: '← Back to list',
    next: (title) => `Next · ${title} →`,
    toc: 'Contents',
    sections: { overview: 'Overview', results: 'Results', role: 'What I did', stack: 'Tech stack', links: 'Links' },
    period: 'Period',
    award: 'Award',
    coreStack: 'Core stack',
    noRepo: 'This project has no public repository.',
    notFound: 'Project not found',
    goHome: 'Go to home →',
    title: (title) => `${title} — Eunjin Choi`,
  },
  lightbox: {
    label: 'Enlarged view',
    close: 'Close',
    enlarged: (title) => `${title} screenshot, enlarged`,
  },
};

export const messages = { ko, en };
