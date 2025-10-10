import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import './StackModal.css';

function StackModal() {
  const { projects, selectedStack, clearSelectedStack, selectProjectFromStackModal } = useProjects();

  if (!selectedStack) {
    return null;
  }

  const relevantProjects = projects.filter(p => p.technologies.includes(selectedStack));

  const renderThumbnail = (project) => {
    const url = project.thumbnailUrl;
    if (!url) {
      return (
        <div className="stack-modal-project-placeholder">
          <h4>{project.name}</h4>
        </div>
      );
    }
    if (url.endsWith('.mp4')) {
      return <video src={url} autoPlay loop muted playsInline />;
    }
    return <img src={url} alt={project.name} />;
  };

  return (
    <div className="modal-overlay" onClick={clearSelectedStack}>
      <div className="modal-content stack-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={clearSelectedStack}>
          <svg viewBox="0 0 24 24" className="icon">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z" fill="currentColor"></path>
          </svg>
        </button>
        <h2 className="stack-modal-title">Projects using: {selectedStack}</h2>
        <div className="stack-modal-projects-grid">
          {relevantProjects.length > 0 ? (
            relevantProjects.map(project => (
              <div 
                key={project.id} 
                className="stack-modal-project-item"
                onClick={() => selectProjectFromStackModal(project)}
              >
                {renderThumbnail(project)}
                <h3>{project.name}</h3>
              </div>
            ))
          ) : (
            <p>No projects found using this technology.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StackModal;