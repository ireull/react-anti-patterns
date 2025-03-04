export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    joinedAt: string;
  }
  
  export interface Project {
    id: number;
    name: string;
    description: string;
    status: 'planning' | 'in-progress' | 'completed';
    deadline: string;
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string;
    assignee: number | null;
    projectId: number | null;
    status: 'todo' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    createdAt: string;
  }
  
  export type TaskFormData = {
    title: string;
    description: string;
    assignee: string;
    projectId: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'completed';
  }
  
  export type UserFormData = {
    title: string; // используется как имя
    description: string; // используется как email
    role?: string;
  }
  
  export type ProjectFormData = {
    title: string; // используется как название
    description: string;
    dueDate: string; // используется как deadline
  }
  
  export type FormData = TaskFormData & UserFormData & ProjectFormData;
  
  export type ActiveTab = 'tasks' | 'users' | 'projects';
  export type SortOption = 'date' | 'priority' | 'title';
  export type FilterStatus = 'all' | 'todo' | 'in-progress' | 'completed' | 'planning';