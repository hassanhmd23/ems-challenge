import { Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router";
import capitalizeHeader from "~/utils/capitalizeHeader";
import SearchBar from "./SearchBar";
import EmployeeFilters from "./EmployeeFilters";

type Props = {
  data: any;
  page: number;
  limit: number;
  totalPages: number;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  searchQuery?: string;
  filters: { department?: string; jobTitle?: string };
};

function EmployeeTable({
  data,
  page,
  limit,
  totalPages,
  sortColumn,
  sortOrder,
  searchQuery,
  filters,
}: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleLimitChange = (newLimit: number) => {
    searchParams.set("limit", String(newLimit));
    searchParams.set("page", "1");
    navigate(`?${searchParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", String(newPage));
    navigate(`?${searchParams.toString()}`);
  };

  const handleSortChange = (column: string) => {
    const currentOrder = searchParams.get("order") === "asc" ? "desc" : "asc";
    searchParams.set("sort", column);
    searchParams.set("order", currentOrder);
    navigate(`?${searchParams.toString()}`);
  };

  const handleSearch = (query: string) => {
    searchParams.set("search", query);
    searchParams.set("page", "1");
    navigate(`?${searchParams.toString()}`);
  };

  const handleFilterChange = (newFilters: {
    department?: string;
    jobTitle?: string;
  }) => {
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    searchParams.set("page", "1");
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <>
      <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />
      <EmployeeFilters initialFilters={filters} onFilterChange={handleFilterChange} />
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {Object.keys(data[0]).map((header) =>
                header === "id" ? (
                  <Fragment key={header}></Fragment>
                ) : (
                  <th
                    key={header}
                    className="px-4 py-2 font-medium whitespace-nowrap text-gray-900 cursor-pointer"
                    onClick={() => handleSortChange(header)}
                  >
                    {capitalizeHeader(header)}{" "}
                    {sortColumn === header && (
                      <span>
                        {sortOrder.toLowerCase() === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                )
              )}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((row: any, index: number) => (
              <tr key={index}>
                {Object.keys(row).map((value, idx) =>
                  value === "id" ? (
                    <Fragment key={idx}></Fragment>
                  ) : value === "profile_picture" ? (
                    <td
                      key={idx}
                      className="px-4 py-2 whitespace-nowrap text-gray-700"
                    >
                      <img
                        src={`/api/profile-picture/${row[value]}`}
                        alt="user avatar"
                        width={60}
                        height={60}
                      />
                    </td>
                  ) : (
                    <td
                      key={idx}
                      className="px-4 py-2 whitespace-nowrap text-gray-700"
                    >
                      {row[value]}
                    </td>
                  )
                )}
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                  <button
                    onClick={() => navigate(`/employees/${row.id}`)}
                    className="inline-block rounded px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:relative"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Limit Selector */}
      <div className="flex justify-between items-center rounded-b-lg border-t border-gray-200 px-4 py-2">
        {/* Limit Selector */}
        <div>
          <label htmlFor="limit" className="mr-2 text-sm font-medium">
            Rows per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[5, 10, 15, 20, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTable;
