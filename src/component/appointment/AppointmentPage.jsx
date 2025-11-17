"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { setSelectedSlot, updateForm, resetForm, setStatus, setError } from "../../lib/features/appointments/appointmentsSlice";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./appointment.module.css";
import Feedback from "./Feedback";

export default function AppointmentPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, jwt } = useSelector((s) => s.auth);
  const { selectedSlot, form, status, error } = useSelector((s) => s.appointments);

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  // Prefill user info
  useEffect(() => {
    if (user) {
      dispatch(updateForm({
        name: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        message: ""
      }));
    }
  }, [user, dispatch]);

  // Generate time slots 9AM-4PM
  const generateTimeSlots = (date) => {
    const slots = [];
    for (let hour = 9; hour < 16; hour++) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);
      slots.push({ id: hour, date: slotDate.toISOString(), booked: false });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(selectedDate);

  const selectSlot = (slot) => dispatch(setSelectedSlot(slot));

  const handleChange = (e) => dispatch(updateForm({ [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return dispatch(setError("Please select a slot."));
    if (!user || !jwt) return dispatch(setError("You must be logged in to book an appointment."));

    dispatch(setStatus("submitting"));
    dispatch(setError(null));

    try {
      const body = {
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          appointment_slot: selectedSlot.id,        // Correct key for Strapi
          users_permissions_user: user.id           // Correct key for Strapi
        },
      };

      const res = await fetch("http://localhost:1337/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.error?.message || "Failed to create appointment");
      }

      dispatch(setStatus("success"));
      dispatch(resetForm());
      dispatch(updateForm({
        name: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        message: ""
      }));
    } catch (err) {
      console.error(err);
      dispatch(setStatus("error"));
      dispatch(setError(err.message));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1>Select Date & Time</h1>
        <div className={styles.calendarBox}>
          <Calendar
            selected={selectedDate}
            onChange={setSelectedDate}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
          />
          <div className={styles.slotsBox}>
            {timeSlots.map((slot) => {
              const display = new Date(slot.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              return (
                <button
                  key={slot.id}
                  className={`${styles.slotButton} ${selectedSlot?.id === slot.id ? styles.selected : ""}`}
                  onClick={() => selectSlot(slot)}
                >
                  {display}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <h2>Your Request</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name<input name="name" value={form.name || ""} onChange={handleChange} required /></label>
          <label>Email<input type="email" name="email" value={form.email || ""} onChange={handleChange} required /></label>
          <label>Phone<input name="phone" value={form.phone || ""} onChange={handleChange} required /></label>
          <label>Message<textarea name="message" value={form.message || ""} onChange={handleChange} rows={4} /></label>

          {error && <p className={styles.error}>{error}</p>}
          {status === "success" && <p className={styles.success}>Appointment successfully booked!</p>}

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Book Appointment"}
          </button>
        </form>

        {user && <Feedback userId={user.id} token={jwt} />}
      </div>

      <div className={styles.right}>
        <h3>Selected Slot</h3>
        {selectedSlot ? (
          <p>{new Date(selectedSlot.date).toLocaleString()}</p>
        ) : <p>No slot selected</p>}

        <div className={styles.infoBox}>
          <h4>How it works</h4>
          <ol>
            <li>Choose a date.</li>
            <li>Select a time slot.</li>
            <li>Fill your contact details (pre-filled).</li>
            <li>We’ll confirm by email.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
