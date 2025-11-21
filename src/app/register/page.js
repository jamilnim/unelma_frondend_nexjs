"use client";
import RegisterForm from "../../component/auth/register/RegisterForm";
import styles from "./register.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
