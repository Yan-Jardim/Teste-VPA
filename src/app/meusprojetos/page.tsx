'use client';

import SideMenu from '@/components/pages/Menu';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectDetailsGrid from '@/components/pages/ProjectDetailsGrid';

interface Session {
  name: string;
  tasks: string[];
}

interface Project {
  id: number;
  name: string;
  date: string;
  session?: Session[];
}

const MeusProjetos: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      const idAsNumber = parseInt(projectId, 10);
      const projects: Project[] = JSON.parse(
        localStorage.getItem('projects') || '[]'
      );
      const selectedProject = projects.find(
        (p: Project) => p.id === idAsNumber
      );

      if (selectedProject) {
        selectedProject.session = selectedProject.session?.map((session) =>
          typeof session === 'string' ? { name: session, tasks: [] } : session
        );
        setSelectedProject(selectedProject);
      }
    }
  }, [projectId]);

  const handleUpdateProject = (updatedProject: Project) => {
    setSelectedProject(updatedProject);

    const projects: Project[] = JSON.parse(
      localStorage.getItem('projects') || '[]'
    );
    const updatedProjects = projects.map((p: Project) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-1 ml-64 p-4">
        <div className="flex items-center justify-center">
          <ProjectDetailsGrid
            project={selectedProject}
            onUpdateProject={handleUpdateProject}
          />
        </div>
      </div>
    </div>
  );
};

export default MeusProjetos;
