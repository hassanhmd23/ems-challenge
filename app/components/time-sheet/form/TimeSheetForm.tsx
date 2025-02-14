import type { Employee } from "~/types/Employee";
import { Form } from "react-router";
import type { TimeSheet } from "~/types/TimeSheet";

type Props = {
  timeSheet?: Omit<TimeSheet, "id">;
  employees?: Pick<Employee, "id" | "full_name">[];
  errors: any;
  fields?: any;
};

export default function TimeSheetForm({
  timeSheet,
  employees,
  errors,
  fields,
}: Props) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">
        {timeSheet ? "Edit TimeSheet" : "Add TimeSheet"}
      </h2>

      <Form method="post">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="HeadlineAct"
              className="block text-sm font-medium text-gray-900"
            >
              Employee<span className="text-red-400">*</span>
            </label>

            <select
              name="employee_id"
              id="HeadlineAct"
              className="input"
              defaultValue={fields?.employee_id ?? timeSheet?.employee_id}
            >
              <option value="">Please select</option>
              {employees?.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </select>
            <p className="error">{errors?.employee_id ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Summary</label>
            <input
              type="text"
              name="summary"
              className="input"
              defaultValue={fields?.summary ?? timeSheet?.summary}
            />
            <p className="error">{errors?.summary ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="start_time">
              Start Time<span className="text-red-400">*</span>
            </label>
            <input
              type="datetime-local"
              name="start_time"
              id="start_time"
              className="input"
              defaultValue={fields?.start_time ?? timeSheet?.start_time}
            />
            <p className="error">{errors?.start_time ?? null}</p>
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="end_time">
              End Time<span className="text-red-400">*</span>
            </label>
            <input
              type="datetime-local"
              name="end_time"
              id="end_time"
              className="input"
              defaultValue={fields?.end_time ?? timeSheet?.end_time}
            />
            <p className="error">{errors?.end_time ?? null}</p>
          </div>
        </div>

        <div className="mt-6 text-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            {timeSheet ? "Update TimeSheet" : "Add TimeSheet"}
          </button>
        </div>
      </Form>
    </>
  );
}
