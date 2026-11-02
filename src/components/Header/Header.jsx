import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import './Header.css';

function Header() {
  const { t, content } = useLanguage();

  return (
    <header className="header">
      <a href="#top" className="header__logo" aria-label={t.header.logoLabel}>
        EJ/CHOI
      </a>
      <nav className="header__nav" aria-label={t.header.nav}>
        <a href="#work" className="header__link">WORK</a>
        <a href="#about" className="header__link">ABOUT</a>
        <a
          href={content.profile.githubUrl}
          className="header__link header__link--github"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>
        <LanguageSwitch />
        <a href="#contact" className="header__cta">CONTACT</a>
      </nav>
    </header>
  );
}

export default Header;
