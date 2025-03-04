import { useMemo } from 'react';
import { FilterStatus, Project } from '../types';

interface UseProjectsProps {
  projects: Project[];
  searchTerm: string;
  filterStatus?: FilterStatus;
}

export const useProjects = ({ projects, searchTerm, filterStatus }: UseProjectsProps) => {
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesFilter = !filterStatus || filterStatus === 'all' || project.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, filterStatus]);
  
  return { filteredProjects };
};