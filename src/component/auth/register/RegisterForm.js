"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../lib/features/auth/authSlice";
import styles from "./registerForm.module.css";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser({ ...form, role: "user" })); // role=user
    if (res.payload?.user) router.push("/dashboard"); // redirect after successful registration
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={form.username}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}