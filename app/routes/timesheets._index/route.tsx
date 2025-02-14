import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import Calendar from "~/components/time-sheet/calendar/Calendar";
import TimeSheetFilter from "~/components/time-sheet/filter/TimeSheetFilters";
import TimeSheetTable from "~/components/time-sheet/table/TimeSheetTable";
import {
  getTimeSheetsWithRulesForCalendar,
  getTimeSheetsWithRulesForTable,
  getTotalTimeSheetsWithRules,
} from "~/repositories/timeSheetRepository";
import type { Route } from "./+types/route";
import prepareFetchTimeSheetsQuery from "~/utils/prepareFetchTimeSheetsQuery";
import { useEffect } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const view = url.searchParams.get("view") || "calendar";
  const employeeFilter = url.searchParams.get("employee")?.trim() || "";
  if (view === "table") {
    const page = parseInt(url.searchParams.get("page") ?? "1", 10) || 1;
    const limit = parseInt(url.searchParams.get("limit") ?? "5", 10) || 5;
    const offset = (page - 1) * limit;

    const { whereClauses, params } = prepareFetchTimeSheetsQuery(
      employeeFilter,
      view,
      limit,
      offset
    );

    const events = await getTimeSheetsWithRulesForTable({
      whereClauses,
      params,
    });

    const { total } = await getTotalTimeSheetsWithRules({
      whereClauses,
      params,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      events,
      currentPage: page,
      limit,
      totalPages,
      filters: { employee: employeeFilter },
    };
  } else {
    const { whereClauses, params } = prepareFetchTimeSheetsQuery(
      employeeFilter,
      "calendar"
    );

    const events = await getTimeSheetsWithRulesForCalendar({
      whereClauses,
      params,
    });
    return {
      events,
      filters: { employee: employeeFilter },
    };
  }
}

export default function TimesheetsPage() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");
  const navigate = useNavigate();
  const { events, currentPage, limit, totalPages, filters } = useLoaderData();

  const handleFilterChange = (newFilters: { employee?: string }) => {
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    if (view === "calendar") {
      searchParams.delete("page");
    } else {
      searchParams.set("page", "1");
    }
    navigate(`?${searchParams.toString()}`,);
  };

  return (
    <>
      <div>
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>
          <select
            id="Tab"
            className="w-full rounded-md border-gray-200"
            onChange={(e) => {
              const view = e.target.value;
              navigate(`?view=${view}`);
            }}
          >
            <option>Calendar</option>
            <option>Table</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <nav className="flex gap-6" aria-label="Tabs">
            <Link
              to={`/timesheets?view=calendar&${searchParams
                .toString()
                .replace("view=table", "")}`}
              className={
                view === "calendar"
                  ? "shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
                  : "shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }
            >
              Calendar
            </Link>

            <Link
              to={`/timesheets?view=table&${searchParams
                .toString()
                .replace("view=calendar", "")}`}
              className={
                view === "table"
                  ? "shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
                  : "shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }
            >
              Table
            </Link>
          </nav>
        </div>
      </div>
      <TimeSheetFilter
        initialFilters={filters}
        onFilterChange={handleFilterChange}
      />
      {view === "table" ? (
        <TimeSheetTable
          data={events}
          page={currentPage}
          limit={limit}
          totalPages={totalPages}
        />
      ) : (
        <Calendar events={events} />
      )}
    </>
  );
}
