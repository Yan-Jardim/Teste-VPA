import { Project } from '@/utils/ProjectInterface';

const LOCAL_STORAGE_KEY = 'projects';

export const LocalStorageService = {
  getProjects: (): Project[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log('Valor bruto do localStorage em getProjects:', stored);
      const projects: unknown = stored ? JSON.parse(stored) : [];

      if (
        Array.isArray(projects) &&
        projects.every((p) => 'id' in p && 'name' in p && 'date' in p)
      ) {
        return projects as Project[];
      }

      console.warn('Dados no localStorage estão fora do formato esperado.');
      return [];
    } catch (error) {
      console.error('Erro ao obter projetos do localStorage:', error);
      return [];
    }
  },

  saveProjects: (projects: Project[]): void => {
    if (typeof window === 'undefined') return;
    try {
      console.log('Salvando projetos no localStorage:', projects);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Erro ao salvar projetos no localStorage:', error);
    }
  },
};
