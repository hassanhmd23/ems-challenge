import { useState, useEffect } from "react";
import type { Employee } from "~/types/Employee";

type Props = {
  initialFilters: { employee?: string };
  onFilterChange: (filters: { employee?: string }) => void;
};

export default function TimeSheetFilter({
  initialFilters,
  onFilterChange,
}: Props) {
  const [filters, setFilters] = useState(initialFilters);
  const [employees, setEmployees] = useState<
    Pick<Employee, "id" | "full_name">[]
  >([]);

  useEffect(() => {
    async function fetchFilters() {
      const res = await fetch("/api/time-sheet-filters");
      const data = await res.json();
      setEmployees(data.employees);
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
        value={filters.employee || ""}
        onChange={(e) => handleChange("employee", e.target.value)}
        className="input"
      >
        <option value="">All Employees</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.full_name}
          </option>
        ))}
      </select>
    </div>
  );
}
