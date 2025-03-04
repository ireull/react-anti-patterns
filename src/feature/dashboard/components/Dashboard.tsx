import { Tabs } from "../../../shared/components/Tabs";

import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";
import { ActiveTab } from "../types";
import { UserList } from "./UserList";
import { UserDetails } from "./UserDetails";
import { ProjectList } from "./ProjectList";
import { ProjectDetails } from "./ProjectDetails";
import { TaskList } from "./TaskList";
import { TaskDetails } from "./TaskDetails";
import { CreateItemModal } from "./CreateItemModal";
import { DashboardHeader } from "./DashboardHeader";

const DashboardContent = () => {
  const {
    tasks,
    users,
    projects,
    activeTab,
    setActiveTab,
    searchTerm,
    filterStatus,
    sortBy,
    isLoading,
  } = useDashboard();

  // Используем выделенные хуки для обработки данных
  const { sortedTasks } = useTasks({ tasks, searchTerm, filterStatus, sortBy });
  const { filteredUsers } = useUsers({ users, searchTerm });
  const { filteredProjects } = useProjects({
    projects,
    searchTerm,
    filterStatus,
  });

  // Конфигурация вкладок
  const tabs = [
    { id: "tasks", label: "Tasks" },
    { id: "users", label: "Users" },
    { id: "projects", label: "Projects" },
  ];

  // Обработчик переключения вкладок
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as ActiveTab);
  };

  // Рендеринг загрузки данных
  if (isLoading && !tasks.length && !users.length && !projects.length) {
    return (
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
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="mb-6"
        />

        <div className="dashboard-content">
          {activeTab === "tasks" && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <TaskList tasks={sortedTasks} />
              </div>
              <div className="md:w-1/2">
                <TaskDetails />
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <UserList users={filteredUsers} />
              </div>
              <div className="md:w-1/2">
                <UserDetails />
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <ProjectList projects={filteredProjects} />
              </div>
              <div className="md:w-1/2">
                <ProjectDetails />
              </div>
            </div>
          )}
        </div>
      </div>

      <CreateItemModal />
    </div>
  );
};

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};
