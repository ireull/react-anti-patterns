// src/features/dashboard/context/DashboardContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  User,
  Project,
  Task,
  FormData,
  ActiveTab,
  SortOption,
  FilterStatus,
} from "../types";
import { MOCK_USERS, MOCK_PROJECTS, MOCK_TASKS } from "../constants";

interface DashboardContextType {
  // Данные
  users: User[];
  projects: Project[];
  tasks: Task[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

  // Выбранные элементы
  selectedUser: User | null;
  selectedTask: Task | null;
  selectedProject: Project | null;
  setSelectedUser: (user: User | null) => void;
  setSelectedTask: (task: Task | null) => void;
  setSelectedProject: (project: Project | null) => void;

  // Состояние UI
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Фильтрация и сортировка
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;

  // Модальное окно и формы
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;

  // Действия
  createTask: (data: FormData) => void;
  createUser: (data: FormData) => void;
  createProject: (data: FormData) => void;
  deleteTask: (taskId: number) => void;
  updateTaskStatus: (taskId: number, status: Task["status"]) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Основные данные
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  // Выбранные элементы
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Состояние UI
  const [activeTab, setActiveTab] = useState<ActiveTab>("tasks");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Фильтрация и сортировка
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Модальное окно и формы
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    assignee: "",
    projectId: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
  });

  // Действия
  const createTask = (data: FormData) => {
    setIsLoading(true);

    // Имитация задержки
    setTimeout(() => {
      const newTask: Task = {
        id: tasks.length + 1,
        title: data.title,
        description: data.description,
        assignee: data.assignee ? parseInt(data.assignee) : null,
        projectId: data.projectId ? parseInt(data.projectId) : null,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        createdAt: new Date().toISOString().split("T")[0],
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setIsLoading(false);
      setIsModalOpen(false);
    }, 500);
  };

  const createUser = (data: FormData) => {
    setIsLoading(true);

    setTimeout(() => {
      const newUser: User = {
        id: users.length + 1,
        name: data.title,
        email: data.description,
        role: data.role || "User",
        joinedAt: new Date().toISOString().split("T")[0],
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
      setIsLoading(false);
      setIsModalOpen(false);
    }, 500);
  };

  const createProject = (data: FormData) => {
    setIsLoading(true);

    setTimeout(() => {
      const newProject: Project = {
        id: projects.length + 1,
        name: data.title,
        description: data.description,
        status: "planning",
        deadline:
          data.dueDate ||
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
      };

      setProjects((prevProjects) => [...prevProjects, newProject]);
      setIsLoading(false);
      setIsModalOpen(false);
    }, 500);
  };

  const deleteTask = (taskId: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setIsLoading(true);

    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(null);
      }

      setIsLoading(false);
    }, 300);
  };

  const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    setIsLoading(true);

    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }

      setIsLoading(false);
    }, 300);
  };

  const value = {
    // Данные
    users,
    projects,
    tasks,
    setUsers,
    setProjects,
    setTasks,

    // Выбранные элементы
    selectedUser,
    selectedTask,
    selectedProject,
    setSelectedUser,
    setSelectedTask,
    setSelectedProject,

    // Состояние UI
    activeTab,
    setActiveTab,
    isLoading,
    setIsLoading,
    error,
    setError,

    // Фильтрация и сортировка
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,

    // Модальное окно и формы
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,

    // Действия
    createTask,
    createUser,
    createProject,
    deleteTask,
    updateTaskStatus,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};
