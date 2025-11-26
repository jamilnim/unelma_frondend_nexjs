"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../lib/features/auth/authSlice";
import styles from "./loginForm.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginFromInquiry, setLoginFromInquiry] = useState(false);
  const [loginForCart, setLoginForCart] = useState(false);
  const [cartRedirectSlug, setCartRedirectSlug] = useState(null);

  useEffect(() => {
    const inquiryFlag = sessionStorage.getItem("loginFromInquiry") === "true";
    const cartFlag = sessionStorage.getItem("loginForCart") === "true";
    const redirectSlug = sessionStorage.getItem("cartRedirectSlug");

    if (inquiryFlag) setLoginFromInquiry(true);
    if (cartFlag && redirectSlug) {
      setLoginForCart(true);
      setCartRedirectSlug(redirectSlug);
    }
  }, []);

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
      // Handle redirects based on session flags
      if (loginFromInquiry) {
        sessionStorage.setItem("loginFromInquiry", "false");
        router.push("/inquiry");
      } else if (loginForCart && cartRedirectSlug) {
        sessionStorage.setItem("loginForCart", "false");
        sessionStorage.removeItem("cartRedirectSlug");

        // Redirect to correct product detail page
        router.push(`/productPage/${cartRedirectSlug}`);
      } else {
        const role = res.payload.user.role?.name?.toLowerCase();
        if (role === "admin" || role === "frontend admin") {
          router.push("/admin-panel");
        } else {
          router.push("/dashboard");
        }
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
