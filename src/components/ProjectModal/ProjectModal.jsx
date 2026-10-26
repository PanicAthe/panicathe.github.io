import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectContext';
import { findMetric, getProjectMedia, isVideo, splitLead, splitName, stripEmoji } from '../../utils/project';
import './ProjectModal.css';

const CORE_TECHS = ['Java', 'Spring Boot', 'Spring Legacy', 'Python', 'AWS', 'Docker', 'JPA', 'MySQL', 'Redis', 'React Native', 'JavaScript', 'Swift', 'SwiftUI', 'React'];

const REPO_LABELS = {
  repository: 'Repository',
  backend: 'Backend Repository',
  frontend: 'Frontend Repository',
  aiApi: 'AI API Repository',
  organization: 'GitHub Organization',
};

function MediaView({ url, title }) {
  if (isVideo(url)) {
    return <video key={url} src={url} controls autoPlay muted loop playsInline aria-label={`${title} 데모 영상`} />;
  }
  return <img src={url} alt={`${title} 화면`} />;
}

function ProjectModal({ project, onClose, awards = [] }) {
  const { projects = [], selectProject } = useProjects();
  const navigate = useNavigate();
  const [mediaIndex, setMediaIndex] = useState(0);
  const closeRef = useRef(null);
  const bodyRef = useRef(null);

  const position = project ? projects.findIndex((p) => p.id === project.id) : -1;

  useEffect(() => {
    setMediaIndex(0);
    bodyRef.current?.scrollTo({ top: 0 });
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const goTo = (offset) => {
      if (position < 0 || projects.length < 2) return;
      selectProject(projects[(position + offset + projects.length) % projects.length]);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(1);
      if (e.key === 'ArrowLeft') goTo(-1);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, position, projects, selectProject]);

  if (!project) return null;

  const { title, subtitle } = splitName(project.name);
  const media = getProjectMedia(project);
  const award = awards.find((a) => a.projectId === project.id);
  const total = String(projects.length).padStart(2, '0');

  const metricTiles = (project.learnings || [])
    .map((sentence) => ({ sentence, metric: findMetric(sentence) }))
    .filter((item) => item.metric);
  const otherLearnings = (project.learnings || []).filter(
    (sentence) => !findMetric(sentence) && !(award && sentence.includes(stripEmoji(award.label)))
  );

  const technologies = project.technologies || [];
  const coreTechs = technologies.filter((tech) => CORE_TECHS.includes(tech));
  const otherTechs = technologies.filter((tech) => !CORE_TECHS.includes(tech));

  const repos = Object.entries(project.githubUrls || {});
  const primaryRepo = repos.find(([key]) => key === 'repository' || key === 'backend') || repos[0];

  const goTo = (offset) => {
    if (position < 0) return;
    selectProject(projects[(position + offset + projects.length) % projects.length]);
  };

  const openDetailPage = () => {
    onClose();
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <aside
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sheet__bar">
          <span className="sheet__position">
            {String(position + 1).padStart(2, '0')} / {total} · PROJECT
          </span>
          <div className="sheet__bar-actions">
            <button type="button" className="sheet__round" onClick={() => goTo(-1)} aria-label="이전 프로젝트">
              ←
            </button>
            <button type="button" className="sheet__round" onClick={() => goTo(1)} aria-label="다음 프로젝트">
              →
            </button>
            <button type="button" className="sheet__round sheet__round--close" onClick={onClose} aria-label="닫기" ref={closeRef}>
              ✕
            </button>
          </div>
        </header>

        <div className="sheet__body" ref={bodyRef}>
          <div className="sheet__meta">
            {award && <span className="sheet__award">{stripEmoji(award.label)}</span>}
            <span className="sheet__period">{project.period}</span>
          </div>
          <h2 id="sheet-title" className={`sheet__title${title.length > 12 ? ' sheet__title--long' : ''}`}>
            {title}
          </h2>
          {subtitle && <p className="sheet__subtitle">{subtitle}</p>}

          {media.length > 0 && (
            <div className="sheet__media">
              <div className="sheet__viewer">
                <MediaView url={media[mediaIndex]} title={title} />
              </div>
              {media.length > 1 && (
                <div className="sheet__thumbs" role="list" aria-label="프로젝트 미디어">
                  {media.map((url, index) => (
                    <button
                      key={url}
                      type="button"
                      role="listitem"
                      className={`sheet__thumb${index === mediaIndex ? ' is-active' : ''}`}
                      onClick={() => setMediaIndex(index)}
                      aria-label={`${isVideo(url) ? '영상' : '이미지'} ${index + 1} 보기`}
                      aria-current={index === mediaIndex}
                    >
                      {isVideo(url) ? <span className="sheet__thumb-video">▶</span> : <img src={url} alt="" loading="lazy" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="sheet__overview">{project.overview}</p>

          {(metricTiles.length > 0 || award || otherLearnings.length > 0) && (
            <section className="sheet__section">
              <h3 className="sheet__label">RESULTS</h3>
              {(metricTiles.length > 0 || award) && (
                <div className="sheet__tiles">
                  {metricTiles.map(({ sentence, metric }) => (
                    <div key={sentence} className="sheet__tile sheet__tile--klein">
                      <strong className={`sheet__tile-figure${metric.length > 7 ? ' sheet__tile-figure--long' : ''}`}>{metric}</strong>
                      <span className="sheet__tile-text">{sentence}</span>
                    </div>
                  ))}
                  {award && (
                    <div className="sheet__tile sheet__tile--ink">
                      <strong className="sheet__tile-figure">{stripEmoji(award.label)}</strong>
                      <span className="sheet__tile-text">
                        {award.name} · {award.date}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {otherLearnings.length > 0 && (
                <ul className="sheet__bullets">
                  {otherLearnings.map((sentence) => (
                    <li key={sentence}>{sentence}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {project.role?.length > 0 && (
            <section className="sheet__section">
              <h3 className="sheet__label">WHAT I DID</h3>
              <ol className="sheet__roles">
                {project.role.map((sentence, index) => {
                  const { lead, text } = splitLead(sentence);
                  return (
                    <li key={sentence}>
                      <span className="sheet__role-no">{String(index + 1).padStart(2, '0')}</span>
                      <span>
                        {lead && <strong>{lead}</strong>}
                        {lead && ' — '}
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {technologies.length > 0 && (
            <section className="sheet__section">
              <h3 className="sheet__label">STACK</h3>
              <ul className="sheet__chips">
                {coreTechs.map((tech) => (
                  <li key={tech} className="sheet__chip sheet__chip--core">
                    {tech}
                  </li>
                ))}
                {otherTechs.map((tech) => (
                  <li key={tech} className="sheet__chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(repos.length > 1 || project.websiteUrl) && (
            <section className="sheet__section">
              <h3 className="sheet__label">LINKS</h3>
              <ul className="sheet__links">
                {project.websiteUrl && (
                  <li>
                    <a href={project.websiteUrl}>
                      홈페이지 · 사용 안내 · 개인정보처리방침 <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                )}
                {repos.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {REPO_LABELS[key] || key} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <footer className="sheet__footer">
          <button type="button" className="sheet__btn sheet__btn--primary" onClick={openDetailPage}>
            상세 페이지 보기 <span aria-hidden="true">→</span>
          </button>
          {project.websiteUrl ? (
            <a className="sheet__btn" href={project.websiteUrl}>
              홈페이지 <span aria-hidden="true">↗</span>
            </a>
          ) : (
            primaryRepo && (
              <a className="sheet__btn" href={primaryRepo[1]} target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            )
          )}
        </footer>
      </aside>
    </div>
  );
}

export default ProjectModal;
