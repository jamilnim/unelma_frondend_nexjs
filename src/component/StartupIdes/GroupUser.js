"use client";
import DraggableCard from "./DraggableCard";
import styles from "./Builder.module.css";

const users = [
  { id: "students", label: "Students" },
  { id: "freelancers", label: "Freelancers" },
  { id: "small-business", label: "Small Businesses" },
  { id: "enterprise", label: "Enterprises" },
];

export default function GroupUser() {
  return (
      <div className={styles.cardwrapper}>
    <div className={styles.optioncard}>
      <h4>Target User</h4>
      {users.map((u) => (
        <DraggableCard
          key={u.id}
          id={`user-${u.id}`}
          group="user"
          value={u.label}
          label={u.label}
        />
      ))}
    </div>
    </div>
  );
}
