"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createAppointment, reset } from "../../lib/features/appointments/appointmentsSlice";
import styles from "./appointment.module.css";

export default function AppointmentForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, jwt } = useSelector((state) => state.auth);
  const appointmentState = useSelector((state) => state.appointments);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

  // Fetch booking history
  useEffect(() => {
    if (!user || !jwt) return;
    fetch(`http://localhost:1337/api/appointments?filters[users_permissions_user][id][$eq]=${user.id}&sort=appointment_slot:asc`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(res => res.json())
      .then(data => setBookings(data.data || []))
      .catch(err => console.error(err));
  }, [user, jwt]);

  // Refresh after booking
  useEffect(() => {
    if (appointmentState.success) {
      setConfirmed({ date: selectedDate, time: selectedTime });
      setPhone("");
      setMessage("");
      dispatch(reset());
      setBookings(prev => [...prev, { id: Date.now(), attributes: { appointment_slot: `${selectedDate}T${selectedTime}:00`, status: "Pending" } }]);
    }
  }, [appointmentState.success, dispatch, selectedDate, selectedTime]);

  // ✅ Auto-hide confirmation after 5 seconds
  useEffect(() => {
    if (!confirmed) return;
    const timer = setTimeout(() => setConfirmed(null), 5000);
    return () => clearTimeout(timer);
  }, [confirmed]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!user) return router.push("/login?redirect=/appointment");

    dispatch(createAppointment({
      name: user.username,
      email: user.email,
      phone,
      message,
      date: selectedDate,
      time: selectedTime,
    }));
  };

  const handleCancel = async (appointmentId) => {
    if (!jwt) return alert("Not authorized");
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const res = await fetch(`http://localhost:1337/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error("Failed to cancel appointment");
      setBookings(prev => prev.filter(b => b.id !== appointmentId));
      alert("Appointment cancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Error cancelling appointment: " + err.message);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const availableSlots = timeSlots.filter(slot => new Date(`${selectedDate}T${slot}:00`) > new Date());

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Your Appointment</h1>

      <div className={styles.grid}>
        <div className={styles.card1}>
          <h2>Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            min={todayStr}
            onChange={e => setSelectedDate(e.target.value)}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.card2}>
          <h2>Select Time Slot</h2>
          <div className={styles.timeSlots}>
            {timeSlots.map(slot => (
              <button
                key={slot}
                type="button"
                className={`${styles.timeSlot} ${selectedTime === slot ? styles.selected : ""}`}
                onClick={() => setSelectedTime(slot)}
                disabled={!availableSlots.includes(slot)}
              >
                {slot} {!availableSlots.includes(slot) && "(Unavailable)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        {!user ? (
          <button className={styles.formButton} onClick={() => router.push("/login?redirect=/appointment")}>
            Login to Book
          </button>
        ) : (
          <form onSubmit={handleBooking} className={styles.form}>
            <input type="text" value={user.username} readOnly placeholder="Name" className={styles.formInput} />
            <input type="email" value={user.email} readOnly placeholder="Email" className={styles.formInput} />
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" required className={styles.formInput} />
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" required className={styles.formTextarea} />
            <button type="submit" className={styles.formButton} disabled={appointmentState.loading}>
              {appointmentState.loading ? "Booking..." : "Book Appointment"}
            </button>
            {appointmentState.error && <p className={styles.error}>{appointmentState.error}</p>}
          </form>
        )}
      </div>

      {confirmed && (
        <div className={styles.confirmedSlot}>
          <span className={styles.checkmark}>✔</span>
          <span>Your appointment is booked for {confirmed.date} at {confirmed.time}:00</span>
        </div>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => setShowHistory(prev => !prev)} className={styles.formButton}>
          {showHistory ? "Hide Appointment History" : "Show Appointment History"}
        </button>
      </div>

      {showHistory && (
        <div className={styles.bookingHistory}>
          <h4>Your Appointments</h4>
          {bookings.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            <ul>
              {bookings.map(b => {
                const slotDate = new Date(b.attributes.appointment_slot);
                const isPast = slotDate < new Date();
                return (
                  <li key={b.id} style={{ color: isPast ? "red" : "green" }}>
                    {slotDate.toLocaleString()} - {b.attributes.status || "Pending"} {isPast && "(Past)"}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
