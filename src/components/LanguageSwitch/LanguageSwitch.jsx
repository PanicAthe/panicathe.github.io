import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSwitch.css';

// 지금 화면의 다른 언어 주소로 이동한다 (메인 ↔ /en, 상세 ↔ /en/project/:id)
function LanguageSwitch({ className = '' }) {
  const { lang, otherLang, otherLangPath, t } = useLanguage();

  return (
    <Link
      to={otherLangPath}
      className={`lang-switch ${className}`.trim()}
      hrefLang={otherLang}
      aria-label={t.header.switchLanguage}
    >
      <span className={lang === 'ko' ? 'is-active' : ''}>KO</span>
      <span aria-hidden="true">/</span>
      <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
    </Link>
  );
}

export default LanguageSwitch;
