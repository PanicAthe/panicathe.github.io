import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectModal.css';

function ProjectModal({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  if (!project) {
    return null;
  }

  const displayMedia = [
    project.thumbnailUrl,
    ...(project.galleryImageUrls || []),
    ...(project.galleryVideoUrls || [])
  ].filter((url, index, self) => url && self.indexOf(url) === index);

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? displayMedia.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLast = currentIndex === displayMedia.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleNavigate = () => {
    navigate(`/project/${project.id}`);
  };

  const renderMedia = (url) => {
    if (!url) return null;
    const isVideo = url.endsWith('.mp4');
    if (isVideo) {
      return <video className="modal-media" src={url} controls autoPlay muted loop />;
    }
    return <img className="modal-media" src={url} alt={`${project.name} - media`} />;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <svg viewBox="0 0 24 24" className="icon">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z" fill="currentColor"></path>
          </svg>
        </button>
        
        <div className="modal-image-gallery">
          {displayMedia.length > 1 && (
            <button className="gallery-nav-button prev" onClick={goToPrevious}>&#10094;</button>
          )}
          
          {renderMedia(displayMedia[currentIndex])}
          
          <button className="btn-primary modal-play-button" onClick={handleNavigate} title="Go to Project Page">
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path>
            </svg>
            <span>상세 보기</span>
          </button>

          {displayMedia.length > 1 && (
            <button className="gallery-nav-button next" onClick={goToNext}>&#10095;</button>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">{project.name}</h2>
            <p className="modal-period">{project.period}</p>
          </div>
          <p className="modal-overview">{project.overview}</p>
          
          <div className="modal-section">
            <h3>나의 역할 및 기여</h3>
            <ul>
              {project.role.map((r, index) => <li key={index}>{r}</li>)}
            </ul>
          </div>

          <div className="modal-section">
            <h3>성과 및 학습</h3>
            <ul>
              {project.learnings.map((l, index) => <li key={index}>{l}</li>)}
            </ul>
          </div>

          <div className="modal-section">
            <h3>기술 스택</h3>
            <div className="modal-tech-list">
              {project.technologies.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}
            </div>
          </div>

          {project.githubUrls && (
            <div className="modal-section">
              <h3>Repositories</h3>
              <div className="modal-repo-list">
                              {project.githubUrls.organization && (
                                <a href={project.githubUrls.organization} target="_blank" rel="noopener noreferrer" className="repo-link">
                                  <span>GitHub Organization</span>
                                </a>
                              )}
                              {project.githubUrls.backend && (
                                <a href={project.githubUrls.backend} target="_blank" rel="noopener noreferrer" className="repo-link">
                                  <span>Backend Repository</span>
                                </a>
                              )}
                              {project.githubUrls.frontend && (
                                <a href={project.githubUrls.frontend} target="_blank" rel="noopener noreferrer" className="repo-link">
                                  <span>Frontend Repository</span>
                                </a>
                              )}
                              {project.githubUrls.aiApi && (
                                <a href={project.githubUrls.aiApi} target="_blank" rel="noopener noreferrer" className="repo-link">
                                  <span>AI API Repository</span>
                                </a>
                              )}              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProjectModal;