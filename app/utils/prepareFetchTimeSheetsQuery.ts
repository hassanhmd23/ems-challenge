const prepareFetchTimeSheetsQuery = (
  employeeFilter: string,
  view: "table" | "calendar",
  limit?: number,
  offset?: number
) => {
  let whereClauses: string[] = [];
  let params: any[] = [];

  if (employeeFilter) {
    whereClauses.push("employee_id = ?");
    params.push(employeeFilter);
  }
  if (view === "table") {
    params.push(limit, offset);
  }
  return { whereClauses, params };
};

export default prepareFetchTimeSheetsQuery;
