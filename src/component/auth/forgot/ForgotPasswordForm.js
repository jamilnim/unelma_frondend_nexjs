"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./forgotPassword.module.css";

export default function ForgotPasswordForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Reset email sent!");
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Forget Password ?</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit" className={styles.sendBtn}>
          Send Reset Mail
        </button>
      </form>
    </div>
  );
}
