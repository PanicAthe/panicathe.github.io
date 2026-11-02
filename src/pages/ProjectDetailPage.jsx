import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox/Lightbox';
import { findMetric, getProjectMedia, isVideo, splitLead, splitName, stripEmoji } from '../utils/project';
import './ProjectDetailPage.css';

const CORE_TECHS = ['Java', 'Spring Boot', 'Spring Legacy', 'Python', 'AWS', 'Docker', 'JPA', 'MySQL', 'Redis', 'React Native', 'JavaScript', 'Swift', 'SwiftUI', 'React'];

const REPO_LABELS = {
  repository: 'Repository',
  backend: 'Backend Repository',
  frontend: 'Frontend Repository',
  aiApi: 'AI API Repository',
  organization: 'GitHub Organization',
};

const SECTIONS = [
  { id: 'overview', label: '개요' },
  { id: 'results', label: '성과' },
  { id: 'role', label: '내가 한 일' },
  { id: 'stack', label: '기술 스택' },
  { id: 'links', label: '링크' },
];

function ProjectDetailPage({ projects = [], awards = [] }) {
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

  const { title, subtitle } = splitName(project.name);
  const media = getProjectMedia(project);
  const award = awards.find((a) => a.projectId === project.id);
  const next = projects[(index + 1) % projects.length];
  const nextTitle = splitName(next.name).title;

  const technologies = project.technologies || [];
  const coreTechs = technologies.filter((tech) => CORE_TECHS.includes(tech));
  const otherTechs = technologies.filter((tech) => !CORE_TECHS.includes(tech));

  const metricTiles = (project.learnings || [])
    .map((sentence) => ({ sentence, metric: findMetric(sentence) }))
    .filter((item) => item.metric);
  const otherLearnings = (project.learnings || []).filter(
    (sentence) => !findMetric(sentence) && !(award && sentence.includes(stripEmoji(award.label)))
  );

  const repos = Object.entries(project.githubUrls || {});
  const currentMedia = media[mediaIndex];

  const renderThumb = (url) => {
    if (url === project.thumbnailUrl && project.cardImageUrl) return <img src={project.cardImageUrl} alt="" loading="lazy" />;
    if (isVideo(url)) return <span className="case__thumb-label">▶</span>;
    if (url.split('?')[0].endsWith('.gif')) return <span className="case__thumb-label">GIF</span>;
    return <img src={url} alt="" loading="lazy" />;
  };

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
          <h1 className={`case__title${title.length > 12 ? ' case__title--long' : ''}`}>
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
                {award.name} {stripEmoji(award.label)}
              </dd>
            </div>
          )}
          {coreTechs.length > 0 && (
            <div>
              <dt>핵심 스택</dt>
              <dd>{coreTechs.slice(0, 4).join(' · ')}</dd>
            </div>
          )}
          {(project.websiteUrl || repos.length > 0) && (
            <div className="case__facts-links">
              {project.websiteUrl && (
                <a href={project.websiteUrl} className="case__btn case__btn--primary">
                  홈페이지 ↗
                </a>
              )}
              {repos.slice(0, 2).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="case__btn">
                  {REPO_LABELS[key] || key} ↗
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
                poster={currentMedia === project.thumbnailUrl ? project.cardImageUrl : undefined}
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
          {media.length > 1 && (
            <div className="case__thumbs">
              {media.map((url, i) => (
                <button
                  key={url}
                  type="button"
                  className={`case__thumb${i === mediaIndex ? ' is-active' : ''}`}
                  onClick={() => setMediaIndex(i)}
                  aria-label={`${isVideo(url) ? '영상' : '이미지'} ${i + 1} 보기`}
                  aria-current={i === mediaIndex}
                >
                  {renderThumb(url)}
                </button>
              ))}
            </div>
          )}
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
            {(metricTiles.length > 0 || award) && (
              <div className="case__stats">
                {metricTiles.map(({ sentence, metric }) => (
                  <div key={sentence} className="case__stat">
                    <strong className={metric.length > 7 ? 'is-long' : undefined}>{metric}</strong>
                    <span>{sentence}</span>
                  </div>
                ))}
                {award && (
                  <div className="case__stat case__stat--ink">
                    <strong>{stripEmoji(award.label)}</strong>
                    <span>
                      {award.name} · {award.date}
                    </span>
                  </div>
                )}
              </div>
            )}
            {otherLearnings.length > 0 && (
              <ul className="case__bullets">
                {otherLearnings.map((sentence) => (
                  <li key={sentence}>{sentence}</li>
                ))}
              </ul>
            )}
          </section>

          <section id="role" className="case__section">
            <h2 className="case__heading">내가 한 일</h2>
            <ol className="case__roles">
              {(project.role || []).map((sentence, i) => {
                const { lead, text } = splitLead(sentence);
                return (
                  <li key={sentence}>
                    <span className="case__role-no">{String(i + 1).padStart(2, '0')}</span>
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

          <section id="stack" className="case__section">
            <h2 className="case__heading">기술 스택</h2>
            <ul className="case__chips">
              {coreTechs.map((tech) => (
                <li key={tech} className="case__chip case__chip--core">
                  {tech}
                </li>
              ))}
              {otherTechs.map((tech) => (
                <li key={tech} className="case__chip">
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <section id="links" className="case__section">
            <h2 className="case__heading">링크</h2>
            {project.websiteUrl || repos.length > 0 ? (
              <ul className="case__links">
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
