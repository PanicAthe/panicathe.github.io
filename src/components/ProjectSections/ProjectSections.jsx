import { getThumbnail, isVideo } from '../../utils/project';
import './ProjectSections.css';

// 프로젝트 모달(ProjectModal)과 상세 페이지(ProjectDetailPage)가 함께 쓰는 섹션들.
// 크기 차이는 각 컨테이너에서 --ps-* CSS 변수로 조정한다.

export function MediaThumbs({ project, media, activeIndex, onSelect, label = '프로젝트 미디어' }) {
  if (media.length < 2) return null;

  return (
    <div className="ps-thumbs" role="list" aria-label={label}>
      {media.map((url, index) => {
        const thumb = getThumbnail(project, url);
        return (
          <button
            key={url}
            type="button"
            role="listitem"
            className={`ps-thumb${index === activeIndex ? ' is-active' : ''}`}
            onClick={() => onSelect(index)}
            aria-label={`${isVideo(url) ? '영상' : '이미지'} ${index + 1} 보기`}
            aria-current={index === activeIndex}
          >
            {thumb.src ? <img src={thumb.src} alt="" loading="lazy" /> : <span className="ps-thumb-label">{thumb.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function ProjectResults({ view }) {
  const { metrics, award, awardLabel, otherLearnings } = view;
  if (metrics.length === 0 && !award && otherLearnings.length === 0) return null;

  return (
    <>
      {(metrics.length > 0 || award) && (
        <div className="ps-tiles">
          {metrics.map(({ sentence, metric }) => (
            <div key={sentence} className="ps-tile ps-tile--klein">
              <strong className={`ps-figure${metric.length > 7 ? ' ps-figure--long' : ''}`}>{metric}</strong>
              <span className="ps-tile-text">{sentence}</span>
            </div>
          ))}
          {award && (
            <div className="ps-tile ps-tile--ink">
              <strong className="ps-figure">{awardLabel}</strong>
              <span className="ps-tile-text">
                {award.name} · {award.date}
              </span>
            </div>
          )}
        </div>
      )}
      {otherLearnings.length > 0 && (
        <ul className="ps-bullets">
          {otherLearnings.map((sentence) => (
            <li key={sentence}>{sentence}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function ProjectRoles({ roles }) {
  if (roles.length === 0) return null;

  return (
    <ol className="ps-roles">
      {roles.map(({ lead, text }, index) => (
        <li key={`${lead}${text}`}>
          <span className="ps-role-no">{String(index + 1).padStart(2, '0')}</span>
          <span>
            {lead && <strong>{lead}</strong>}
            {lead && ' — '}
            {text}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ProjectStack({ coreTechs, otherTechs }) {
  if (coreTechs.length + otherTechs.length === 0) return null;

  return (
    <ul className="ps-chips">
      {coreTechs.map((tech) => (
        <li key={tech} className="ps-chip ps-chip--core">
          {tech}
        </li>
      ))}
      {otherTechs.map((tech) => (
        <li key={tech} className="ps-chip">
          {tech}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ websiteUrl, repos }) {
  if (!websiteUrl && repos.length === 0) return null;

  return (
    <ul className="ps-links">
      {websiteUrl && (
        <li>
          <a href={websiteUrl}>
            홈페이지 · 사용 안내 · 개인정보처리방침 <span aria-hidden="true">↗</span>
          </a>
        </li>
      )}
      {repos.map(({ key, url, label }) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {label} <span aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
