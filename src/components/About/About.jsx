import './About.css';

function stripEmoji(text = '') {
  return text.replace(/[^\p{L}\p{N}\s·().,]/gu, '').trim();
}

function AboutRow({ date, title, meta, href, onClick, highlight }) {
  const content = (
    <>
      <span className={`about-row__date${highlight ? ' about-row__date--accent' : ''}`}>{date}</span>
      <span className="about-row__title">
        {title}
        {(href || onClick) && (
          <span className="about-row__arrow" aria-hidden="true">
            ↗
          </span>
        )}
      </span>
      {meta && <span className="about-row__meta">{meta}</span>}
    </>
  );

  if (href) {
    return (
      <li>
        <a className="about-row about-row--link" href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </li>
    );
  }

  if (onClick) {
    return (
      <li>
        <button type="button" className="about-row about-row--link" onClick={onClick}>
          {content}
        </button>
      </li>
    );
  }

  return (
    <li>
      <div className="about-row">{content}</div>
    </li>
  );
}

function About({ awards = [], education = [], certifications = [], projects = [], onSelectProject }) {
  return (
    <section id="about" className="about">
      <h2 className="about__title">
        ABOUT<span className="about__dot">.</span>
      </h2>

      <div className="about__grid">
        <div className="about__col">
          <h3 className="about__label">AWARDS</h3>
          <ul className="about__list">
            {awards.map((award, index) => {
              const project = projects.find((p) => p.id === award.projectId);
              return (
                <AboutRow
                  key={award.id}
                  date={award.date}
                  highlight={index === 0}
                  title={`${award.name} ${stripEmoji(award.label)}`}
                  meta={award.project}
                  onClick={project && onSelectProject ? () => onSelectProject(project) : undefined}
                />
              );
            })}
          </ul>
        </div>

        <div className="about__col">
          <h3 className="about__label">EDUCATION</h3>
          <ul className="about__list">
            {education.map((item, index) => (
              <AboutRow
                key={item.id}
                date={item.date}
                highlight={index === 0}
                title={item.name}
                meta={item.label}
                href={item.linkUrl}
              />
            ))}
          </ul>
        </div>

        <div className="about__col">
          <h3 className="about__label">CERTIFIED</h3>
          <ul className="about__list">
            {certifications.map((cert) => (
              <AboutRow
                key={cert.id}
                date={cert.date}
                title={cert.name}
                meta={cert.label}
                href={cert.linkUrl}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
