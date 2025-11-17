"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./appointment.module.css";

export default function CalendarView({ selectedDate, setSelectedDate }) {
  return (
    <label>
      Select Date:
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
      />
    </label>
  );
}
