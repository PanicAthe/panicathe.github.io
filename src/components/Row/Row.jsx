import React, { useRef } from 'react';
import './Row.css';

function Row({ title, items = [], onItemClick, rowType = 'default' }) {
  if (!items || items.length === 0) {
    return null;
  }

  const postersRef = useRef(null);
  const isClickable = !!onItemClick;

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
          {items.map(item => (
            <div key={item.id} className="certification-item">
              <img src={item.imageUrl} alt={item.name} />
              <span className="certification-date">{item.date}</span>
            </div>
          ))}
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
          {items.map(item => {
            const url = item.thumbnailUrl || item.imageUrl;
            const hasMedia = !!url;

            return (
              <div 
                key={item.id} 
                className={`row__poster ${isClickable ? 'row__poster--clickable' : ''}`}
                onClick={() => isClickable && onItemClick(item)}
              >
                {hasMedia ? (
                  url.includes('youtube.com/embed') ? (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`${url.split('?')[0]}?autoplay=1&mute=1&loop=1&controls=0&playlist=${url.split('/').pop()}`}
                      title={item.name}
                      frameBorder="0"
                      allow="autoplay; encrypted-media;"
                    ></iframe>
                  ) : url.endsWith('.mp4') ? (
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
