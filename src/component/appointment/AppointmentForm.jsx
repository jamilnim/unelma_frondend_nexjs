"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createAppointment, reset } from "../../lib/features/appointments/appointmentsSlice";
import styles from "./appointment.module.css";

export default function AppointmentForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);
  const appointmentState = useSelector((state) => state.appointments);

  const [selectedDate, setSelectedDate] = useState("2025-11-20");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

  // Reset state and show success
  useEffect(() => {
    if (appointmentState.success) {
      setConfirmed({ date: selectedDate, time: selectedTime });
      setPhone("");
      setMessage("");
      dispatch(reset());
    }
  }, [appointmentState.success, dispatch, selectedDate, selectedTime]);

  const handleBooking = (e) => {
    e.preventDefault();

    if (!user) {
      // Redirect to login with redirect back to appointment
      router.push("/login?redirect=/appointment/introduction-meeting");
      return;
    }

    dispatch(
      createAppointment({
        name: user.username,
        email: user.email,
        phone,
        message,
        date: selectedDate,
        time: selectedTime,
      })
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Your Appointment</h1>

      {/* Side-by-side Cards for Date & Time */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Select Date</h2>
          <input
            className={styles.dateInput}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className={styles.card}>
          <h2>Select Time Slot</h2>
          <div className={styles.timeSlots}>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`${styles.timeSlot} ${selectedTime === slot ? styles.selected : ""}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Form or Login Button */}
      <div className={styles.card}>
        {!user ? (
          <button
            className={styles.formButton}
            onClick={() => router.push("/login?redirect=/appointment/introduction-meeting")}
          >
            Login to Book
          </button>
        ) : (
          <>
            <h2>Your Request</h2>
            <form onSubmit={handleBooking} className={styles.form}>
              <input
                className={styles.formInput}
                type="text"
                value={user.username}
                readOnly
                placeholder="Name"
              />
              <input
                className={styles.formInput}
                type="email"
                value={user.email}
                readOnly
                placeholder="Email"
              />
              <input
                className={styles.formInput}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
              />
              <textarea
                className={styles.formTextarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                required
              />
              <button
                className={styles.formButton}
                type="submit"
                disabled={appointmentState.loading}
              >
                {appointmentState.loading ? "Booking..." : "Book Appointment"}
              </button>
              {appointmentState.error && <p className={styles.error}>{appointmentState.error}</p>}
            </form>
          </>
        )}
      </div>

      {/* Confirmed Slot */}
      {confirmed && (
        <div className={styles.confirmedSlot}>
          <span className={styles.checkmark}>✔</span>
          <span>
            Your appointment is booked for {confirmed.date} at {confirmed.time}:00
          </span>
        </div>
      )}

      {/* How it Works */}
      <div className={styles.guideBox}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepDescription}>Pick your preferred date from the calendar.</div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepDescription}>Select an available time slot.</div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepDescription}>Fill your contact details (name & email pre-filled).</div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepDescription}>Receive confirmation via email after booking.</div>
        </div>
      </div>
    </div>
  );
}






// "use client";

// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { createAppointment, reset } from "../../lib/features/appointments/appointmentsSlice";
// import styles from "./appointment.module.css";

// export default function AppointmentForm() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { user } = useSelector((state) => state.auth);
//   const appointmentState = useSelector((state) => state.appointments);

//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date().toISOString().split("T")[0];
//     return today;
//   });
//   const [selectedTime, setSelectedTime] = useState("09:00");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [confirmed, setConfirmed] = useState(null);

//   const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

//   // Mock: Already booked slots (replace with API call)
//   const [bookedSlots, setBookedSlots] = useState([
//     // Example: { date: "2025-11-20", time: "09:00" }
//   ]);

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!user) router.push("/login?redirect=/appointment/introduction-meeting");
//   }, [user, router]);

//   // Reset state and show success
//   useEffect(() => {
//     if (appointmentState.success) {
//       setConfirmed({ date: selectedDate, time: selectedTime });
//       setPhone("");
//       setMessage("");
//       dispatch(reset());
//     }
//   }, [appointmentState.success, dispatch, selectedDate, selectedTime]);

//   // Filter time slots: remove past times & booked slots
//   const getAvailableSlots = () => {
//     const now = new Date();
//     return timeSlots.filter((slot) => {
//       const slotDateTime = new Date(`${selectedDate}T${slot}:00`);
//       const isPast = slotDateTime < now;
//       const isBooked = bookedSlots.some(
//         (b) => b.date === selectedDate && b.time === slot
//       );
//       return !isPast && !isBooked;
//     });
//   };

//   const handleBooking = (e) => {
//     e.preventDefault();
//     if (!user) return;

//     const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
//     if (appointmentDateTime < new Date()) {
//       alert("Cannot book an appointment in the past.");
//       return;
//     }

//     dispatch(
//       createAppointment({
//         name: user.username,
//         email: user.email,
//         phone,
//         message,
//         date: selectedDate,
//         time: selectedTime,
//       })
//     );
//   };

//   const availableSlots = getAvailableSlots();

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Book Your Appointment</h1>

//       <div className={styles.grid}>
//         <div className={styles.card}>
//           <h2>Select Date</h2>
//           <input
//             className={styles.dateInput}
//             type="date"
//             value={selectedDate}
//             min={new Date().toISOString().split("T")[0]} // disable past dates
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>

//         <div className={styles.card}>
//           <h2>Select Time Slot</h2>
//           <div className={styles.timeSlots}>
//             {timeSlots.map((slot) => {
//               const isDisabled = !availableSlots.includes(slot);
//               return (
//                 <button
//                   key={slot}
//                   type="button"
//                   className={`${styles.timeSlot} ${selectedTime === slot ? styles.selected : ""}`}
//                   onClick={() => setSelectedTime(slot)}
//                   disabled={isDisabled}
//                 >
//                   {slot} {isDisabled && "(Unavailable)"}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className={styles.card}>
//         <h2>Your Request</h2>
//         <form onSubmit={handleBooking} className={styles.form}>
//           <input
//             className={styles.formInput}
//             type="text"
//             value={user?.username || ""}
//             readOnly
//             placeholder="Name"
//           />
//           <input
//             className={styles.formInput}
//             type="email"
//             value={user?.email || ""}
//             readOnly
//             placeholder="Email"
//           />
//           <input
//             className={styles.formInput}
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Phone"
//             required
//           />
//           <textarea
//             className={styles.formTextarea}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Message"
//             required
//           />
//           <button
//             className={styles.formButton}
//             type="submit"
//             disabled={appointmentState.loading}
//           >
//             {appointmentState.loading ? "Booking..." : "Book Appointment"}
//           </button>
//           {appointmentState.error && <p className={styles.error}>{appointmentState.error}</p>}
//         </form>
//       </div>

//       {confirmed && (
//         <div className={styles.confirmedSlot}>
//           <span className={styles.checkmark}>✔</span>
//           <span>
//             Your appointment is booked for {confirmed.date} at {confirmed.time}:00
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }
