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
  const [bookings, setBookings] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  // Prefill user info and default appointment type
  useEffect(() => {
    if (user) {
      dispatch(updateForm({
        name: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        message: "",
        category: "Introduction Meeting", // default type after login
      }));
    }
  }, [user, dispatch]);

  // Fetch booking history from backend
  const fetchBookings = async () => {
    if (!user || !jwt) return;
    try {
      const res = await fetch(
        `http://localhost:1337/api/appointments?filters[users_permissions_user][id][$eq]=${user.id}&sort=appointment_slot:asc`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user, jwt]);

  // Generate 9AM-4PM time slots
  const generateTimeSlots = (date) => {
    const slots = [];
    const now = new Date();
    for (let hour = 9; hour < 16; hour++) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);
      slots.push({
        id: hour,
        date: slotDate.toISOString(),
        isPast: slotDate < now,
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(selectedDate);

  const selectSlot = (slot) => {
    if (!slot.isPast) dispatch(setSelectedSlot(slot));
  };

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
          appointment_slot: selectedSlot.id,
          users_permissions_user: user.id,
          category: form.category || "General",
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

      await res.json();

      dispatch(setStatus("success"));
      dispatch(resetForm());
      dispatch(updateForm({
        name: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        message: "",
        category: form.category || "Introduction Meeting",
      }));

      await fetchBookings(); // refresh history

      // Show confirmation message
      setConfirmation(`✔ Your appointment is booked for ${new Date(selectedSlot.date).toLocaleString()}`);
    } catch (err) {
      console.error(err);
      dispatch(setStatus("error"));
      dispatch(setError(err.message));
    }
  };

  // Auto-hide confirmation message after 5 seconds
  useEffect(() => {
    if (!confirmation) return;
    const timer = setTimeout(() => setConfirmation(null), 5000);
    return () => clearTimeout(timer);
  }, [confirmation]);

  const handleDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    setSelectedDate(date);
  };

  const toggleHistory = () => setShowHistory((prev) => !prev);

  const handleCancel = async (appointmentId) => {
    if (!jwt) return alert("Not authorized");
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const res = await fetch(`http://localhost:1337/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error("Failed to cancel appointment");

      await fetchBookings(); // refresh history
      alert("Appointment cancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Error cancelling appointment: " + err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Left: Calendar & Slots */}
      <div className={styles.left}>
        <h1>Select Date & Time</h1>
        <Calendar
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
        />
        <div className={styles.slotsBox}>
          {timeSlots.map((slot) => {
            const slotDateObj = new Date(slot.date);
            const display = slotDateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            return (
              <button
                key={slot.id}
                className={`${styles.slotButton} ${selectedSlot?.id === slot.id ? styles.selected : ""} ${slot.isPast ? styles.disabled : ""}`}
                onClick={() => selectSlot(slot)}
                disabled={slot.isPast}
              >
                {display}
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle: Form */}
      <div className={styles.middle}>
        <h2>Your Request</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name
            <input name="name" value={form.name || ""} onChange={handleChange} required />
          </label>
          <label>Email
            <input type="email" name="email" value={form.email || ""} onChange={handleChange} required />
          </label>
          <label>Phone
            <input name="phone" value={form.phone || ""} onChange={handleChange} required />
          </label>
          <label>Message
            <textarea name="message" value={form.message || ""} onChange={handleChange} rows={4} />
          </label>

          {error && <p className={styles.error}>{error}</p>}
          {status === "success" && <p className={styles.success}>Appointment successfully booked!</p>}
          {confirmation && <p className={styles.confirmation}>{confirmation}</p>}

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Book Appointment"}
          </button>
        </form>

        {user && <Feedback userId={user.id} token={jwt} />}
      </div>

      {/* Right: History */}
      <div className={styles.right}>
        <h3>Selected Slot</h3>
        <p>{selectedSlot ? new Date(selectedSlot.date).toLocaleString() : "No slot selected"}</p>

        <button onClick={toggleHistory} className={styles.formButton}>
          {showHistory ? "Hide Appointment History" : "Show Appointment History"}
        </button>

        {showHistory && (
          <div className={styles.bookingHistory}>
            <h4>Your Appointments</h4>
            {bookings.length === 0 ? <p>No appointments yet.</p> : (
              <ul>
                {bookings.map((b) => {
                  const slotDate = new Date(b.attributes.appointment_slot);
                  const isPast = slotDate < new Date();
                  return (
                    <li key={b.id} style={{ color: isPast ? "red" : "green" }}>
                      {slotDate.toLocaleString()} - {b.attributes.category || "No Type"}
                      {!isPast && (
                        <button onClick={() => handleCancel(b.id)} style={{ marginLeft: "10px", backgroundColor: "#ff4d4f", color: "#fff", border: "none", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" }}>
                          Cancel
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
