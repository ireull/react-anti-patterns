import { Badge } from "../../../shared/components/Badge";
import { Card } from "../../../shared/components/Card";
import { formatDate, getPriorityColor, getStatusColor } from "../constants";
import { useDashboard } from "../context/DashboardContext";

export const ProjectDetails = () => {
  const { selectedProject, tasks, users, setSelectedTask, setActiveTab } =
    useDashboard();

  if (!selectedProject) {
    return (
      <Card className="flex items-center justify-center min-h-48">
        <p className="text-gray-500">Select a project to view details</p>
      </Card>
    );
  }

  const projectTasks = tasks.filter(
    (task) => task.projectId === selectedProject.id
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Project Details</h3>
      <h2 className="text-xl font-bold mb-3">{selectedProject.name}</h2>
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-medium">Description:</span>{" "}
          {selectedProject.description}
        </p>
        <div className="flex gap-2 items-center">
          <span className="font-medium text-gray-700">Status:</span>
          <Badge
            text={selectedProject.status}
            className={getStatusColor(selectedProject.status)}
          />
        </div>
        <p className="text-gray-700">
          <span className="font-medium">Deadline:</span>{" "}
          {formatDate(selectedProject.deadline)}
        </p>

        <div className="pt-4 border-t mt-4">
          <h4 className="font-medium mb-2">Project Tasks</h4>
          {projectTasks.length === 0 ? (
            <p className="text-gray-500">No tasks for this project</p>
          ) : (
            <div className="space-y-2">
              {projectTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 border rounded text-sm cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSelectedTask(task);
                    setActiveTab("tasks");
                  }}
                >
                  <div className="flex justify-between">
                    <span>{task.title}</span>
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
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      Assignee:{" "}
                      {users.find((user) => user.id === task.assignee)?.name ||
                        "Unassigned"}
                    </span>
                    <span className="text-xs text-gray-500">
                      Due: {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
