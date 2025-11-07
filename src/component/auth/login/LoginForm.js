"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../lib/features/auth/authSlice";
import styles from "./loginForm.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.payload?.user) {
      // Check role from Strapi
      const role = res.payload.user.role?.name.toLowerCase();
      if (role === "admin" || role === "frontend admin") {
        router.push("/admin-panel");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="identifier"
        placeholder="Username or Email"
        value={form.identifier}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}