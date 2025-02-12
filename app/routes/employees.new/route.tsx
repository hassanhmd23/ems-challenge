import {
  data,
  redirect,
  useActionData,
  type ActionFunction,
} from "react-router";
import * as Yup from "yup";
import { parseFormData } from "@mjackson/form-data-parser";

import EmployeeForm from "~/components/form/EmployeeForm";
import { EmployeeSchema as schema, type Employee } from "~/types/Employee";
import { createEmployee } from "~/repositories/employeesRepository";
import validationAction from "~/utils/validationAction";
import { uploadHandler } from "~/utils/uploadHandler";
import { profilePictureStorage } from "~/utils/storage.server";
import objectNotEmpty from "~/utils/objectNotEmpty";

type ActionInput = Yup.InferType<typeof schema>;

export const action: ActionFunction = async ({ request }) => {
  const parsedFormData = await parseFormData(request, uploadHandler);

  let { validatedFormData, errors } = await validationAction<ActionInput>({
    parsedFormData,
    schema,
  });

  if (objectNotEmpty(errors)) {
    profilePictureStorage.remove(validatedFormData.profile_picture as string);
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

  const { lastID } = await createEmployee(validatedFormData as Employee);

  if (!lastID) {
    return data(
      { errors: { full_name: "Could not create employee" }, validatedFormData },
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

export default function NewEmployeePage() {
  const actionData = useActionData();
  const errors = actionData?.errors;
  const fields = actionData?.validatedFormData as ActionInput;

  return <EmployeeForm fields={fields} errors={errors} />;
}
