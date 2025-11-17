"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedSlot,
  updateForm,
  resetForm,
  setStatus,
  setError,
} from "../../lib/features/appointments/appointmentsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./appointment.module.css";

export default function AppointmentForm() {
  const dispatch = useDispatch();
  const { user, jwt: token } = useSelector((s) => s.auth);
  const { selectedSlot, form, status, error } = useSelector(
    (s) => s.appointments
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Pre-fill form from logged-in user
  useEffect(() => {
    if (user) {
      dispatch(
        updateForm({
          name: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          message: "",
        })
      );
    }
  }, [user, dispatch]);

  // Generate time slots from 9AM to 4PM
  const generateTimeSlots = (date) => {
    const slots = [];
    for (let hour = 9; hour < 16; hour++) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);
      slots.push({ id: hour, date: slotDate.toISOString(), booked: false });
    }
    return slots;
  };

  const filteredSlots = generateTimeSlots(selectedDate);

  const selectSlot = (slot) => dispatch(setSelectedSlot(slot));
  const handleChange = (e) =>
    dispatch(updateForm({ [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return dispatch(setError("Please select a slot."));
    dispatch(setStatus("submitting"));
    dispatch(setError(null));

    try {
      const body = {
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          slot: selectedSlot.date,
          user: user.id,
        },
      };

      const res = await fetch("http://localhost:1337/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create appointment");

      dispatch(setStatus("success"));
      dispatch(resetForm());
      dispatch(
        updateForm({
          name: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          message: "",
        })
      );
    } catch (err) {
      dispatch(setStatus("error"));
      dispatch(setError(err.message));
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Calendar + Time Slots in one card */}
      <div className={styles.left}>
        <div className={styles.calendarBox}>
          <label>Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            className={styles.dateInput}
          />

          <div className={styles.slotsBox}>
            {filteredSlots.map((slot) => {
              const slotDate = new Date(slot.date);
              const display = slotDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <button
                  key={slot.id}
                  disabled={slot.booked}
                  className={`${styles.slotButton} ${
                    selectedSlot?.id === slot.id ? styles.selected : ""
                  }`}
                  onClick={() => selectSlot(slot)}
                  style={{
                    cursor: slot.booked ? "not-allowed" : "pointer",
                    opacity: slot.booked ? 0.5 : 1,
                  }}
                >
                  {display} {slot.booked ? "(Booked)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles.middle}>
        <h2>Your Request</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name || ""} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email || ""} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone || ""} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" value={form.message || ""} onChange={handleChange} rows={4} />
          </label>

          {error && <p className={styles.error}>{error}</p>}
          {status === "success" && (
            <p className={styles.success}>
              Appointment successfully booked!
            </p>
          )}

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Book Appointment"}
          </button>
        </form>
      </div>

      {/* Right info panel */}
      <div className={styles.right}>
        <h3>Selected Slot</h3>
        {selectedSlot ? (
          <p>{new Date(selectedSlot.date).toLocaleString()}</p>
        ) : (
          <p>No slot selected</p>
        )}

        <div className={styles.infoBox}>
          <h4>How it works</h4>
          <ol>
            <li>Choose a date.</li>
            <li>Select a slot.</li>
            <li>Fill your contact details (pre-filled).</li>
            <li>We’ll confirm by email.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
