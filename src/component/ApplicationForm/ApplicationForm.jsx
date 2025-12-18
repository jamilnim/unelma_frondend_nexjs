"use client";

import { useState } from "react";
import styles from "./ApplicationForm.module.css";

export default function ApplicationForm({ jobId }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fileError, setFileError] = useState("");

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const validateFile = (file) => {
    if (!file) return "Resume file is required.";
    if (file.size > 5 * 1024 * 1024) return "File must be under 5MB.";

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      return "Only PDF, DOC, or DOCX allowed.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFileError("");

    const form = e.currentTarget;

    const resumeFile = form.resume.files[0];
    const err = validateFile(resumeFile);
    if (err) {
      setFileError(err);
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append(
      "data",
      JSON.stringify({
        applicantName: form.applicantName.value.trim(),
        applicantEmail: form.applicantEmail.value.trim(),
        coverLetter: form.coverLetter.value.trim(),
        aboutYourself: form.aboutYourself.value.trim(),
        jobId,
      })
    );
    payload.append("files.resume", resumeFile);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });

      const json = await res.json();

      if (!res.ok || json.success === false) {
        throw new Error(json.error || "Submission failed");
      }

      showToast("success", "Application submitted successfully!");
      form.reset();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!jobId) {
    return <p className={styles.error}>Job ID missing. Cannot apply.</p>;
  }

  return (
    <div className={styles.card} id="apply-now">
      <div className={styles.accent} aria-hidden="true" />
      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === "error" ? styles.toastError : styles.toastSuccess
          }`}
          role="status"
        >
          {toast.message}
        </div>
      )}

      <div className={styles.header}>
        <p className={styles.eyebrow}>Job application</p>
        <h2 className={styles.heading}>Ready to join the team?</h2>
        <p className={styles.lead}>
          Tell us about yourself and attach your resume. We review every
          application carefully.
        </p>
        <div className={styles.badges}>
          <span className={styles.badge}>3–5 day response</span>
          <span className={styles.badge}>Secure upload</span>
          <span className={styles.badge}>Human-reviewed</span>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>
              Full name <span className={styles.required}>*</span>
            </span>
            <input
              name="applicantName"
              placeholder="Alex Doe"
              required
              autoComplete="name"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>
              Email <span className={styles.required}>*</span>
            </span>
            <input
              name="applicantEmail"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
        </div>

        <label className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label}>About you</span>
            <span className={styles.hint}>
              Share your strengths in 2–3 sentences.
            </span>
          </div>
          <textarea
            name="aboutYourself"
            rows={4}
            placeholder="I thrive at the intersection of design and engineering..."
          />
        </label>

        <label className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Cover letter</span>
            <span className={styles.hint}>Optional, but helpful context.</span>
          </div>
          <textarea
            name="coverLetter"
            rows={5}
            placeholder="If you'd like, tell us why you're excited about this role."
          />
        </label>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label}>
              Resume <span className={styles.required}>*</span>
            </span>
            <span className={styles.chip}>PDF, DOC, DOCX · Max 5MB</span>
          </div>

          <label
            className={`${styles.upload} ${
              fileError ? styles.inputError : ""
            }`}
          >
            <div className={styles.uploadIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 16v-8m0 0l-3 3m3-3l3 3M6 14v3a2 2 0 002 2h8a2 2 0 002-2v-3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className={styles.uploadText}>
              <p className={styles.uploadTitle}>Drop your file or click to browse</p>
              <p className={styles.hint}>We keep your documents private.</p>
            </div>

            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              onChange={(e) =>
                setFileError(validateFile(e.target.files[0]) || "")
              }
            />
          </label>

          {fileError && <p className={styles.fieldError}>{fileError}</p>}
        </div>

        <div className={styles.formFooter}>
          <p className={styles.assurance}>
            We personally review every application. If the fit looks right,
            you'll hear from us within a few business days.
          </p>
          <button className={styles.submit} disabled={loading}>
            {loading ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              "Submit application"
            )}
            <span className={styles.submitNote}>
              {loading ? "Sending..." : "Takes under a minute"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
