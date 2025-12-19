// MotherBoard.jsx
"use client";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import styles from "./Builder.module.css"; // your CSS file

export default function MotherBoard() {
  const { setNodeRef, isOver } = useDroppable({ id: "mother-board" });
  const mother = useSelector((state) => state.builder.mother);
  const userInfo = useSelector((state) => state.builder.userInfo);

  const filled = Object.values(mother).filter(Boolean).length;
  const percent = Math.round((filled / Object.keys(mother).length) * 100);

  return (
    <div ref={setNodeRef} className={styles.motherBoard}>
      <h2 className={styles.motherTitle}>Mother Card</h2>

      {/* Selected cards as mini cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
        {Object.entries(mother).map(
          ([key, value]) =>
            value && (
              <div key={key} className={styles.card}>
                <b>{key}</b>: {value}
              </div>
            )
        )}
        {!Object.values(mother).some(Boolean) && <p>Drag cards here</p>}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{ background: "#eee", height: "10px", borderRadius: "5px" }}>
          <div
            style={{
              width: `${percent}%`,
              height: "10px",
              background: "#4caf50",
              borderRadius: "5px",
            }}
          />
        </div>
        <p>{percent}% completed</p>
      </div>

      {/* Report preview */}
      <div
        style={{
          marginBottom: "10px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#fafafa",
        }}
      >
        <h3>Report Preview</h3>
        <p>
          <b>Name:</b> {userInfo.name || "—"}
        </p>
        <p>
          <b>Email:</b> {userInfo.email || "—"}
        </p>
        <p>
          <b>Contact:</b> {userInfo.contact || "—"}
        </p>
        {Object.entries(mother).map(
          ([key, value]) => value && <p key={key}><b>{key}:</b> {value}</p>
        )}
      </div>
    </div>
  );
}
