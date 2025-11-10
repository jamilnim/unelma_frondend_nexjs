import React from "react";
import "./highlight.css";

function Hightlight() {
  const stats = [
    { value: "1M+", label: "Users Engaged through Custom Platform Solutions" },
    { value: "3M+", label: "App & Platform Downloads Worldwide." },
    { value: "#1", label: "Rated Digital Wallet Platform in Nepal" },
    {
      value: "Full-Spectrum Tech Expertise:",
      label: "Cybersecurity • Data Science • AI • Cloud • Web & Mobile.",
    },
    {
      value: "Global Footprint",
      label: "Presence in Asia, EU & North America",
    },
  ];

  return (
    <section className="exp-section">
      <h2 className="exp-title"></h2>
      <div className="exp-grid">
        {stats.map((stat, i) => (
          <div key={i} className="exp-box">
            <div className="exp-value">{stat.value}</div>
            <div className="exp-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hightlight;
