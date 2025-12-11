"use client";

import { useState } from "react";
import styles from "./ApplicationForm.module.css";

export default function ApplicationForm({ jobId }) {
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [fileError, setFileError] = useState("");

  const validateFile = (file) => {
    if (!file) return "Resume file is required.";

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) return "Resume must be less than 5MB.";

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      return "Only PDF, DOC, or DOCX files are allowed.";
    }

    return null;
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFileError("");

    const form = e.currentTarget;
    const applicantName = form.applicantName.value.trim();
    const applicantEmail = form.applicantEmail.value.trim();
    const coverLetter = form.coverLetter.value.trim();
    const resumeFile = form.resume.files[0];

    // Validate resume file
    const errMsg = validateFile(resumeFile);
    if (errMsg) {
      setFileError(errMsg);
      setStatus("idle");
      return;
    }

    // Build payload
    const payload = new FormData();
    payload.append(
      "data",
      JSON.stringify({
        applicantName,
        applicantEmail,
        coverLetter,
        job_postings: [jobId], // manyWay → MUST BE ARRAY
      })
    );
    payload.append("files.resume", resumeFile);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });

      const json = await res.json();

      if (!res.ok || json?.success === false) {
        throw new Error(json?.error || "Submission failed");
      }

      showToast("success", "Application submitted successfully!");
      form.reset();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className={styles.card} id="apply-now">
      {toast.show && (
        <div
          className={`${styles.toast} ${
            toast.type === "error" ? styles.toastError : styles.toastSuccess
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      <h2 className={styles.heading}>Apply Now</h2>
      <p className={styles.lead}>We carefully review every application.</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.row}>
          <label className={styles.field}>
            <span>Full Name *</span>
            <input type="text" name="applicantName" required />
          </label>

          <label className={styles.field}>
            <span>Email *</span>
            <input type="email" name="applicantEmail" required />
          </label>
        </div>

        <label className={styles.field}>
          <span>Resume (PDF/DOC) *</span>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            required
            onChange={(e) => {
              const msg = validateFile(e.target.files[0]);
              setFileError(msg || "");
            }}
            className={fileError ? styles.inputError : ""}
          />
          {fileError && <span className={styles.fieldError}>{fileError}</span>}
        </label>

        <label className={styles.field}>
          <span>Cover Letter (Optional)</span>
          <textarea name="coverLetter" rows={5} />
        </label>

        <button className={styles.submit} disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
