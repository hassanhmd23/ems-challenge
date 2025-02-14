import { useLoaderData } from "react-router";
import EmployeeTable from "~/components/employee/table/EmployeeTable";
import type { Route } from "./+types/route";
import {
  getEmployeesWithRules,
  getTotalEmployeesWithRules,
} from "~/repositories/employeesRepository";
import prepareFetchEmployeesQuery from "~/utils/prepareFetchEmployeesQuery";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10) || 1;
  const limit = parseInt(url.searchParams.get("limit") ?? "5", 10) || 5;
  const sortColumn = url.searchParams.get("sort") || "id";
  const sortOrder = url.searchParams.get("order") === "desc" ? "DESC" : "ASC";
  const offset = (page - 1) * limit;
  const searchQuery = url.searchParams.get("search")?.trim() || "";
  const departmentFilter = url.searchParams.get("department")?.trim() || "";
  const jobTitleFilter = url.searchParams.get("jobTitle")?.trim() || "";

  const validColumns = ["full_name", "department", "job_title"];
  const safeSortColumn = validColumns.includes(sortColumn) ? sortColumn : "id";

  const { whereClauses, params } = prepareFetchEmployeesQuery(
    searchQuery,
    departmentFilter,
    jobTitleFilter,
    limit,
    offset
  );

  const employees = await getEmployeesWithRules({
    whereClauses,
    params,
    safeSortColumn,
    sortOrder,
  });

  const { total } = await getTotalEmployeesWithRules({
    whereClauses,
    params,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    employees,
    currentPage: page,
    limit,
    totalPages,
    sortColumn: safeSortColumn,
    sortOrder,
    searchQuery,
    filters: { department: departmentFilter, jobTitle: jobTitleFilter },
  };
}

export default function EmployeesPage() {
  const {
    employees,
    currentPage,
    limit,
    totalPages,
    sortColumn,
    sortOrder,
    searchQuery,
    filters,
  } = useLoaderData();

  return (
    <EmployeeTable
      data={employees}
      page={currentPage}
      limit={limit}
      totalPages={totalPages}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      searchQuery={searchQuery}
      filters={filters}
    />
  );
}
