import { getDB } from "~/db/getDB";
import type { TimeSheet } from "~/types/TimeSheet";

export const getTimeSheet = async (timeSheetId: string) => {
  const db = await getDB();
  return await db.get(
    "SELECT employee_id, summary, start_time, end_time FROM timesheets WHERE id = ?",
    timeSheetId
  );
};

export const getTimeSheetsWithRulesForCalendar = async ({
  whereClauses = [],
  params = [],
}: {
  whereClauses?: string[];
  params?: any[];
}) => {
  const db = await getDB();
  const query = `
    SELECT timesheets.id as id, employees.full_name as people, timesheets.start_time as start, timesheets.end_time as end, timesheets.summary as title FROM timesheets JOIN employees ON timesheets.employee_id = employees.id
    ${whereClauses.length ? "WHERE " + whereClauses.join(" AND ") : ""};
`;

  return await db.all(query, params);
};

export const getTimeSheetsWithRulesForTable = async ({
  whereClauses = [],
  params = [],
}: {
  whereClauses?: string[];
  params?: any[];
}) => {
  const db = await getDB();
  const query = `
        SELECT timesheets.id as id, employees.full_name as people, timesheets.start_time as start, timesheets.end_time as end, timesheets.summary as title FROM timesheets JOIN employees ON timesheets.employee_id = employees.id
        ${whereClauses.length ? "WHERE " + whereClauses.join(" AND ") : ""}
        LIMIT ? OFFSET ?;
    `;

  return await db.all(query, params);
};

export const getTotalTimeSheetsWithRules = async ({
  whereClauses = [],
  params = [],
}: {
  whereClauses?: string[];
  params?: any[];
}) => {
  const db = await getDB();
  const totalQuery = `
    SELECT COUNT(*) as total FROM timesheets
    ${whereClauses.length ? "WHERE " + whereClauses.join(" AND ") : ""};
  `;

  return await db.get(totalQuery, params.slice(0, -2));
};

export const createTimeSheet = async (timeSheet: TimeSheet) => {
  const db = await getDB();
  const query = `
        INSERT INTO timesheets (
        employee_id,
        start_time,
        end_time,
        summary
      ) VALUES (?, ?, ?, ?);
      `;

  return await db.run(query, [
    timeSheet.employee_id,
    new Date(timeSheet.start_time).toISOString().slice(0, 16).replace("T", " "),
    new Date(timeSheet.end_time).toISOString().slice(0, 16).replace("T", " "),
    timeSheet.summary,
  ]);
};

export const updateTimeSheet = async (timeSheet: TimeSheet) => {
  const db = await getDB();
  const query = `
        UPDATE timesheets
        SET employee_id = ?,
        start_time = ?,
        end_time = ?,
        summary = ?
        WHERE id = ?;
      `;

  return await db.run(query, [
    timeSheet.employee_id,
    new Date(timeSheet.start_time).toISOString().slice(0, 16).replace("T", " "),
    new Date(timeSheet.end_time).toISOString().slice(0, 16).replace("T", " "),
    timeSheet.summary,
    timeSheet.id,
  ]);
};
