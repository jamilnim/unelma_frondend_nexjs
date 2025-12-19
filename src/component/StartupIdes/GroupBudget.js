"use client";
import DraggableCard from "./DraggableCard";
import styles from "./Builder.module.css"

const budgets = [
  { id: "1-5k", label: "€1k – €5k" },
  { id: "5-20k", label: "€5k – €20k" },
  { id: "20-50k", label: "€20k – €50k" },
  { id: "50k+", label: "€50k+" },
];

export default function GroupBudget() {
  return (
    <div className={styles.cardwrapper}>

   
    <div className={styles.optioncard}>
      <h4>Budget Range</h4>
      {budgets.map((b) => (
        <DraggableCard
          key={b.id}
          id={`budget-${b.id}`}
          group="budget"
          value={b.label}
          label={b.label}
        />
      ))}
    </div>
    </div>
  );
 
}
