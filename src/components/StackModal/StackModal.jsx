import React, { useEffect } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import './StackModal.css';

function StackModal() {
  const { projects, selectedStack, clearSelectedStack, selectProjectFromStackModal } = useProjects();

  useEffect(() => {
    if (selectedStack) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStack]);

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
    <div className="stack-modal-overlay" onClick={clearSelectedStack}>
      <div className="stack-modal-content" onClick={e => e.stopPropagation()}>
        <button className="stack-modal-close" onClick={clearSelectedStack}>
          ×
        </button>
        <h2 className="stack-modal-title" style={{ margin: '20px' }}>Projects using: {selectedStack}</h2>
        <div className="stack-modal-body">
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
    </div>
  );
}

export default StackModal;