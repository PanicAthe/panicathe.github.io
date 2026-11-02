import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LanguageSwitch from '../components/LanguageSwitch/LanguageSwitch';
import Lightbox from '../components/Lightbox/Lightbox';
import { useLanguage } from '../contexts/LanguageContext';
import { MediaThumbs, ProjectLinks, ProjectResults, ProjectRoles, ProjectStack } from '../components/ProjectSections/ProjectSections';
import { getPoster, getProjectView, isVideo, splitName } from '../utils/project';
import './ProjectDetailPage.css';

const SECTION_IDS = ['overview', 'results', 'role', 'stack', 'links'];

function ProjectDetailPage({ projects = [] }) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t, localePath } = useLanguage();
  const [mediaIndex, setMediaIndex] = useState(0);
  const [lightboxMedia, setLightboxMedia] = useState(null);
  const closeLightbox = useCallback(() => setLightboxMedia(null), []);

  const index = projects.findIndex((p) => p.id === Number(projectId));
  const project = index >= 0 ? projects[index] : null;

  // 다른 프로젝트로 넘어갈 때만 처음으로 돌아가고, 언어만 바뀌면 보던 위치를 유지한다
  const projectKey = project?.id;
  useEffect(() => {
    setMediaIndex(0);
    window.scrollTo({ top: 0 });
  }, [projectKey]);

  const pageTitle = project ? t.detail.title(splitName(project.name).title) : t.meta.title;
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // 사이트 안에서 들어왔으면 뒤로, 링크로 바로 들어왔으면 메인으로 이동
  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(localePath('/'));
  };

  if (!project) {
    return (
      <main className="case case--empty">
        <p className="case__eyebrow">[ 404 ]</p>
        <h1 className="case__title">{t.detail.notFound}</h1>
        <Link to={localePath('/')} className="case__btn case__btn--primary">
          {t.detail.goHome}
        </Link>
      </main>
    );
  }

  const view = getProjectView(project);
  const { title, subtitle, media, award, awardLabel, coreTechs, repos, websiteUrl } = view;
  const next = projects[(index + 1) % projects.length];
  const nextTitle = splitName(next.name).title;
  const currentMedia = media[mediaIndex];

  return (
    <div className="case">
      <nav className="case__bar" aria-label={t.detail.nav}>
        <button type="button" className="case__btn" onClick={goBack}>
          {t.detail.back}
        </button>
        <Link to={localePath('/')} className="case__logo">
          EJ/CHOI
        </Link>
        <div className="case__bar-end">
          <LanguageSwitch />
          <Link to={localePath(`/project/${next.id}`)} className="case__btn case__btn--ink">
            {t.detail.next(nextTitle)}
          </Link>
        </div>
      </nav>

      <header className="case__hero">
        <div>
          <p className="case__eyebrow">[ CASE STUDY{subtitle ? ` — ${subtitle}` : ''} ]</p>
          <h1 className={`case__title${view.isLongTitle ? ' case__title--long' : ''}`}>
            {title}
            <span className="case__dot">.</span>
          </h1>
        </div>
        <dl className="case__facts">
          <div>
            <dt>{t.detail.period}</dt>
            <dd>{project.period}</dd>
          </div>
          {award && (
            <div>
              <dt>{t.detail.award}</dt>
              <dd className="case__facts-accent">
                {award.name} {awardLabel}
              </dd>
            </div>
          )}
          {coreTechs.length > 0 && (
            <div>
              <dt>{t.detail.coreStack}</dt>
              <dd>{coreTechs.slice(0, 4).join(' · ')}</dd>
            </div>
          )}
          {(websiteUrl || repos.length > 0) && (
            <div className="case__facts-links">
              {websiteUrl && (
                <a href={websiteUrl} className="case__btn case__btn--primary">
                  {t.project.website} ↗
                </a>
              )}
              {repos.slice(0, 2).map(({ key, url, label }) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="case__btn">
                  {label} ↗
                </a>
              ))}
            </div>
          )}
        </dl>
      </header>

      {media.length > 0 && (
        <section className="case__gallery" aria-label={t.project.media}>
          <div className="case__viewer">
            {isVideo(currentMedia) ? (
              <video
                key={currentMedia}
                src={currentMedia}
                poster={getPoster(project, currentMedia)}
                controls
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <>
                <img src={currentMedia} alt={t.project.screen(title, mediaIndex + 1)} />
                <button type="button" className="case__zoom" onClick={() => setLightboxMedia(currentMedia)} aria-label={t.lightbox.label}>
                  ⤢
                </button>
              </>
            )}
          </div>
          <MediaThumbs project={project} media={media} activeIndex={mediaIndex} onSelect={setMediaIndex} />
        </section>
      )}

      <div className="case__body">
        <nav className="case__toc" aria-label={t.detail.toc}>
          {SECTION_IDS.map((id, i) => (
            <a key={id} href={`#${id}`}>
              <span>{String(i + 1).padStart(2, '0')}</span> {t.detail.sections[id]}
            </a>
          ))}
        </nav>

        <article className="case__content">
          <section id="overview" className="case__section">
            <p className="case__lead">{project.overview}</p>
          </section>

          <section id="results" className="case__section">
            <h2 className="case__heading">{t.detail.sections.results}</h2>
            <ProjectResults view={view} />
          </section>

          <section id="role" className="case__section">
            <h2 className="case__heading">{t.detail.sections.role}</h2>
            <ProjectRoles roles={view.roles} />
          </section>

          <section id="stack" className="case__section">
            <h2 className="case__heading">{t.detail.sections.stack}</h2>
            <ProjectStack coreTechs={view.coreTechs} otherTechs={view.otherTechs} />
          </section>

          <section id="links" className="case__section">
            <h2 className="case__heading">{t.detail.sections.links}</h2>
            {websiteUrl || repos.length > 0 ? (
              <ProjectLinks websiteUrl={websiteUrl} repos={repos} />
            ) : (
              <p className="case__muted">{t.detail.noRepo}</p>
            )}
          </section>
        </article>
      </div>

      <footer className="case__next">
        <p className="case__eyebrow">[ NEXT PROJECT ]</p>
        <Link to={localePath(`/project/${next.id}`)} className="case__next-link">
          {nextTitle} <span aria-hidden="true">→</span>
        </Link>
      </footer>

      {lightboxMedia && <Lightbox media={lightboxMedia} alt={t.lightbox.enlarged(title)} onClose={closeLightbox} />}
    </div>
  );
}

export default ProjectDetailPage;
