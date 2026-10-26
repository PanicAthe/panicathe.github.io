import './WorkStack.css';

// Paper · Klein Blue 카드 색 순환
const CARD_THEMES = ['klein', 'ink', 'white', 'stone', 'ink'];

// "🐧 Penglobe - 친환경 ..." → { title: 'Penglobe', subtitle: '친환경 ...' }
function splitName(name) {
  const clean = name.replace(/^[^\p{L}\p{N}]+/u, '').trim();
  const [title, ...rest] = clean.split(/\s[-–]\s/);
  return { title: title.trim(), subtitle: rest.join(' - ').trim() };
}

function stripEmoji(text = '') {
  return text.replace(/[^\p{L}\p{N}\s·()]/gu, '').trim();
}

function ProjectMedia({ url, title }) {
  if (!url) return <div className="work-card__media-empty">{title}</div>;
  if (url.endsWith('.mp4')) {
    return <video src={url} autoPlay muted loop playsInline aria-label={`${title} 데모 영상`} />;
  }
  return <img src={url} alt={`${title} 화면`} loading="lazy" />;
}

function WorkStack({ projects = [], awards = [], onSelect }) {
  const total = String(projects.length).padStart(2, '0');

  return (
    <section id="work" className="work">
      <div className="work__head">
        <h2 className="work__title">
          WORK<span className="work__count">({projects.length})</span>
        </h2>
        <p className="work__note">카드를 누르면 자세한 내용을 볼 수 있어요</p>
      </div>

      <ol className="work__list">
        {projects.map((project, index) => {
          const { title, subtitle } = splitName(project.name);
          const award = awards.find((a) => a.projectId === project.id);
          const theme = CARD_THEMES[index % CARD_THEMES.length];
          const tags = (project.technologies || []).slice(0, 4);

          return (
            <li
              key={project.id}
              className={`work-card work-card--${theme}`}
              style={{ '--stack-index': index }}
              onClick={() => onSelect(project)}
            >
              <div className="work-card__body">
                <div className="work-card__meta">
                  <span>
                    {String(index + 1).padStart(2, '0')} / {total}
                  </span>
                  <span>{project.period}</span>
                </div>
                <h3 className={`work-card__title${title.length > 12 ? ' work-card__title--long' : ''}`}>{title}</h3>
                {(subtitle || award) && (
                  <p className="work-card__subtitle">
                    {subtitle}
                    {award && <span className="work-card__award">{stripEmoji(award.label)}</span>}
                  </p>
                )}
                <p className="work-card__overview">{project.overview}</p>
                <div className="work-card__footer">
                  <ul className="work-card__tags" aria-label="사용 기술">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="work-card__cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(project);
                    }}
                  >
                    자세히 보기 <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
              <div className="work-card__media">
                <ProjectMedia url={project.thumbnailUrl} title={title} />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default WorkStack;
