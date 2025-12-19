"use client";

import { useState } from "react";
import DraggableCard from "./DraggableCard";
import styles from "./Builder.module.css";

const DEFAULT_PROBLEMS = [
  { id: "high-cost", label: "High Cost" },
  { id: "manual-process", label: "Manual Process" },
  { id: "low-transparency", label: "Low Transparency" },
  { id: "poor-scalability", label: "Poor Scalability" },
];

export default function GroupProblem() {
  const [customProblems, setCustomProblems] = useState([]);
  const [input, setInput] = useState("");

  const addProblem = () => {
    if (!input.trim()) return;
    setCustomProblems([...customProblems, input.trim()]);
    setInput("");
  };

  return (
    <div className={styles.cardwrapper}>
      <div className={styles.optioncard}>
        <h4>Problem</h4>

        {DEFAULT_PROBLEMS.map((p) => (
          <DraggableCard
            key={p.id}
            id={`problem-${p.id}`}
            group="problem"
            value={p.label}
            label={p.label}
          />
        ))}

        {customProblems.map((p) => (
          <DraggableCard
            key={`custom-${p}`}
            id={`problem-custom-${p}`}
            group="problem"
            value={p}
            label={p}
          />
        ))}

        <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
          <input
            type="text"
            placeholder="Other Problem"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "6px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addProblem();
            }}
          />
          <br/>
        </div>
      </div>
    </div>
  );
}
