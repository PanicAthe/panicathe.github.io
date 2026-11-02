import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import WorkStack from './components/WorkStack/WorkStack';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import ProjectModal from './components/ProjectModal/ProjectModal';
import { ProjectProvider, useProjects } from './contexts/ProjectContext';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { awards, certifications, education, marqueeSkills, projects } from './data/portfolio';

function PortfolioContent() {
  const { selectedProject, closeProjectModal, selectProject } = useProjects();

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

function App() {
  return (
    <ProjectProvider projects={projects}>
      <Routes>
        <Route path="/" element={<PortfolioContent />} />
        <Route path="/project/:projectId" element={<ProjectDetailPage projects={projects} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProjectProvider>
  );
}

export default App;
