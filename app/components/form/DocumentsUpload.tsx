import type {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import type { Employee } from "~/types/Employee";

type Props = {
  fields: FieldArrayWithId<Omit<Employee, "id">, "documents", "id">[];
  append: UseFieldArrayAppend<Omit<Employee, "id">, "documents">;
  remove: UseFieldArrayRemove;
  register: any;
  errors: any;
};

function DocumentsUpload({ fields, append, remove, register, errors }: Props) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium">
        Documents (CV, ID, etc.)
      </label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2 mb-2">
          <select {...register(`documents.${index}.type`)} className="input">
            <option value="">Select Type</option>
            <option value="CV">CV</option>
            <option value="ID">ID</option>
            <option value="Certification">Certification</option>
          </select>

          <input
            type="file"
            {...register(`documents.${index}.file`)}
            className="input"
            accept="application/pdf"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ type: "", file: {} })}
        className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        + Add Document
      </button>
      <p className="error">{errors?.documents?.message}</p>
    </div>
  );
}

export default DocumentsUpload;
