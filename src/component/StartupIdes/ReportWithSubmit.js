// src/components/StartupIdeas/ReportSubmit.jsx
"use client";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ReportSubmit() {
  const { mother, userInfo } = useSelector((state) => state.builder);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:1337/api/idea-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { ...userInfo, ...mother } }),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: "8px 16px", background: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        {loading ? "Saving..." : "Submit Report"}
      </button>
      {success && <p style={{ color: "green" }}>Report saved successfully!</p>}
    </div>
  );
}
