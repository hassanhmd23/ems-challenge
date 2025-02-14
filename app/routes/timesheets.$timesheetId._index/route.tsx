import {
  data,
  redirect,
  useActionData,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import * as Yup from "yup";

import type { Route } from "./+types/route";
import {
  getTimeSheet,
  updateTimeSheet,
} from "~/repositories/timeSheetRepository";
import { TimeSheetSchema as schema, type TimeSheet } from "~/types/TimeSheet";
import TimeSheetForm from "~/components/time-sheet/form/TimeSheetForm";
import validationAction from "~/utils/validationAction";
import objectNotEmpty from "~/utils/objectNotEmpty";
import { getAllEmployees } from "~/repositories/employeesRepository";
import type { Employee } from "~/types/Employee";

export async function loader({ params }: Route.LoaderArgs) {
  const { timesheetId } = params;

  if (timesheetId) {
    const timeSheet = await getTimeSheet(timesheetId);

    if (!timeSheet) {
      throw data("TimeSheet not found", {
        status: 404,
      });
    }
    const employees = await getAllEmployees();

    return { timeSheet, employees, status: 200, message: "" };
  }

  return {};
}

type ActionInput = Yup.InferType<typeof schema>;

export const action: ActionFunction = async ({ request }) => {
  const parsedFormData = await request.formData();
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

  const { lastID } = await updateTimeSheet(validatedFormData as TimeSheet);

  if (!lastID) {
    return data(
      {
        errors: { full_name: "Could not create timeSheet" },
        validatedFormData,
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return redirect("/timesheets");
};

export default function TimesheetPage() {
  const { timeSheet, employees } = useLoaderData() as {
    timeSheet: TimeSheet;
    employees: Pick<Employee, "id" | "full_name">[];
  };

  const actionData = useActionData();
  const errors = actionData?.errors;
  const fields = actionData?.validatedFormData as ActionInput;

  return (
    <TimeSheetForm
      errors={errors}
      fields={fields}
      timeSheet={timeSheet}
      employees={employees}
    />
  );
}
