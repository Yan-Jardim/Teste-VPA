import { Project } from '@/utils/ProjectInterface';

export const LocalStorageService = {
  getProjects: (): Project[] => {
    try {
      const stored = localStorage.getItem('projects');
      console.log('Valor bruto do localStorage em getProjects:', stored);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao obter projetos do localStorage:', error);
      return [];
    }
  },

  saveProjects: (projects: Project[]): void => {
    try {
      console.log('Salvando projetos no localStorage:', projects);
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Erro ao salvar projetos no localStorage:', error);
    }
  },
};
