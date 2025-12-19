// src/components/StartupIdeas/DraggableCard.jsx
"use client";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableCard({ id, group, value, label }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { group, value },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "8px",
        margin: "6px 0",
        border: "1px solid #ccc",
        borderRadius: "6px",
        cursor: "grab",
        backgroundColor: "#f9f9f9",
      }}
    >
      {label}
    </div>
  );
}
