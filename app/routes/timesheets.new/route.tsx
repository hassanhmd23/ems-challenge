import { useLoaderData, redirect, data, useActionData } from "react-router";
import type { ActionFunction } from "react-router";
import * as Yup from "yup";

import TimeSheetForm from "~/components/time-sheet/form/TimeSheetForm";
import { getAllEmployees } from "~/repositories/employeesRepository";
import { createTimeSheet } from "~/repositories/timeSheetRepository";
import { TimeSheetSchema as schema, type TimeSheet } from "~/types/TimeSheet";
import objectNotEmpty from "~/utils/objectNotEmpty";
import validationAction from "~/utils/validationAction";

export async function loader() {
  const employees = await getAllEmployees();
  return { employees };
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

  const { lastID } = await createTimeSheet(validatedFormData as TimeSheet);

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

export default function NewTimesheetPage() {
  const { employees } = useLoaderData();
  const actionData = useActionData();
  const errors = actionData?.errors;
  const fields = actionData?.validatedFormData as ActionInput;

  return (
    <TimeSheetForm employees={employees} errors={errors} fields={fields} />
  );
}
