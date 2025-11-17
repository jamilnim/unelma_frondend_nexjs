"use client";
import { useEffect, useState } from "react";

export default function Feedback({ userId, token }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !token) return;

    async function fetchFeedback() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:1337/api/appointments?filters[users_permissions_user][id][$eq]=${userId}&populate=feedback`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();

        const userFeedbacks = (json.data ?? [])
          .map((appt) => appt.attributes?.feedback)
          .filter(Boolean);
        setFeedbacks(userFeedbacks);
      } catch (err) {
        console.error("Failed to load feedback", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, [userId, token]);

  if (loading) return <p>Loading feedback…</p>;
  if (!feedbacks || feedbacks.length === 0) return <p>No feedback yet.</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Feedback from Admin</h3>
      <ul>
        {feedbacks.map((f, idx) => (
          <li key={idx} style={{ marginBottom: "12px", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}>
            {f?.message || f?.notes || "No details provided"}
          </li>
        ))}
      </ul>
    </div>
  );
}
