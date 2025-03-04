import { Card } from "../../../shared/components/Card";
import { useDashboard } from "../context/DashboardContext";
import { User } from "../types";

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const { selectedUser, setSelectedUser } = useDashboard();

  if (users.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold mb-4">Users (0)</h3>
        <p className="text-gray-500">No users match your search.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Users ({users.length})</h3>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedUser && selectedUser.id === user.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedUser(user)}
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
    </Card>
  );
};
