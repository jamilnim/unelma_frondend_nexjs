"use client";
import DraggableCard from "./DraggableCard";
import styles from "./Builder.module.css"

const industries = [
  { id: "fintech", label: "FinTech" },
  { id: "healthtech", label: "HealthTech" },
  { id: "edtech", label: "EdTech" },
  { id: "ai-saas", label: "AI SaaS" },
];

export default function GroupIndustry() {
  return (
     <div className={styles.cardwrapper}>
    <div className={styles.optioncard}>
      <h4>Industry</h4>
      {industries.map((i) => (
        <DraggableCard
          key={i.id}
          id={`industry-${i.id}`}
          group="industry"
          value={i.label}
          label={i.label}
        />
      ))}
    </div>
    </div>
  );
}
