import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggleButton.css';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={`theme-toggle-button ${theme}`}>
      <div className="theme-toggle-button__icon"></div>
    </button>
  );
}

export default ThemeToggleButton;
