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
