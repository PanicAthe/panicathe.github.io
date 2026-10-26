import './Header.css';

function Header() {
  return (
    <header className="header">
      <a href="#top" className="header__logo" aria-label="최은진 포트폴리오 맨 위로">
        EJ/CHOI
      </a>
      <nav className="header__nav" aria-label="주요 메뉴">
        <a href="#work" className="header__link">WORK</a>
        <a
          href="https://github.com/PanicAthe"
          className="header__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>
        <a href="#contact" className="header__cta">CONTACT</a>
      </nav>
    </header>
  );
}

export default Header;
