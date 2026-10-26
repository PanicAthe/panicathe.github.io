import { useEffect, useRef, useState } from 'react';
import './Footer.css';

const EMAIL = 'panicatheworks@gmail.com';

function Footer() {
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
      <p className="footer__eyebrow">[ 다음 프로젝트를 함께할 분 ]</p>
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
          {copied ? '복사했어요' : '이메일 복사'}
        </button>
        <a
          href="https://github.com/PanicAthe"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__btn"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {copied ? '이메일 주소를 클립보드에 복사했습니다.' : ''}
      </p>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} EUNJIN CHOI</span>
        <span>React · Vite · Three.js</span>
      </div>
    </footer>
  );
}

export default Footer;
