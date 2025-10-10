import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetailPage.css';
import Lightbox from '../components/Lightbox/Lightbox';

function ProjectDetailPage({ projects }) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === parseInt(projectId));

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Set initial selected media once project is loaded
  React.useEffect(() => {
    if (project) {
      const displayMedia = [
        project.thumbnailUrl,
        ...(project.galleryImageUrls || []),
        ...(project.galleryVideoUrls || [])
      ].filter((url, index, self) => url && self.indexOf(url) === index);
      setSelectedMedia(displayMedia[0]);
    }
  }, [project]);

  if (!project) {
    return <div>Project not found.</div>;
  }

  const displayMedia = [
    project.thumbnailUrl,
    ...(project.galleryImageUrls || []),
    ...(project.galleryVideoUrls || [])
  ].filter((url, index, self) => url && self.indexOf(url) === index);

  const openLightbox = (media) => {
    if (!media) return;
    setSelectedMedia(media);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const renderMedia = (url, isThumbnail = false) => {
    if (!url) return null;

    const className = isThumbnail ? 'thumbnail-media' : 'main-media';

    if (url.endsWith('.mp4')) {
      return <video src={url} className={className} controls={!isThumbnail} autoPlay={!isThumbnail} muted loop playsInline />;
    }

    return <img src={url} className={className} alt={project.name} />;
  };

  return (
    <div className="project-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      
      <header className="project-detail-header">
        <h1>{project.name}</h1>
        <p className="project-period">{project.period}</p>
      </header>

      <section className="project-detail-gallery">
        <div className="gallery-main-image">
          {renderMedia(selectedMedia)}
          <button className="fullscreen-button" onClick={() => openLightbox(selectedMedia)} title="View Fullscreen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="icon">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 2h-2v3h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
            </svg>
          </button>
        </div>
        {displayMedia.length > 1 && (
          <div className="gallery-thumbnails">
            {displayMedia.map((media, index) => (
              <div 
                key={index} 
                className={`thumbnail-item ${media === selectedMedia ? 'active' : ''}`}
                onClick={() => setSelectedMedia(media)} // This just changes the main view
              >
                {renderMedia(media, true)} 
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="project-detail-body"> 
        {/* ... rest of the body ... */}
        <div className="project-detail-section">
          <h2>개요</h2>
          <p>{project.overview}</p>
        </div>

        <div className="project-detail-section">
          <h2>나의 역할 및 기여</h2>
          <ul>
            {project.role.map((r, index) => <li key={index}>{r}</li>)}
          </ul>
        </div>

        <div className="project-detail-section">
          <h2>성과 및 학습</h2>
          <ul>
            {project.learnings.map((l, index) => <li key={index}>{l}</li>)}
          </ul>
        </div>

        <div className="project-detail-section">
          <h2>기술 스택</h2>
          <div className="tech-list">
            {project.technologies.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}
          </div>
        </div>

        {project.githubUrls && (
          <div className="project-detail-section">
            <h2>Repositories</h2>
            <div className="repo-list">
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
              )}
            </div>
          </div>
        )}
      </section>

      {isLightboxOpen && (
        <Lightbox media={selectedMedia} onClose={closeLightbox} />
      )}
    </div>
  );
}

export default ProjectDetailPage;
