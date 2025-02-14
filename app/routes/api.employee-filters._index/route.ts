import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();

  const departments = await db.all(
    "SELECT DISTINCT department FROM employees;"
  );
  const jobTitles = await db.all("SELECT DISTINCT job_title FROM employees;");

  return new Response(
    JSON.stringify({
      departments: departments.map((d) => d.department),
      jobTitles: jobTitles.map((j) => j.job_title),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
