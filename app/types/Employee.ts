import * as Yup from "yup";

export type Employee = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: Date;
  department: string;
  job_title: string;
  salary: number;
  start_date: Date;
  end_date?: Date | null;
  profile_picture: any;
};

export const EmployeeSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string().required("Phone is required"),
  date_of_birth: Yup.date()
    .nullable() // Allows the field to be empty initially
    .required("Date of Birth is required")
    .test("is-18", "You must be at least 18 years old", (value) => {
      if (!value) return false; // Required field check
      const today = new Date();
      const minAgeDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return value <= minAgeDate; // Ensures user is at least 18
    }),
  department: Yup.string().required("Department is required"),
  job_title: Yup.string().required("Job title is required"),
  salary: Yup.number()
    .positive("Salary must be positive")
    .required("Salary is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .test(
      "is-valid-or-null",
      "End date must be a valid date",
      (value) =>
        value === null || (value instanceof Date && !isNaN(value.getTime()))
    )
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const startDate = this.parent.start_date;
        return !value || !startDate || value > startDate;
      }
    ),
  profile_picture: Yup.mixed(),
});
