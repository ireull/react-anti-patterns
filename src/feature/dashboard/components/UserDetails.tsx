import { Badge } from "../../../shared/components/Badge";
import { Card } from "../../../shared/components/Card";
import { formatDate, getStatusColor } from "../constants";
import { useDashboard } from "../context/DashboardContext";

export const UserDetails = () => {
  const { selectedUser, tasks, setSelectedTask, setActiveTab } = useDashboard();

  if (!selectedUser) {
    return (
      <Card className="flex items-center justify-center min-h-48">
        <p className="text-gray-500">Select a user to view details</p>
      </Card>
    );
  }

  const userTasks = tasks.filter((task) => task.assignee === selectedUser.id);

  return (
    <Card>
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
          {formatDate(selectedUser.joinedAt)}
        </p>

        <div className="pt-4 border-t mt-4">
          <h4 className="font-medium mb-2">Assigned Tasks</h4>
          {userTasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned</p>
          ) : (
            <div className="space-y-2">
              {userTasks.map((task) => (
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
                    <Badge
                      text={task.status}
                      className={getStatusColor(task.status)}
                    />
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
