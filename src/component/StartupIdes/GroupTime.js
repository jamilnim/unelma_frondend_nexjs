"use client";
import DraggableCard from "./DraggableCard";
import styles from "./Builder.module.css";

const times = [
  { id: "urgent", label: "Urgent (0–3 months)" },
  { id: "medium", label: "Medium (3–12 months)" },
  { id: "long-term", label: "Long Term (1+ year)" },
];

export default function GroupTime() {
  return (
    <div className={styles.cardwrapper}>
    <div className={styles.optioncard}>
      <h4>Time to Solve</h4>
      {times.map((t) => (
        <DraggableCard
          key={t.id}
          id={`time-${t.id}`}
          group="time"
          value={t.label}
          label={t.label}
        />
      ))}
    </div>
    </div>
  );
}
