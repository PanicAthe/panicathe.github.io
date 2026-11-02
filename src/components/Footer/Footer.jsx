import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

function Footer() {
  const { t, content } = useLanguage();
  const { profile } = content;
  const EMAIL = profile.email;
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer id="contact" className="footer">
      <p className="footer__eyebrow">{t.footer.eyebrow}</p>
      <h2 className="footer__title">
        LET’S
        <br />
        <span className="footer__title-outline">TALK</span>
      </h2>

      <div className="footer__actions">
        <a href={`mailto:${EMAIL}`} className="footer__btn footer__btn--primary">
          {EMAIL} <span aria-hidden="true">↗</span>
        </a>
        <button type="button" className="footer__btn" onClick={handleCopy}>
          {copied ? t.footer.copied : t.footer.copy}
        </button>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__btn"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {copied ? t.footer.copiedLive : ''}
      </p>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} EUNJIN CHOI</span>
        <span>React · Vite · Three.js</span>
      </div>
    </footer>
  );
}

export default Footer;
