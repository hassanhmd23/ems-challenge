import * as Yup from "yup";

export type TimeSheet = {
  id: string;
  employee_id: string;
  start_time: Date;
  end_time: Date;
  summary?: string;
};

export type Event = {
  id: string;
  title?: string;
  people: string | string[];
  start: string;
  end: string;
};

export const TimeSheetSchema = Yup.object().shape({
  employee_id: Yup.string().required("Employee is required"),
  start_time: Yup.date().required("Start time is required"),
  end_time: Yup.date()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { start_time } = this.parent;
        return start_time && value
          ? new Date(value) > new Date(start_time)
          : true;
      }
    ),
  summary: Yup.string().nullable(),
});
