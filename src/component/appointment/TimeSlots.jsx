"use client";

import styles from "./appointment.module.css";

export default function TimeSlots({ slots, selectedSlot, selectSlot }) {
  return (
    <div className={styles.slotsBox}>
      {slots.length === 0 ? (
        <p>No slots available</p>
      ) : (
        slots.map((slot) => {
          const dateObj = new Date(slot.date);
          const display = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          return (
            <button
              key={slot.id}
              disabled={slot.booked}
              className={`${styles.slotButton} ${selectedSlot?.id === slot.id ? styles.selected : ""}`}
              onClick={() => selectSlot(slot)}
              style={{ cursor: slot.booked ? "not-allowed" : "pointer", opacity: slot.booked ? 0.5 : 1 }}
            >
              {display} {slot.booked ? "(Booked)" : ""}
            </button>
          );
        })
      )}
    </div>
  );
}
