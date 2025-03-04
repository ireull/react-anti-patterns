import { Badge } from "../../../shared/components/Badge";
import { Button } from "../../../shared/components/Button";
import { Card } from "../../../shared/components/Card";
import {
  formatDate,
  getPriorityColor,
  getStatusColor,
  truncateText,
} from "../constants";
import { useDashboard } from "../context/DashboardContext";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { selectedTask, setSelectedTask, updateTaskStatus, deleteTask } =
    useDashboard();

  if (tasks.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold mb-4">Tasks (0)</h3>
        <p className="text-gray-500">No tasks match your filters.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Tasks ({tasks.length})</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedTask && selectedTask.id === task.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedTask(task)}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{task.title}</h4>
              <div className="flex gap-1">
                <Badge
                  text={task.status}
                  className={getStatusColor(task.status)}
                />
                <Badge
                  text={task.priority}
                  className={getPriorityColor(task.priority)}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {truncateText(task.description, 60)}
            </p>
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">
                <span>Due: {formatDate(task.dueDate)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTaskStatus(task.id, "in-progress");
                  }}
                >
                  Start
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTaskStatus(task.id, "completed");
                  }}
                >
                  Complete
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
