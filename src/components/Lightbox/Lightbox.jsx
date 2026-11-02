import { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { isVideo } from '../../utils/project';
import './Lightbox.css';

function Lightbox({ media, alt = '', onClose }) {
  const closeRef = useRef(null);
  const { t } = useLanguage();

  // 열려 있는 동안 뒤 페이지 스크롤을 막고, 닫으면 원래 포커스로 돌아간다
  useEffect(() => {
    if (!media) return undefined;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [media, onClose]);

  if (!media) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt || t.lightbox.label} onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label={t.lightbox.close} ref={closeRef}>
        ✕
      </button>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        {isVideo(media) ? (
          <video src={media} controls autoPlay muted playsInline />
        ) : (
          <img src={media} alt={alt} />
        )}
      </div>
    </div>
  );
}

export default Lightbox;
