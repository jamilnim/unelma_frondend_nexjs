"use client";

import { useState } from "react";
import DraggableCard from "./DraggableCard";
import styles from "./Builder.module.css";

const DEFAULT_SOLUTIONS = [
  "AI automation",
  "Mobile app",
  "Web platform",
  "Marketplace model",
];

export default function GroupSolution() {
  const [customSolutions, setCustomSolutions] = useState([]);
  const [input, setInput] = useState("");
 

  const addSolution = () => {
    if (!input.trim()) return;
    setCustomSolutions([...customSolutions, input.trim()]);
    setInput("");
  };

  return (
    <div className={styles.cardwrapper}>
    <div className={styles.optioncard}>
      <h4>Expected Solution</h4>

      {DEFAULT_SOLUTIONS.map(s => (
        <DraggableCard
          key={s}
          id={`solution-${s}`}
          group="solution"
          value={s}
          label={s}
        />
      ))}

      {customSolutions.map(s => (
        <DraggableCard
          key={`custom-${s}`}
          id={`solution-custom-${s}`}
          group="solution"
          value={s}
          label={s}
        />
      ))}

      <div style={{ marginTop: "8px" }}>
        <input
          placeholder="Other solution"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") addSolution();
          }}
        />
        
      </div>
    </div>
    </div>
    
  );
}
