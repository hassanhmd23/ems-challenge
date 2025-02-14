import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  type CalendarEventExternal,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

import type { Event } from "~/types/TimeSheet";
import { useNavigate } from "react-router";

type Props = {
  events: Event[];
};

const Calendar = ({ events }: Props) => {
  const navigate = useNavigate();

  const updateEvents = events.map((event) => ({
    ...event,
    people: [event.people],
  }));
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: updateEvents as CalendarEventExternal[],
    plugins: [eventsService],
    callbacks: {
      onEventClick(calendarEvent) {
        navigate(`/timesheets/${calendarEvent.id}`);
      },
    },
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Calendar;
