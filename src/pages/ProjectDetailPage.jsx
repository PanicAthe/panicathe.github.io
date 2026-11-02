import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox/Lightbox';
import { MediaThumbs, ProjectLinks, ProjectResults, ProjectRoles, ProjectStack } from '../components/ProjectSections/ProjectSections';
import { getPoster, getProjectView, isVideo, splitName } from '../utils/project';
import './ProjectDetailPage.css';

const SECTIONS = [
  { id: 'overview', label: '개요' },
  { id: 'results', label: '성과' },
  { id: 'role', label: '내가 한 일' },
  { id: 'stack', label: '기술 스택' },
  { id: 'links', label: '링크' },
];

function ProjectDetailPage({ projects = [] }) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [mediaIndex, setMediaIndex] = useState(0);
  const [lightboxMedia, setLightboxMedia] = useState(null);

  const index = projects.findIndex((p) => p.id === Number(projectId));
  const project = index >= 0 ? projects[index] : null;

  useEffect(() => {
    setMediaIndex(0);
    window.scrollTo({ top: 0 });
    if (project) document.title = `${splitName(project.name).title} — 최은진`;
    return () => {
      document.title = '최은진 — Backend Developer';
    };
  }, [project]);

  // 사이트 안에서 들어왔으면 뒤로, 링크로 바로 들어왔으면 메인으로 이동
  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/');
  };

  if (!project) {
    return (
      <main className="case case--empty">
        <p className="case__eyebrow">[ 404 ]</p>
        <h1 className="case__title">프로젝트를 찾을 수 없어요</h1>
        <Link to="/" className="case__btn case__btn--primary">
          메인으로 가기 →
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
      <nav className="case__bar" aria-label="프로젝트 탐색">
        <button type="button" className="case__btn" onClick={goBack}>
          ← 목록으로
        </button>
        <Link to="/" className="case__logo">
          EJ/CHOI
        </Link>
        <Link to={`/project/${next.id}`} className="case__btn case__btn--ink">
          다음 · {nextTitle} →
        </Link>
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
            <dt>기간</dt>
            <dd>{project.period}</dd>
          </div>
          {award && (
            <div>
              <dt>수상</dt>
              <dd className="case__facts-accent">
                {award.name} {awardLabel}
              </dd>
            </div>
          )}
          {coreTechs.length > 0 && (
            <div>
              <dt>핵심 스택</dt>
              <dd>{coreTechs.slice(0, 4).join(' · ')}</dd>
            </div>
          )}
          {(websiteUrl || repos.length > 0) && (
            <div className="case__facts-links">
              {websiteUrl && (
                <a href={websiteUrl} className="case__btn case__btn--primary">
                  홈페이지 ↗
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
        <section className="case__gallery" aria-label="프로젝트 미디어">
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
                <img src={currentMedia} alt={`${title} 화면 ${mediaIndex + 1}`} />
                <button type="button" className="case__zoom" onClick={() => setLightboxMedia(currentMedia)} aria-label="크게 보기">
                  ⤢
                </button>
              </>
            )}
          </div>
          <MediaThumbs project={project} media={media} activeIndex={mediaIndex} onSelect={setMediaIndex} />
        </section>
      )}

      <div className="case__body">
        <nav className="case__toc" aria-label="목차">
          {SECTIONS.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>{String(i + 1).padStart(2, '0')}</span> {section.label}
            </a>
          ))}
        </nav>

        <article className="case__content">
          <section id="overview" className="case__section">
            <p className="case__lead">{project.overview}</p>
          </section>

          <section id="results" className="case__section">
            <h2 className="case__heading">성과</h2>
            <ProjectResults view={view} />
          </section>

          <section id="role" className="case__section">
            <h2 className="case__heading">내가 한 일</h2>
            <ProjectRoles roles={view.roles} />
          </section>

          <section id="stack" className="case__section">
            <h2 className="case__heading">기술 스택</h2>
            <ProjectStack coreTechs={view.coreTechs} otherTechs={view.otherTechs} />
          </section>

          <section id="links" className="case__section">
            <h2 className="case__heading">링크</h2>
            {websiteUrl || repos.length > 0 ? (
              <ProjectLinks websiteUrl={websiteUrl} repos={repos} />
            ) : (
              <p className="case__muted">공개된 저장소가 없는 프로젝트예요.</p>
            )}
          </section>
        </article>
      </div>

      <footer className="case__next">
        <p className="case__eyebrow">[ NEXT PROJECT ]</p>
        <Link to={`/project/${next.id}`} className="case__next-link">
          {nextTitle} <span aria-hidden="true">→</span>
        </Link>
      </footer>

      {lightboxMedia && <Lightbox media={lightboxMedia} onClose={() => setLightboxMedia(null)} />}
    </div>
  );
}

export default ProjectDetailPage;
