"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../lib/features/auth/authSlice";
import styles from "./loginForm.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect"); // grab redirect from URL
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    identifier: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      loginUser({
        identifier: form.identifier,
        password: form.password,
      })
    );

    if (res.payload?.user) {
      const role = res.payload.user.role?.name.toLowerCase();

      // If redirect exists, go there. Otherwise, go by role.
      if (redirect) {
        router.push(redirect);
      } else if (role === "admin" || role === "frontend admin") {
        router.push("/admin-panel");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Login To Your Account</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="identifier"
          placeholder="Username"
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

        <div className={styles.row}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>

          <a href="/forgot-password" className={styles.forgot}>
            Forgot Password?
          </a>
        </div>

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.registerText}>
        Don’t have an account? <a href="/register">Create New Account</a>
      </p>
    </div>
  );
}
