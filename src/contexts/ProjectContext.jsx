import React, { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);
  const [isLanyardModalOpen, setIsLanyardModalOpen] = useState(false);

  const selectProject = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const clearSelectedStack = () => {
    setSelectedStack(null);
  };

  const selectStack = (stack) => {
    setSelectedStack(prevStack => (prevStack === stack.name ? null : stack.name));
  };

  // Helper to open project modal from stack modal
  const selectProjectFromStackModal = (project) => {
    clearSelectedStack();
    selectProject(project);
  };

  const openLanyardModal = () => {
    setIsLanyardModalOpen(true);
  };

  const closeLanyardModal = () => {
    setIsLanyardModalOpen(false);
  };

  const value = {
    projects,
    selectedProject,
    selectedStack,
    isLanyardModalOpen,
    selectProject,
    closeProjectModal,
    selectStack,
    clearSelectedStack,
    selectProjectFromStackModal,
    openLanyardModal,
    closeLanyardModal,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
