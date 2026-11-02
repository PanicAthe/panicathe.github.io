import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProjects } from '../../contexts/ProjectContext';
import { getPoster, getProjectView, isVideo } from '../../utils/project';
import { MediaThumbs, ProjectLinks, ProjectResults, ProjectRoles, ProjectStack } from '../ProjectSections/ProjectSections';
import './ProjectModal.css';

// 영상은 자동 재생하지 않고(최대 수십 MB) 썸네일을 포스터로 보여준다
function MediaView({ url, title, poster }) {
  const { t } = useLanguage();
  if (isVideo(url)) {
    return (
      <video key={url} src={url} poster={poster} controls muted playsInline preload="metadata" aria-label={t.project.video(title)} />
    );
  }
  return <img src={url} alt={t.project.image(title)} />;
}

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

// 방향키를 직접 쓰는 요소(영상 탐색, 입력창)에서는 프로젝트 이동을 하지 않는다
function usesArrowKeys(target) {
  return target instanceof Element && Boolean(target.closest('video, audio, input, textarea, select, [contenteditable="true"]'));
}

// Tab 포커스가 모달 밖(뒤의 페이지)으로 나가지 않도록 처음과 끝을 이어 준다
function trapFocus(event, container) {
  if (!container) return;
  const items = [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;

  if (!container.contains(active)) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function ProjectModal({ project, onClose }) {
  const { projects = [], selectProject } = useProjects();
  const navigate = useNavigate();
  const { t, localePath } = useLanguage();
  const [mediaIndex, setMediaIndex] = useState(0);
  const sheetRef = useRef(null);
  const closeRef = useRef(null);
  const bodyRef = useRef(null);

  const isOpen = Boolean(project);
  const position = project ? projects.findIndex((p) => p.id === project.id) : -1;

  const goTo = useCallback(
    (offset) => {
      if (position < 0 || projects.length < 2) return;
      selectProject(projects[(position + offset + projects.length) % projects.length]);
    },
    [position, projects, selectProject]
  );

  const projectId = project?.id;
  useEffect(() => {
    setMediaIndex(0);
    bodyRef.current?.scrollTo({ top: 0 });
  }, [projectId]);

  // 열릴 때 스크롤을 잠그고 닫기 버튼으로 포커스를 옮기며, 닫히면 원래 누른 요소로 포커스를 돌려준다
  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'Tab') trapFocus(e, sheetRef.current);
      else if (e.key === 'ArrowRight' && !usesArrowKeys(e.target)) goTo(1);
      else if (e.key === 'ArrowLeft' && !usesArrowKeys(e.target)) goTo(-1);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goTo]);

  if (!project) return null;

  const view = getProjectView(project);
  const { title, subtitle, media, award, awardLabel, repos, primaryRepo, websiteUrl } = view;
  const total = String(projects.length).padStart(2, '0');
  const currentMedia = media[mediaIndex];

  const openDetailPage = () => {
    onClose();
    navigate(localePath(`/project/${project.id}`));
  };

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <aside
        ref={sheetRef}
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
            <button type="button" className="sheet__round" onClick={() => goTo(-1)} aria-label={t.modal.prev}>
              ←
            </button>
            <button type="button" className="sheet__round" onClick={() => goTo(1)} aria-label={t.modal.next}>
              →
            </button>
            <button type="button" className="sheet__round sheet__round--close" onClick={onClose} aria-label={t.modal.close} ref={closeRef}>
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
            {t.modal.openDetail} <span aria-hidden="true">→</span>
          </button>
          {websiteUrl ? (
            <a className="sheet__btn" href={websiteUrl}>
              {t.project.website} <span aria-hidden="true">↗</span>
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
