// 영어 페이지(/en)에서 portfolio.js 위에 덮어쓰는 번역 — id가 같은 항목의 글자 필드만 적는다.
// 여기 없는 필드(이미지, 링크, 기술 스택 등)는 한국어 원본 값을 그대로 쓴다.
// 주의: 프로젝트 이름은 "제목 - 부제" 형식을 유지하고, 수상 문장에는 수상 label(이모지 제외)을 그대로 넣어야
// 모달·상세 페이지에서 수상 카드와 중복되지 않는다 (utils/project.js의 getProjectView 참고).

export const profileEn = {
  name: 'Eunjin Choi',
};

export const awardsEn = {
  'shinhan-best': {
    name: 'Shinhan DS Finance SW Academy',
    label: '🥇 Top Prize',
    project: 'Penglobe',
    description: 'Recognized for technical quality and service implementation in the team project',
  },
  'inu-encouragement': {
    name: 'Incheon National University Capstone Competition',
    label: '🥉 Honorable Mention',
    project: 'commINUty',
    description: 'Awarded for a GPS-based community app',
  },
};

export const educationEn = {
  'ai-sw-maestro-busan-17': {
    name: 'AI·SW Maestro Busan, 17th cohort',
    label: 'In progress',
    date: '2026.05 ~ Present',
    description: 'Team project in progress',
  },
  'shinhan-ds-finance-sw-academy': {
    name: 'Shinhan DS Finance SW Academy',
    label: 'Completed · 976 hours',
    description: 'Completed a finance-domain software development program and built full-stack experience',
  },
  'inu-computer-science': {
    name: 'Incheon National University, Computer Science & Engineering',
    label: 'B.S.',
    description: 'Bachelor’s degree in Computer Science & Engineering',
  },
};

export const certificationsEn = {
  'info-proc': {
    name: 'Engineer Information Processing',
  },
};

export const projectsEn = {
  5: {
    name: 'TypeCat - Typing sounds and a tiny desktop friend',
    period: '2026.10 ~ Present',
    websiteUrl: '/typecat/en/',
    overview:
      'A native macOS menu bar app where typing sounds and a desktop character react to your keystrokes. It comes with 12 built-in sounds, 4 characters, your own imported images and audio, and a timer with Pomodoro, and is getting ready for the Mac App Store.',
    role: [
      'Built the Swift/SwiftUI menu bar UI, the desktop character, the timer, and the custom library',
      'Used a listen-only global event tap that briefly handles only the key type and the time between events — typed text is never extracted, stored, or sent',
      'Set up the sandboxed App Store archive, Intel and Apple Silicon builds, and the signing and public-resource verification flow',
      'Published the Korean/English product page, support guide, and privacy policy on GitHub Pages',
    ],
    learnings: [
      'Built a five-keypress check that tells the system permission switch apart from real global input delivery',
      'Kept custom files and settings on the device, and kept development and personal resources out of the release package',
      'Preparing the Mac App Store submission while testing the free character lineup, the custom library, and distribution policies',
    ],
  },
  4: {
    name: 'RAIM Visitor Check-in System',
    overview:
      'An operations web system that collects and backs up on-site visitor entry data at the Seoul Robot & AI Museum. It combines AI face-based gender and age-group detection with manual input, and backs up Firestore data to Google Sheets automatically.',
    role: [
      'Built it solo, end to end — from requirements analysis and specs to deployment and operations',
      'Added localStorage-based daily stats and a per-gallery status view so on-site staff can check entries at a glance',
      'Designed paginated reads, 500-item batch deletes, and retry logic so it runs reliably within the Firestore free tier',
      'Gave operators a PIN-protected admin dashboard and manual backup so they can handle failures themselves',
      'Reduced the risk of missing data with backup-failure email alerts and a retry strategy',
      'Set up GitHub-connected Vercel deployment so every push goes live right away',
    ],
    learnings: [
      'Built a real check-in, statistics, and backup workflow used by on-site staff',
      'Automated a serverless data pipeline from collection all the way to backup',
      'Designed batching, retries, and failure handling around free-tier quotas and execution-time limits',
    ],
  },
  1: {
    name: '🐧 Penglobe - Eco-conscious consumption platform',
    overview:
      'A mobile platform that converts walking and eating habits into carbon savings, and links the rewards to eco-friendly purchases and donations. It turns what users do into visual feedback and rewards so green habits stick.',
    role: [
      'Full-stack Peng-Walk feature: Designed and built the full flow that turns movement data collected in the app into carbon savings and stores it on the server',
      'Fake-movement prevention: Stops data collection automatically when abnormally fast movement is detected, keeping the reward system trustworthy',
      'Battery optimization: Ends location tracking automatically once the user is close enough to the destination',
      'Docker-based deployment: Led the Spring Boot + MariaDB container setup and deployment pipeline',
      'Resolved Expo SDK compatibility issues and owned the Android build and release',
      'Improved loading states on data-heavy screens such as rankings and My Page to ease the wait',
    ],
    learnings: [
      'In the pilot, 94.4% of users said it helped them build eco-friendly habits',
      'Won the Top Prize at the Shinhan DS Finance SW Academy — recognized for service quality and technical skill',
      'Went through the whole cycle with the team — planning, server and app development, and real deployment and operations',
    ],
  },
  2: {
    name: 'Takku – Funding platform for small businesses',
    overview:
      'A marketing platform where small business owners list funding products and use LLM-powered promo copy, review summaries, and recommendations.',
    role: [
      'Split the AI module out into FastAPI and connected it to the Spring server as microservices',
      'Recommendation system: Applied a hybrid algorithm combining TF-IDF and cosine similarity',
      'Fed the dashboard with review summarization (TextRank) and positive/negative keyword extraction',
      'Stabilized LLM response parsing with context injection, output formatting, regex validation, and retries',
      'Built core APIs on Spring Legacy + Oracle and documented them with Swagger to speed up frontend collaboration',
      'Built a JSP + Chart.js dashboard and deployed and ran it myself on AWS EC2',
    ],
    learnings: [
      'Separated FastAPI from the Spring server to run AI features as an independent module',
      'Designed prompts and post-processing that improve LLM response quality and parsing stability',
      'Delivered end-to-end features that carry recommendation, summary, and keyword results through to the dashboard',
    ],
  },
  3: {
    name: 'commINUty – Location-based social networking app',
    overview: 'A mobile community service that uses GPS-based location verification to help nearby users talk and share information.',
    role: [
      'As team lead, managed schedules and issues and drove key technical decisions',
      'Designed Spring Security + JWT authentication and authorization for a stateless security model',
      'Owned the ERD and core APIs, and led feature specs and data modeling',
      'Analyzed execution plans with EXPLAIN and designed indexes for filtered and sorted queries — comment lists, map markers, notifications — to reduce full-scan risk',
      'Used Redis for verification codes with TTL, a popular-post cache, and refresh tokens to cut repeated DB access and prepare for multiple instances',
      'Built a reporting process to sanction abusive users and keep the community healthy',
      'Deployed on AWS EC2 + RDS (MySQL) for a real production environment',
    ],
    learnings: [
      'Won an Honorable Mention at the Incheon National University Capstone Competition',
      'Cut the comment list API response time (0.271s → 0.033s) to improve DB read performance',
      'Eased read bottlenecks as data grows with index design and Redis caching',
      'Led the project as team lead, gaining experience in requirements management, scheduling, and technical decisions',
      'Designed the backend end to end — auth, data modeling, performance tuning, and deployment',
    ],
  },
};
