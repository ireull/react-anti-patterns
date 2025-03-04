import { Badge } from "../../../shared/components/Badge";
import { Card } from "../../../shared/components/Card";
import { formatDate, getStatusColor } from "../constants";
import { useDashboard } from "../context/DashboardContext";
import { Project } from "../types";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const { selectedProject, setSelectedProject, tasks } = useDashboard();

  if (projects.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold mb-4">Projects (0)</h3>
        <p className="text-gray-500">No projects match your search.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">
        Projects ({projects.length})
      </h3>
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedProject && selectedProject.id === project.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{project.name}</h4>
              <Badge
                text={project.status}
                className={getStatusColor(project.status)}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {project.description.length > 60
                ? `${project.description.substring(0, 60)}...`
                : project.description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                <span>Deadline: {formatDate(project.deadline)}</span>
              </div>
              <div className="text-xs text-gray-500">
                <span>
                  {tasks.filter((task) => task.projectId === project.id).length}{" "}
                  tasks
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
