import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import { FormData } from "../types";
import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";

export const CreateItemModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    activeTab,
    users,
    projects,
    createTask,
    createUser,
    createProject,
    isLoading,
  } = useDashboard();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    assignee: "",
    projectId: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
    role: "Developer",
  });

  // Сброс формы при открытии/закрытии модального окна
  useEffect(() => {
    if (isModalOpen) {
      setFormData({
        title: "",
        description: "",
        assignee: "",
        projectId: "",
        dueDate: "",
        priority: "medium",
        status: "todo",
        role: "Developer",
      });
    }
  }, [isModalOpen]);

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

    if (activeTab === "tasks") {
      createTask(formData);
    } else if (activeTab === "users") {
      createUser(formData);
    } else if (activeTab === "projects") {
      createProject(formData);
    }
  };

  const getModalTitle = () => {
    switch (activeTab) {
      case "tasks":
        return "Create New Task";
      case "users":
        return "Create New User";
      case "projects":
        return "Create New Project";
      default:
        return "Create New Item";
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={getModalTitle()}
    >
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
              value={formData.role}
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

        {activeTab === "projects" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dueDate"
            >
              Deadline
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
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
