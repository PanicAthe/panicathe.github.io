import React from 'react';
import './Header.css';

function Header() {

  return (
    <header className="header">
      <div className="header__logo">Portfolio</div>
      <div className="header__right">
                  <nav className="header__nav">
                    <a href="/src/assets/portfolio/Portfolio.pdf" download className="header__download-btn">
                      포트폴리오 다운로드
                    </a>
                  </nav>
      </div>
    </header>
  );
}

export default Header;