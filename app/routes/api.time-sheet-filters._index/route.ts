import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();

  const employees = await db.all("SELECT id, full_name FROM employees;");

  return new Response(
    JSON.stringify({
      employees: employees,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
