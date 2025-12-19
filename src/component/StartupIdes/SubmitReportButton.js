"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./Builder.module.css";

export default function SubmitReportButton() {
  const { mother, userInfo } = useSelector((state) => state.builder);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      // Prepare safe payload for Strapi
      const payload = {
        data: {
          name: userInfo.name || "",
          email: userInfo.email || "",
          contact: userInfo.contact || "",
          message: userInfo.message || "",

          industry: mother.industry || "",
          user: mother.user || "",
          problem: mother.problem || "",
          time: mother.time || "",
          solution: mother.solution || "",
          budget: mother.budget || "",
        },
      };

      console.log("Submitting to backend:", payload);

      const res = await fetch("http://localhost:1337/api/idea-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) throw new Error(JSON.stringify(data));

      setSuccess(true);
    } catch (err) {
      console.error("Failed to save report:", err);
      setError("Something went wrong while saving the report. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.submitWrap}>
      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit Report"}
      </button>

      {success && (
        <p className={styles.successMsg}>✅ Report saved successfully!</p>
      )}
      {error && <p className={styles.errorMsg}>❌ {error}</p>}
    </div>
  );
}
