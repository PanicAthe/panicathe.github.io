import { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const selectProject = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const value = {
    projects,
    selectedProject,
    selectProject,
    closeProjectModal,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
