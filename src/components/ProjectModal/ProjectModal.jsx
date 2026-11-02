import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectContext';
import { getPoster, getProjectView, isVideo } from '../../utils/project';
import { MediaThumbs, ProjectLinks, ProjectResults, ProjectRoles, ProjectStack } from '../ProjectSections/ProjectSections';
import './ProjectModal.css';

// 영상은 자동 재생하지 않고(최대 수십 MB) 썸네일을 포스터로 보여준다
function MediaView({ url, title, poster }) {
  if (isVideo(url)) {
    return (
      <video key={url} src={url} poster={poster} controls muted playsInline preload="metadata" aria-label={`${title} 데모 영상`} />
    );
  }
  return <img src={url} alt={`${title} 화면`} />;
}

function ProjectModal({ project, onClose }) {
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

  const view = getProjectView(project);
  const { title, subtitle, media, award, awardLabel, repos, primaryRepo, websiteUrl } = view;
  const total = String(projects.length).padStart(2, '0');
  const currentMedia = media[mediaIndex];

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
            {award && <span className="sheet__award">{awardLabel}</span>}
            <span className="sheet__period">{project.period}</span>
          </div>
          <h2 id="sheet-title" className={`sheet__title${view.isLongTitle ? ' sheet__title--long' : ''}`}>
            {title}
          </h2>
          {subtitle && <p className="sheet__subtitle">{subtitle}</p>}

          {media.length > 0 && (
            <div className="sheet__media">
              <div className="sheet__viewer">
                <MediaView url={currentMedia} title={title} poster={getPoster(project, currentMedia)} />
              </div>
              <MediaThumbs project={project} media={media} activeIndex={mediaIndex} onSelect={setMediaIndex} />
            </div>
          )}

          <p className="sheet__overview">{project.overview}</p>

          {(view.metrics.length > 0 || award || view.otherLearnings.length > 0) && (
            <section className="sheet__section">
              <h3 className="sheet__label">RESULTS</h3>
              <ProjectResults view={view} />
            </section>
          )}

          {view.roles.length > 0 && (
            <section className="sheet__section">
              <h3 className="sheet__label">WHAT I DID</h3>
              <ProjectRoles roles={view.roles} />
            </section>
          )}

          {view.coreTechs.length + view.otherTechs.length > 0 && (
            <section className="sheet__section">
              <h3 className="sheet__label">STACK</h3>
              <ProjectStack coreTechs={view.coreTechs} otherTechs={view.otherTechs} />
            </section>
          )}

          {(repos.length > 1 || websiteUrl) && (
            <section className="sheet__section">
              <h3 className="sheet__label">LINKS</h3>
              <ProjectLinks websiteUrl={websiteUrl} repos={repos} />
            </section>
          )}
        </div>

        <footer className="sheet__footer">
          <button type="button" className="sheet__btn sheet__btn--primary" onClick={openDetailPage}>
            상세 페이지 보기 <span aria-hidden="true">→</span>
          </button>
          {websiteUrl ? (
            <a className="sheet__btn" href={websiteUrl}>
              홈페이지 <span aria-hidden="true">↗</span>
            </a>
          ) : (
            primaryRepo && (
              <a className="sheet__btn" href={primaryRepo.url} target="_blank" rel="noopener noreferrer">
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
