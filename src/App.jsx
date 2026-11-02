import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import WorkStack from './components/WorkStack/WorkStack';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import ProjectModal from './components/ProjectModal/ProjectModal';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ProjectProvider, useProjects } from './contexts/ProjectContext';
import ProjectDetailPage from './pages/ProjectDetailPage';

function PortfolioContent() {
  const { selectedProject, closeProjectModal, selectProject } = useProjects();
  const { t, content } = useLanguage();
  const { awards, certifications, education, marqueeSkills, projects } = content;

  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <Hero />
        <Marquee items={marqueeSkills} />
        <WorkStack projects={projects} onSelect={selectProject} />
        <About
          awards={awards}
          education={education}
          certifications={certifications}
          projects={projects}
          onSelectProject={selectProject}
        />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
    </div>
  );
}

function LocalizedRoutes() {
  const { content, localePath } = useLanguage();

  // '/en?'는 '/'와 '/en' 둘 다 받는다. 같은 Route라서 언어를 바꿔도 화면(3D 사원증 포함)을 다시 만들지 않는다
  return (
    <ProjectProvider projects={content.projects}>
      <Routes>
        <Route path="/en?" element={<PortfolioContent />} />
        <Route path="/en?/project/:projectId" element={<ProjectDetailPage projects={content.projects} />} />
        <Route path="*" element={<Navigate to={localePath('/')} replace />} />
      </Routes>
    </ProjectProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <LocalizedRoutes />
    </LanguageProvider>
  );
}

export default App;
