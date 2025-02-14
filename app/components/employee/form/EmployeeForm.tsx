import type { Employee } from "~/types/Employee";
import { Form } from "react-router";

type Props = {
  employee?: Omit<Employee, "id">;
  errors: any;
  fields?: any;
};

export default function EmployeeForm({ employee, errors, fields }: Props) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <Form method="post" encType="multipart/form-data">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name<span className="text-red-400">*</span></label>
            <input
              type="text"
              name="full_name"
              className="input"
              defaultValue={fields?.full_name ?? employee?.full_name}
            />
            <p className="error">{errors?.full_name ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Email<span className="text-red-400">*</span></label>
            <input
              type="email"
              name="email"
              className="input"
              defaultValue={fields?.email ?? employee?.email}
            />
            <p className="error">{errors?.email ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Phone<span className="text-red-400">*</span></label>
            <input
              type="text"
              name="phone_number"
              className="input"
              defaultValue={fields?.phone_number ?? employee?.phone_number}
            />
            <p className="error">{errors?.phone_number ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth<span className="text-red-400">*</span></label>
            <input
              type="date"
              name="date_of_birth"
              className="input"
              defaultValue={fields?.date_of_birth ?? employee?.date_of_birth}
            />
            <p className="error">{errors?.date_of_birth ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Department<span className="text-red-400">*</span></label>
            <input
              type="text"
              name="department"
              className="input"
              defaultValue={fields?.department ?? employee?.department}
            />
            <p className="error">{errors?.department ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Job Title<span className="text-red-400">*</span></label>
            <input
              type="text"
              name="job_title"
              className="input"
              defaultValue={fields?.job_title ?? employee?.job_title}
            />
            <p className="error">{errors?.job_title ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Salary<span className="text-red-400">*</span></label>
            <input
              type="number"
              name="salary"
              className="input"
              defaultValue={fields?.salary ?? employee?.salary ?? 0}
            />
            <p className="error">{errors?.salary ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Start Date<span className="text-red-400">*</span></label>
            <input
              type="date"
              name="start_date"
              className="input"
              defaultValue={fields?.start_date ?? employee?.start_date}
            />
            <p className="error">{errors?.start_date ?? null}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              className="input"
              defaultValue={fields?.end_date ?? employee?.end_date}
            />
            <p className="error">{errors?.end_date ?? null}</p>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              name="profile_picture"
              className="input"
              defaultValue={fields?.profile_picture}
              accept="image/*"
            />
            <p className="error">{String(errors?.profile_picture ?? "")}</p>
          </div>
        </div>

        <div className="mt-6 text-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {employee ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </Form>
    </>
  );
}
