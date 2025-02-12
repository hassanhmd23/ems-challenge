const prepareFetchEmployeesQuery = (
  searchQuery: string,
  departmentFilter: string,
  jobTitleFilter: string,
  limit: number,
  offset: number
) => {
  let whereClauses: string[] = [];
  let params: any[] = [];

  if (searchQuery) {
    whereClauses.push(
      "(full_name LIKE ? OR department LIKE ? OR job_title LIKE ?)"
    );
    params.push(`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`);
  }
  if (departmentFilter) {
    whereClauses.push("department = ?");
    params.push(departmentFilter);
  }
  if (jobTitleFilter) {
    whereClauses.push("job_title = ?");
    params.push(jobTitleFilter);
  }

  params.push(limit, offset);
  return { whereClauses, params };
};

export default prepareFetchEmployeesQuery;
