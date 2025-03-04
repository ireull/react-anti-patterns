import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

// TypeScript интерфейсы для основных сущностей
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "completed";
  deadline: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: number | null;
  projectId: number | null;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
}

// Интерфейс для данных формы
interface FormData {
  title: string;
  description: string;
  assignee: string;
  projectId: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  role?: string;
}

// Тип для активной вкладки
type ActiveTab = "tasks" | "users" | "projects";

// Тип для сортировки
type SortOption = "date" | "priority" | "title";

// Моковые данные
const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    joinedAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
    joinedAt: "2023-02-10",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Product Manager",
    joinedAt: "2022-11-05",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "QA Engineer",
    joinedAt: "2023-03-22",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "DevOps",
    joinedAt: "2022-12-18",
  },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Overhaul of company website with new branding",
    status: "in-progress",
    deadline: "2023-12-31",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "New mobile application for customer engagement",
    status: "planning",
    deadline: "2024-03-15",
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    description: "Internal dashboard for business metrics",
    status: "completed",
    deadline: "2023-10-10",
  },
  {
    id: 4,
    name: "E-commerce Platform",
    description: "Online store with payment processing",
    status: "in-progress",
    deadline: "2024-01-20",
  },
];

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "Design Homepage",
    description: "Create wireframes for homepage",
    assignee: 2,
    projectId: 1,
    status: "completed",
    priority: "high",
    dueDate: "2023-11-15",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    title: "Implement Authentication",
    description: "Set up user login and registration",
    assignee: 1,
    projectId: 1,
    status: "in-progress",
    priority: "high",
    dueDate: "2023-11-30",
    createdAt: "2023-10-05",
  },
  {
    id: 3,
    title: "Database Schema Design",
    description: "Design database structure for the app",
    assignee: 1,
    projectId: 2,
    status: "completed",
    priority: "medium",
    dueDate: "2023-11-10",
    createdAt: "2023-10-02",
  },
  {
    id: 4,
    title: "API Endpoints",
    description: "Define and document API endpoints",
    assignee: 3,
    projectId: 2,
    status: "todo",
    priority: "medium",
    dueDate: "2023-12-15",
    createdAt: "2023-10-12",
  },
  {
    id: 5,
    title: "Data Visualization",
    description: "Implement charts and graphs for dashboard",
    assignee: 1,
    projectId: 3,
    status: "completed",
    priority: "high",
    dueDate: "2023-10-05",
    createdAt: "2023-09-15",
  },
  {
    id: 6,
    title: "User Testing",
    description: "Conduct user testing sessions",
    assignee: 4,
    projectId: 1,
    status: "todo",
    priority: "medium",
    dueDate: "2023-12-10",
    createdAt: "2023-10-18",
  },
  {
    id: 7,
    title: "Payment Integration",
    description: "Integrate payment gateway",
    assignee: 1,
    projectId: 4,
    status: "in-progress",
    priority: "high",
    dueDate: "2023-12-20",
    createdAt: "2023-10-25",
  },
  {
    id: 8,
    title: "Deployment Setup",
    description: "Configure CI/CD pipeline",
    assignee: 5,
    projectId: 2,
    status: "todo",
    priority: "low",
    dueDate: "2024-01-05",
    createdAt: "2023-10-30",
  },
];

// God Component - делает слишком много и знает обо всём
const Dashboard: React.FC = () => {
  // Множество состояний для разных целей
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [activeTab, setActiveTab] = useState<ActiveTab>("tasks");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    projectId: "",
    priority: "medium",
    status: "todo",
  });

  // Имитация загрузки данных
  useEffect(() => {
    // Имитируем задержку загрузки данных с сервера
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Фильтрация данных в зависимости от поиска и фильтров
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Сортировка данных
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "priority") {
      const priorityValues: { [key: string]: number } = {
        low: 1,
        medium: 2,
        high: 3,
      };
      return priorityValues[b.priority] - priorityValues[a.priority];
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Обработчики событий для разных действий
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    // Сбрасываем выбранные элементы при переключении вкладок
    setSelectedTask(null);
    setSelectedUser(null);
    setSelectedProject(null);
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      projectId: "",
      priority: "medium",
      status: "todo",
    });
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Имитация создания новых элементов
    setTimeout(() => {
      // Создание новой задачи
      if (activeTab === "tasks") {
        const newTask: Task = {
          id: tasks.length + 1,
          title: formData.title,
          description: formData.description,
          assignee: formData.assignee ? parseInt(formData.assignee) : null,
          projectId: formData.projectId ? parseInt(formData.projectId) : null,
          status: formData.status,
          priority: formData.priority,
          dueDate: formData.dueDate,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setTasks([...tasks, newTask]);
      }
      // Создание нового проекта
      else if (activeTab === "projects") {
        const newProject: Project = {
          id: projects.length + 1,
          name: formData.title,
          description: formData.description,
          status: "planning",
          deadline:
            formData.dueDate ||
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
        };
        setProjects([...projects, newProject]);
      }
      // Создание нового пользователя
      else if (activeTab === "users") {
        const newUser: User = {
          id: users.length + 1,
          name: formData.title,
          email: formData.description || "user@example.com",
          role: formData.role || "User",
          joinedAt: new Date().toISOString().split("T")[0],
        };
        setUsers([...users, newUser]);
      }

      handleCloseModal();
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteTask = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setIsLoading(true);

    // Имитация удаления задачи
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== taskId));
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(null);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleUpdateTaskStatus = (
    taskId: number,
    newStatus: Task["status"],
    e?: React.MouseEvent
  ) => {
    e && e.stopPropagation();
    setIsLoading(true);

    // Имитация обновления статуса задачи
    setTimeout(() => {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask({ ...selectedTask, status: newStatus });
      }

      setIsLoading(false);
    }, 300);
  };

  // Получение цвета для статуса
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "todo":
        return "bg-gray-100 text-gray-800";
      case "planning":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Получение цвета для приоритета
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Рендеринг разных разделов интерфейса
  const renderTasksTab = () => (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">
          Tasks ({sortedTasks.length})
        </h3>
        {sortedTasks.length === 0 ? (
          <p className="text-gray-500">No tasks match your filters.</p>
        ) : (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTask && selectedTask.id === task.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleTaskSelect(task)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex gap-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {task.description.substring(0, 60)}
                  {task.description.length > 60 ? "..." : ""}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-xs text-gray-500">
                    <span>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) =>
                        handleUpdateTaskStatus(task.id, "in-progress", e)
                      }
                      className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Start
                    </button>
                    <button
                      onClick={(e) =>
                        handleUpdateTaskStatus(task.id, "completed", e)
                      }
                      className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Complete
                    </button>
                    <button
                      onClick={(e) => handleDeleteTask(task.id, e)}
                      className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTask ? (
        <div className="md:w-1/2 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Task Details</h3>
          <h2 className="text-xl font-bold mb-3">{selectedTask.title}</h2>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-medium">Description:</span>{" "}
              {selectedTask.description}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Assignee:</span>{" "}
              {users.find((user) => user.id === selectedTask.assignee)?.name ||
                "Unassigned"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Project:</span>{" "}
              {projects.find((project) => project.id === selectedTask.projectId)
                ?.name || "No Project"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Due Date:</span>{" "}
              {new Date(selectedTask.dueDate).toLocaleDateString()}
            </p>
            <div className="flex gap-2 items-center">
              <span className="font-medium text-gray-700">Status:</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                  selectedTask.status
                )}`}
              >
                {selectedTask.status}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-medium text-gray-700">Priority:</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                  selectedTask.priority
                )}`}
              >
                {selectedTask.priority}
              </span>
            </div>
            <div className="pt-4 border-t mt-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    handleUpdateTaskStatus(selectedTask.id, "todo")
                  }
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Reset
                </button>
                <button
                  onClick={() =>
                    handleUpdateTaskStatus(selectedTask.id, "in-progress")
                  }
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Start
                </button>
                <button
                  onClick={() =>
                    handleUpdateTaskStatus(selectedTask.id, "completed")
                  }
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Complete
                </button>
                <button
                  onClick={(e: React.MouseEvent) =>
                    handleDeleteTask(selectedTask.id, e)
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-1/2 bg-white rounded-lg shadow p-4 flex items-center justify-center">
          <p className="text-gray-500">Select a task to view details</p>
        </div>
      )}
    </div>
  );

  const renderUsersTab = () => (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">
          Users ({filteredUsers.length})
        </h3>
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500">No users match your search.</p>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedUser && selectedUser.id === user.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleUserSelect(user)}
              >
                <h4 className="font-medium">{user.name}</h4>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-800">
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser ? (
        <div className="md:w-1/2 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">User Details</h3>
          <h2 className="text-xl font-bold mb-3">{selectedUser.name}</h2>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {selectedUser.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Role:</span> {selectedUser.role}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Joined:</span>{" "}
              {new Date(selectedUser.joinedAt).toLocaleDateString()}
            </p>

            <div className="pt-4 border-t mt-4">
              <h4 className="font-medium mb-2">Assigned Tasks</h4>
              {tasks.filter((task) => task.assignee === selectedUser.id)
                .length === 0 ? (
                <p className="text-gray-500">No tasks assigned</p>
              ) : (
                <div className="space-y-2">
                  {tasks
                    .filter((task) => task.assignee === selectedUser.id)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-2 border rounded text-sm cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          handleTaskSelect(task);
                          setActiveTab("tasks");
                        }}
                      >
                        <div className="flex justify-between">
                          <span>{task.title}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-1/2 bg-white rounded-lg shadow p-4 flex items-center justify-center">
          <p className="text-gray-500">Select a user to view details</p>
        </div>
      )}
    </div>
  );

  const renderProjectsTab = () => (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">
          Projects ({filteredProjects.length})
        </h3>
        {filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects match your search.</p>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedProject && selectedProject.id === project.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleProjectSelect(project)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{project.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {project.description.substring(0, 60)}
                  {project.description.length > 60 ? "..." : ""}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">
                    <span>
                      Deadline:{" "}
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>
                      {
                        tasks.filter((task) => task.projectId === project.id)
                          .length
                      }{" "}
                      tasks
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProject ? (
        <div className="md:w-1/2 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Project Details</h3>
          <h2 className="text-xl font-bold mb-3">{selectedProject.name}</h2>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-medium">Description:</span>{" "}
              {selectedProject.description}
            </p>
            <div className="flex gap-2 items-center">
              <span className="font-medium text-gray-700">Status:</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                  selectedProject.status
                )}`}
              >
                {selectedProject.status}
              </span>
            </div>
            <p className="text-gray-700">
              <span className="font-medium">Deadline:</span>{" "}
              {new Date(selectedProject.deadline).toLocaleDateString()}
            </p>

            <div className="pt-4 border-t mt-4">
              <h4 className="font-medium mb-2">Project Tasks</h4>
              {tasks.filter((task) => task.projectId === selectedProject.id)
                .length === 0 ? (
                <p className="text-gray-500">No tasks for this project</p>
              ) : (
                <div className="space-y-2">
                  {tasks
                    .filter((task) => task.projectId === selectedProject.id)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-2 border rounded text-sm cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          handleTaskSelect(task);
                          setActiveTab("tasks");
                        }}
                      >
                        <div className="flex justify-between">
                          <span>{task.title}</span>
                          <div className="flex gap-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            Assignee:{" "}
                            {users.find((user) => user.id === task.assignee)
                              ?.name || "Unassigned"}
                          </span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-1/2 bg-white rounded-lg shadow p-4 flex items-center justify-center">
          <p className="text-gray-500">Select a project to view details</p>
        </div>
      )}
    </div>
  );

  // Модальное окно для создания новых элементов
  const renderModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Create New{" "}
          {activeTab === "tasks"
            ? "Task"
            : activeTab === "users"
            ? "User"
            : "Project"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              {activeTab === "users" ? "Name" : "Title"}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              {activeTab === "users" ? "Email" : "Description"}
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
              rows={3}
            />
          </div>

          {activeTab === "tasks" && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="assignee"
                >
                  Assignee
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="assignee"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleFormChange}
                >
                  <option value="">Select Assignee</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="projectId"
                >
                  Project
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleFormChange}
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dueDate"
                >
                  Due Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </>
          )}

          {activeTab === "users" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                name="role"
                value={formData.role || ""}
                onChange={handleFormChange}
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Project Management Dashboard
          </h1>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="all">All Statuses</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={sortBy}
                onChange={handleSortChange}
                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="title">Sort by Title</option>
              </select>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleOpenModal}
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b">
          <nav className="flex -mb-px">
            <button
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm mr-8 ${
                activeTab === "tasks"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("tasks")}
            >
              Tasks
            </button>
            <button
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm mr-8 ${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("users")}
            >
              Users
            </button>
            <button
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === "projects"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("projects")}
            >
              Projects
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          {isLoading && !tasks.length && !users.length && !projects.length ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-500">Loading data...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "tasks" && renderTasksTab()}
              {activeTab === "users" && renderUsersTab()}
              {activeTab === "projects" && renderProjectsTab()}
            </>
          )}
        </div>
      </div>

      {renderModal()}
    </div>
  );
};

export default Dashboard;
