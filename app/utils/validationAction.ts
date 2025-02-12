import type { AnyObject, Schema } from "yup";

type ActionError<T> = Partial<Record<keyof T, string>>;

const validationAction = async <ActionInput extends AnyObject>({
  parsedFormData,
  schema,
}: {
  parsedFormData: FormData;
  schema: Schema<ActionInput>;
}) => {
  const body = Object.fromEntries(parsedFormData) as ActionInput;

  try {
    const validatedFormData = await schema.validate(body, { abortEarly: false });

    return { validatedFormData, errors: {} };
  } catch (e) {
    const errors: ActionError<ActionInput> = {};

    if (e instanceof Error && "inner" in e) {
      (e.inner as Array<{ path?: string; message: string }>).forEach((err) => {
        if (err.path) {
          errors[err.path as keyof ActionInput] = err.message;
        }
      });
    }

    return { validatedFormData: body, errors };
  }
};

export default validationAction;