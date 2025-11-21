"use client";
import LoginForm from "../../component/auth/login/LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
