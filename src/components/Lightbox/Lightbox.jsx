import React from 'react';
import './Lightbox.css';

function Lightbox({ media, onClose }) {
  if (!media) {
    return null;
  }

  const isVideo = media.endsWith('.mp4');

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close-button" onClick={onClose}>&times;</button>
        {isVideo ? (
          <video src={media} controls autoPlay muted loop playsInline />
        ) : (
          <img src={media} alt="Fullscreen media" />
        )}
      </div>
    </div>
  );
}

export default Lightbox;
