import { useMemo } from 'react';
import { Task, SortOption, FilterStatus } from '../types';

interface UseTasksProps {
  tasks: Task[];
  searchTerm: string;
  filterStatus: FilterStatus;
  sortBy: SortOption;
}

export const useTasks = ({ tasks, searchTerm, filterStatus, sortBy }: UseTasksProps) => {
  // Фильтрация задач
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filterStatus]);
  
  // Сортировка задач
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'priority') {
        const priorityValues: { [key: string]: number } = { low: 1, medium: 2, high: 3 };
        return priorityValues[b.priority] - priorityValues[a.priority];
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [filteredTasks, sortBy]);
  
  return { filteredTasks, sortedTasks };
};
