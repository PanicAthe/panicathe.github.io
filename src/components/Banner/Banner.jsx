import React from 'react';
import './Banner.css';
import SplitText from '../SplitText/SplitText';
import Silk from '../Silk/Silk';
import { useProjects } from '../../contexts/ProjectContext';
import { useTheme } from '../../contexts/ThemeContext';

function Banner() {
  const { openContactModal } = useProjects();
  const { theme } = useTheme();

  const silkColor = theme === 'light' ? '#89CFF0' : '#dc4444ff';

  return (
    <div className="banner">
      <div className="banner-background">
        <Silk color={silkColor} />
      </div>
      <div className="banner__contents">
        <SplitText 
          tag="h2" 
          className="banner__title" 
          text="안녕하세요, 최은진입니다." 
          textAlign="left"
        />
        <SplitText 
          tag="h3" 
          className="banner__subtitle" 
          text="백엔드 개발을 중심으로, 클라우드·AI·모바일 기술을 연결해 하나의 서비스로 완성하는 개발자입니다. 기술을 넘어, 문제 해결과 사용자 경험 향상에 집중합니다."
          textAlign="left"
          delay={10}
        />
        <div className="banner__buttons">
          <button className="btn-primary" onClick={openContactModal}>
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.511l7.443 4.652a1 1 0 001.114 0L20 6.511V6H4zm16 12V8.388l-8 5-8-5V18h16z" fill="currentColor"></path>
            </svg>
            <span>연락하기</span>
          </button>
          <a href="https://github.com/PanicAthe" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <svg viewBox="0 0 16 16" className="icon">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </div>
  );
}

export default Banner;
