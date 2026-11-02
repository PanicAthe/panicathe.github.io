import { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => useContext(ProjectContext);

// 선택한 프로젝트는 id로 기억해, 언어가 바뀌어도 같은 프로젝트의 번역본을 보여준다
export const ProjectProvider = ({ children, projects }) => {
  const [selectedId, setSelectedId] = useState(null);

  const value = {
    projects,
    selectedProject: projects.find((project) => project.id === selectedId) ?? null,
    selectProject: (project) => setSelectedId(project?.id ?? null),
    closeProjectModal: () => setSelectedId(null),
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
