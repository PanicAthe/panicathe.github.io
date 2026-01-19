import React, { useRef } from 'react';
import './Row.css';

function Row({ title, items = [], onItemClick, rowType = 'default', projects = [] }) {
  if (!items || items.length === 0) {
    return null;
  }

  const postersRef = useRef(null);
  const isClickable = !!onItemClick;

  // 스택별 숙련도 계산 (프로젝트에서 사용된 횟수)
  const getStackProficiency = (stackId, stackName) => {
    if (!projects || projects.length === 0) return 0;
    let count = 0;
    projects.forEach(project => {
      if (project.technologies) {
        // 기술 이름 정확 매칭 (대소문자 구분 없이)
        const techLower = project.technologies.map(t => t.toLowerCase());
        const stackNameLower = stackName.toLowerCase();
        
        if (techLower.includes(stackNameLower)) {
          count++;
        }
      }
    });
    return count;
  };

  // 숙련도에 따른 색상 클래스 결정
  const getProficiencyClass = (count) => {
    if (count >= 4) return 'proficiency-high'; // 4개 이상 프로젝트
    if (count >= 3) return 'proficiency-medium'; // 3개 이상 프로젝트
    return 'proficiency-low'; // 0-1개 프로젝트
  };

  // 스택 정렬 (숙련도 높은 순)
  const sortedStacks = rowType === 'stacks' 
    ? [...items].sort((a, b) => {
        const aCount = getStackProficiency(a.id, a.name);
        const bCount = getStackProficiency(b.id, b.name);
        return bCount - aCount;
      })
    : items;

  const scroll = (direction) => {
    if (postersRef.current) {
      const { scrollLeft, clientWidth } = postersRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      postersRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (rowType === 'certifications') {
    return (
      <div className="row row--certifications">
        <h2 className="row__title">{title}</h2>
        <div className="certifications-list">
          {items.map(item => {
            const isItemClickable = item.linkUrl || (isClickable && item.projectId);
            return (
              <div 
                key={item.id} 
                className={`certification-item ${isItemClickable ? 'certification-item--clickable' : ''}`}
                onClick={() => {
                  if (item.linkUrl) {
                    window.open(item.linkUrl, '_blank', 'noopener,noreferrer');
                  } else if (isClickable && onItemClick && item.projectId) {
                    onItemClick(item);
                  }
                }}
              >
                <div className="certification-meta">
                  <div className="certification-name">
                    {item.name}
                    {isItemClickable && (
                      <svg className="certification-link-icon" viewBox="0 0 16 16" width="14" height="14">
                        <path fill="currentColor" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fill="currentColor" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
                    )}
                  </div>
                <div className="certification-tags">
                  {item.label && (
                    <span className="certification-tag">{item.label}</span>
                  )}
                  {item.date && (
                    <span className="certification-tag certification-date">
                      {item.date}
                    </span>
                  )}
                </div>
                {item.project && (
                  <div className="certification-project">
                    프로젝트: {item.project}
                  </div>
                )}
                {item.description && (
                  <div className="certification-description">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`row row--${rowType}`}>
      <h2 className="row__title">{title}</h2>
      <div className="row__scroll-container">
        <button className="row__scroll-button left" onClick={() => scroll('left')}>
          &#8249;
        </button>
        <div className="row__posters" ref={postersRef}>
          {sortedStacks.map(item => {
            const url = item.thumbnailUrl || item.imageUrl;
            const hasMedia = !!url;
            const proficiencyCount = rowType === 'stacks' ? getStackProficiency(item.id, item.name) : 0;
            const proficiencyClass = rowType === 'stacks' ? getProficiencyClass(proficiencyCount) : '';

            return (
              <div 
                key={item.id} 
                className={`row__poster ${isClickable ? 'row__poster--clickable' : ''} ${proficiencyClass}`}
                onClick={() => isClickable && onItemClick(item)}
              >
                {hasMedia ? (
                  url.endsWith('.mp4') ? (
                    <video src={url} autoPlay loop muted playsInline />
                  ) : (
                    <img src={url} alt={item.name} />
                  )
                ) : (
                  <div className="row__poster-placeholder">
                    <h4>{item.name}</h4>
                  </div>
                )}
                {hasMedia && (
                  <div className="row__poster-info">
                    {title !== 'Certifications' && <h3>{item.name}</h3>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button className="row__scroll-button right" onClick={() => scroll('right')}>
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default Row;
