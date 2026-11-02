// 프로젝트 카드·모달에서 함께 쓰는 표시용 헬퍼

// "🐧 Penglobe - 친환경 ..." → { title: 'Penglobe', subtitle: '친환경 ...' }
export function splitName(name = '') {
  const clean = name.replace(/^[^\p{L}\p{N}]+/u, '').trim();
  const [title, ...rest] = clean.split(/\s[-–]\s/);
  return { title: title.trim(), subtitle: rest.join(' - ').trim() };
}

export function stripEmoji(text = '') {
  return text.replace(/[^\p{L}\p{N}\s·().,]/gu, '').trim();
}

// "펭걸음 기능 풀스택 개발: 앱에서 ..." → { lead: '펭걸음 기능 풀스택 개발', text: '앱에서 ...' }
export function splitLead(sentence = '') {
  const index = sentence.indexOf(':');
  if (index > 0 && index < 40) {
    return { lead: sentence.slice(0, index).trim(), text: sentence.slice(index + 1).trim() };
  }
  return { lead: '', text: sentence };
}

// 성과 문장에서 강조할 수치("94.4%", "0.271s → 0.033s")를 찾는다
const METRIC_PATTERN = /\d+(?:\.\d+)?s\s*→\s*\d+(?:\.\d+)?s|\d+(?:\.\d+)?%/;

export function findMetric(sentence = '') {
  const match = sentence.match(METRIC_PATTERN);
  return match ? match[0].replace(/\s+/g, ' ') : null;
}

export function getProjectMedia(project) {
  if (!project) return [];
  return [project.thumbnailUrl, ...(project.galleryImageUrls || []), ...(project.galleryVideoUrls || [])].filter(
    (url, index, list) => url && list.indexOf(url) === index
  );
}

export function isVideo(url = '') {
  return url.split('?')[0].endsWith('.mp4');
}

// 메인 기술로 강조할 스택 (나머지는 보조 칩으로 표시)
export const CORE_TECHS = ['Java', 'Spring Boot', 'Spring Legacy', 'Python', 'AWS', 'Docker', 'JPA', 'MySQL', 'Redis', 'React Native', 'JavaScript', 'Swift', 'SwiftUI', 'React'];

const REPO_LABELS = {
  repository: 'Repository',
  backend: 'Backend Repository',
  frontend: 'Frontend Repository',
  aiApi: 'AI API Repository',
  organization: 'GitHub Organization',
};

// 이 길이를 넘는 제목은 한 단계 작은 글자로 보여준다
const LONG_TITLE_LENGTH = 12;

export function isLongTitle(title = '') {
  return title.length > LONG_TITLE_LENGTH;
}

// 썸네일 줄에서 무거운 GIF·영상 원본 대신 보여줄 것: 경량 이미지 또는 표시 글자
export function getThumbnail(project, url) {
  if (url === project.thumbnailUrl && project.cardImageUrl) return { src: project.cardImageUrl };
  if (isVideo(url)) return { label: '▶' };
  if (url.split('?')[0].endsWith('.gif')) return { label: 'GIF' };
  return { src: url };
}

// 영상의 첫 화면으로 쓸 이미지 (대표 영상일 때만 카드 썸네일을 포스터로 사용)
export function getPoster(project, url) {
  return url === project.thumbnailUrl ? project.cardImageUrl : undefined;
}

// 모달과 상세 페이지가 함께 쓰는 표시용 데이터
export function getProjectView(project) {
  const { title, subtitle } = splitName(project.name);
  const award = project.award ?? null;
  const awardLabel = award ? stripEmoji(award.label) : '';
  const learnings = project.learnings || [];
  const technologies = project.technologies || [];
  const repos = Object.entries(project.githubUrls || {}).map(([key, url]) => ({ key, url, label: REPO_LABELS[key] || key }));

  return {
    title,
    subtitle,
    isLongTitle: isLongTitle(title),
    award,
    awardLabel,
    media: getProjectMedia(project),
    metrics: learnings
      .map((sentence) => ({ sentence, metric: findMetric(sentence) }))
      .filter((item) => item.metric),
    // 수치 카드나 수상 카드로 이미 보여준 문장은 목록에서 뺀다
    otherLearnings: learnings.filter((sentence) => !findMetric(sentence) && !(awardLabel && sentence.includes(awardLabel))),
    coreTechs: technologies.filter((tech) => CORE_TECHS.includes(tech)),
    otherTechs: technologies.filter((tech) => !CORE_TECHS.includes(tech)),
    roles: (project.role || []).map(splitLead),
    repos,
    primaryRepo: repos.find((repo) => repo.key === 'repository' || repo.key === 'backend') || repos[0] || null,
    websiteUrl: project.websiteUrl || null,
  };
}
