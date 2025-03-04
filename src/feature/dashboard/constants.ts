// src/features/dashboard/constants.ts
import { User, Project, Task } from './types';

// Моковые данные
export const MOCK_USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', joinedAt: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', joinedAt: '2023-02-10' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Product Manager', joinedAt: '2022-11-05' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'QA Engineer', joinedAt: '2023-03-22' },
  { id: 5, name: 'David Brown', email: 'david@example.com', role: 'DevOps', joinedAt: '2022-12-18' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 1, name: 'Website Redesign', description: 'Overhaul of company website with new branding', status: 'in-progress', deadline: '2023-12-31' },
  { id: 2, name: 'Mobile App', description: 'New mobile application for customer engagement', status: 'planning', deadline: '2024-03-15' },
  { id: 3, name: 'Data Analytics Dashboard', description: 'Internal dashboard for business metrics', status: 'completed', deadline: '2023-10-10' },
  { id: 4, name: 'E-commerce Platform', description: 'Online store with payment processing', status: 'in-progress', deadline: '2024-01-20' },
];

export const MOCK_TASKS: Task[] = [
  { id: 1, title: 'Design Homepage', description: 'Create wireframes for homepage', assignee: 2, projectId: 1, status: 'completed', priority: 'high', dueDate: '2023-11-15', createdAt: '2023-10-01' },
  { id: 2, title: 'Implement Authentication', description: 'Set up user login and registration', assignee: 1, projectId: 1, status: 'in-progress', priority: 'high', dueDate: '2023-11-30', createdAt: '2023-10-05' },
  { id: 3, title: 'Database Schema Design', description: 'Design database structure for the app', assignee: 1, projectId: 2, status: 'completed', priority: 'medium', dueDate: '2023-11-10', createdAt: '2023-10-02' },
  { id: 4, title: 'API Endpoints', description: 'Define and document API endpoints', assignee: 3, projectId: 2, status: 'todo', priority: 'medium', dueDate: '2023-12-15', createdAt: '2023-10-12' },
  { id: 5, title: 'Data Visualization', description: 'Implement charts and graphs for dashboard', assignee: 1, projectId: 3, status: 'completed', priority: 'high', dueDate: '2023-10-05', createdAt: '2023-09-15' },
  { id: 6, title: 'User Testing', description: 'Conduct user testing sessions', assignee: 4, projectId: 1, status: 'todo', priority: 'medium', dueDate: '2023-12-10', createdAt: '2023-10-18' },
  { id: 7, title: 'Payment Integration', description: 'Integrate payment gateway', assignee: 1, projectId: 4, status: 'in-progress', priority: 'high', dueDate: '2023-12-20', createdAt: '2023-10-25' },
  { id: 8, title: 'Deployment Setup', description: 'Configure CI/CD pipeline', assignee: 5, projectId: 2, status: 'todo', priority: 'low', dueDate: '2024-01-05', createdAt: '2023-10-30' },
];

// src/features/dashboard/utils/statusHelpers.ts
export const getStatusColor = (status: string): string => {
  switch(status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'todo': return 'bg-gray-100 text-gray-800';
    case 'planning': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch(priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// src/features/dashboard/utils/formatters.ts
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};