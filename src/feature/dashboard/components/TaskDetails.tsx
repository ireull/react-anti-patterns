import { Badge } from "../../../shared/components/Badge";
import { Button } from "../../../shared/components/Button";
import { Card } from "../../../shared/components/Card";
import { formatDate, getPriorityColor, getStatusColor } from "../constants";
import { useDashboard } from "../context/DashboardContext";

export const TaskDetails = () => {
  const { selectedTask, users, projects, updateTaskStatus, deleteTask } =
    useDashboard();

  if (!selectedTask) {
    return (
      <Card className="flex items-center justify-center min-h-48">
        <p className="text-gray-500">Select a task to view details</p>
      </Card>
    );
  }

  const assignee = users.find((user) => user.id === selectedTask.assignee);
  const project = projects.find(
    (project) => project.id === selectedTask.projectId
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Task Details</h3>
      <h2 className="text-xl font-bold mb-3">{selectedTask.title}</h2>
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-medium">Description:</span>{" "}
          {selectedTask.description}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Assignee:</span>{" "}
          {assignee?.name || "Unassigned"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Project:</span>{" "}
          {project?.name || "No Project"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Due Date:</span>{" "}
          {formatDate(selectedTask.dueDate)}
        </p>
        <div className="flex gap-2 items-center">
          <span className="font-medium text-gray-700">Status:</span>
          <Badge
            text={selectedTask.status}
            className={getStatusColor(selectedTask.status)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-medium text-gray-700">Priority:</span>
          <Badge
            text={selectedTask.priority}
            className={getPriorityColor(selectedTask.priority)}
          />
        </div>
        <div className="pt-4 border-t mt-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => updateTaskStatus(selectedTask.id, "todo")}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={() => updateTaskStatus(selectedTask.id, "in-progress")}
            >
              Start
            </Button>
            <Button
              variant="success"
              onClick={() => updateTaskStatus(selectedTask.id, "completed")}
            >
              Complete
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteTask(selectedTask.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
