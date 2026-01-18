import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showPortfolioDownload = false;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">Eunjin Choi</div>
        <div className="header__right">
          <nav className="header__nav">
            <a href="#projects">Projects</a>
            <a href="#awards">Awards</a>
            <a href="#certifications">Certifications</a>
            <a href="#skills">Skills</a>
          </nav>
          <button 
            className="header__mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {isMenuOpen && (
            <nav className="header__mobile-nav">
              <a href="#projects" onClick={handleNavClick}>Projects</a>
              <a href="#awards" onClick={handleNavClick}>Awards</a>
              <a href="#certifications" onClick={handleNavClick}>Certifications</a>
              <a href="#skills" onClick={handleNavClick}>Skills</a>
            </nav>
          )}
          {showPortfolioDownload && (
            <button
              type="button"
              className="header__download-btn header__download-btn--disabled"
              disabled
              title="포트폴리오 PDF는 업데이트 중입니다."
            >
              포트폴리오 다운로드
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
