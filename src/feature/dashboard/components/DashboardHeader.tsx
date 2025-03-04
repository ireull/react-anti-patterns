import { ChangeEvent } from "react";
import { useDashboard } from "../context/DashboardContext";
import { FilterStatus, SortOption } from "../types";
import { SearchInput } from "../../../shared/components/SearchInput";
import { Button } from "../../../shared/components/Button";

export const DashboardHeader = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    setIsModalOpen,
    activeTab,
  } = useDashboard();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as FilterStatus);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Project Management Dashboard
        </h1>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="w-full sm:w-64">
            <SearchInput value={searchTerm} onChange={handleSearchChange} />
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
              {activeTab === "projects" && (
                <option value="planning">Planning</option>
              )}
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

            <Button onClick={() => setIsModalOpen(true)}>Create New</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
