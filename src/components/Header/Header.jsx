import React from 'react';
import './Header.css';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import { useTheme } from '../../contexts/ThemeContext';

function Header() {
  const { theme } = useTheme();

  return (
    <header className="header">
      <div className="header__logo">Portfolio</div>
      <div className="header__right">
                  <nav className="header__nav">
                    <a href="/src/assets/portfolio/Portfolio.pdf" download className="header__download-btn">
                      포트폴리오 다운로드
                    </a>
                  </nav>        <div className="theme-toggle-container">
          <span className="theme-toggle-label">
            {theme === 'light' ? '다크 모드' : '라이트 모드'}
          </span>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}

export default Header;