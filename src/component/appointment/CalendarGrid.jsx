// src/component/appointment/CalendarGrid.jsx
"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./appointment.module.css";

export default function CalendarGrid({ selectedDate, setSelectedDate }) {
  return (
    <div className={styles.calendarBox}>
      <label>
        Select Date:
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
          className={styles.datePicker}
        />
      </label>
    </div>
  );
}
