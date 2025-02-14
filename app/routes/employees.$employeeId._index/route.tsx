import {
  data,
  redirect,
  useActionData,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import { parseFormData } from "@mjackson/form-data-parser";
import * as Yup from "yup";
import type { Route } from "./+types/route";
import EmployeeForm from "~/components/employee/form/EmployeeForm";
import validationAction from "~/utils/validationAction";
import objectNotEmpty from "~/utils/objectNotEmpty";
import { uploadHandler } from "~/utils/uploadHandler";
import { EmployeeSchema as schema } from "~/types/Employee";
import type { Employee } from "~/types/Employee";
import {
  getEmployee,
  updateEmployee,
} from "~/repositories/employeesRepository";

export async function loader({ params }: Route.LoaderArgs) {
  const { employeeId } = params;

  if (employeeId) {
    const employee = await getEmployee(employeeId);

    if (!employee) {
      throw data("Employee not found", {
        status: 404,
      });
    }
    return { employee, status: 200, message: "" };
  }

  return {};
}

type ActionInput = Yup.InferType<typeof schema>;

export const action: ActionFunction = async ({ request, params }) => {
  const parsedFormData = await parseFormData(request, uploadHandler);
  let { validatedFormData, errors } = await validationAction<ActionInput>({
    parsedFormData,
    schema,
  });

  if (objectNotEmpty(errors)) {
    return data(
      { errors, validatedFormData },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const { changes } = await updateEmployee(
    params.employeeId as string,
    validatedFormData as Employee
  );

  if (!changes) {
    return data(
      { errors: { full_name: "Could not update employee" }, validatedFormData },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return redirect("/employees");
};

export default function EmployeePage() {
  const { employee } = useLoaderData() as {
    employee: Employee;
    status: number;
  };

  const actionData = useActionData();
  const errors = actionData?.errors;
  const fields = actionData?.validatedFormData as ActionInput;

  return <EmployeeForm employee={employee} errors={errors} fields={fields} />;
}
