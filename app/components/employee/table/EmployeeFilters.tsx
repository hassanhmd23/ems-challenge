import { useState, useEffect } from "react";

type Props = {
  initialFilters: { department?: string; jobTitle?: string };
  onFilterChange: (filters: { department?: string; jobTitle?: string }) => void;
};

export default function EmployeeFilters({
  initialFilters,
  onFilterChange,
}: Props) {
  const [filters, setFilters] = useState(initialFilters);
  const [departments, setDepartments] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFilters() {
      const res = await fetch("/api/employee-filters");
      const data = await res.json();
      setDepartments(data.departments);
      setJobTitles(data.jobTitles);
    }
    fetchFilters();
  }, []);

  const handleChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={filters.department || ""}
        onChange={(e) => handleChange("department", e.target.value)}
        className="mt-1.5 w-50 h-10 p-1 rounded-lg border-gray-400 border-2 text-gray-700 sm:text-sm"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        value={filters.jobTitle || ""}
        onChange={(e) => handleChange("jobTitle", e.target.value)}
        className="mt-1.5 w-50 h-10 p-1 rounded-lg border-gray-400 border-2 text-gray-700 sm:text-sm"
      >
        <option value="">All Job Titles</option>
        {jobTitles.map((job) => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>
    </div>
  );
}
