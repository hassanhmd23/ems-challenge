import { getDB } from "~/db/getDB";
import type { Employee } from "~/types/Employee";

const db = await getDB();

export const getEmployee = async (employeeId: string) => {
  return await db.get("SELECT * FROM employees WHERE id = ?", employeeId);
};

export const getEmployeesWithRules = async ({
  whereClauses = [],
  params = [],
  safeSortColumn = "id",
  sortOrder = "ASC",
}: {
  whereClauses?: string[];
  params?: any[];
  safeSortColumn?: string;
  sortOrder?: "ASC" | "DESC";
}) => {
  let query = `
    SELECT id, profile_picture, full_name, department, job_title
    FROM employees
    ${whereClauses.length ? "WHERE " + whereClauses.join(" AND ") : ""}
    ORDER BY ${safeSortColumn} ${sortOrder}
    LIMIT ? OFFSET ?;
  `;

  return await db.all(query, params);
};

export const getTotalEmployeesWithRules = async ({
  whereClauses = [],
  params = [],
}: {
  whereClauses?: string[];
  params?: any[];
}) => {
  const totalQuery = `
    SELECT COUNT(*) as total FROM employees
    ${whereClauses.length ? "WHERE " + whereClauses.join(" AND ") : ""};
  `;

  return await db.get(totalQuery, params.slice(0, -2));
};

export const createEmployee = async (employee: Employee) => {
  const query = `
        INSERT INTO employees (
        full_name,
        email,
        phone_number,
        date_of_birth,
        department,
        job_title,
        salary,
        start_date,
        end_date,
        profile_picture
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  return await db.run(
    query,
    employee.full_name,
    employee.email,
    employee.phone_number,
    new Date(employee.date_of_birth).toISOString().slice(0, 10),
    employee.department,
    employee.job_title,
    employee.salary,
    new Date(employee.start_date).toISOString().slice(0, 10),
    employee.end_date
      ? new Date(employee.end_date).toISOString().slice(0, 10)
      : null,
    employee.profile_picture
  );
};

export const updateEmployee = async (
  employeeId: string,
  employee: Employee
) => {
  let query = `
    UPDATE employees
    SET
      full_name = ?,
      email = ?,
      phone_number = ?,
      date_of_birth = ?,
      department = ?,
      job_title = ?,
      salary = ?,
      start_date = ?,
      end_date = ?
  `;

  const params = [
    employee.full_name,
    employee.email,
    employee.phone_number,
    new Date(employee.date_of_birth).toISOString().slice(0, 10),
    employee.department,
    employee.job_title,
    employee.salary,
    new Date(employee.start_date).toISOString().slice(0, 10),
    employee.end_date
      ? new Date(employee.end_date).toISOString().slice(0, 10)
      : null,
  ];

  if (employee.profile_picture) {
    query += `, profile_picture = ?`;
    params.push(employee.profile_picture);
  }

  query += ` WHERE id = ?;`;
  params.push(employeeId);

  return await db.run(query, params);
};
