"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./order.module.css";

export default function OrderInformation() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.user.user);

  // Get query params
  const planParam = searchParams.get("plan") || "Business";
  const priceParam =
    Number(searchParams.get("price")) ||
    (planParam === "Professional" ? 199 : 99);
  const serviceName = searchParams.get("serviceName") || slug;

  const redirectUrl = `/services/order/${slug}?plan=${planParam}&serviceName=${encodeURIComponent(
    serviceName
  )}&price=${priceParam}`;

  // Redirect if user not logged in
  useEffect(() => {
    if (user === null) {
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [user]);

  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    serviceName,
    price: priceParam,
    orderstatus: "pending", // Must match ENUM: "pending" or "paid"
    category: "Mobile Apps", // Default ENUM value
    plan: planParam, // "Business" or "Professional"
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create unique invoice number
      const invoiceNumber = `ORD-${Date.now()}`;

      // Prepare payload matching Strapi schema
      const payload = {
        data: {
          ...form,
          invoiceNumber,
        },
      };

      const res = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data?.data?.id) {
        // Redirect to confirmation page
        router.push(`/services/order/confirm/${data.data.id}`);
      } else {
        console.error("Strapi error:", data);
        alert("Failed to place order. Check console for details.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Error placing order");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return <p>Checking login...</p>;

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => router.push(`/services/${slug}`)}
      >
        ← Back to Service
      </button>

      <h1 className={styles.title}>Complete Your Order</h1>

      <div className={styles.wrapper}>
        {/* FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            name="userName"
            value={form.userName}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="userEmail"
            type="email"
            value={form.userEmail}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="Mobile Apps">Mobile Apps</option>
            <option value="UX/UI Design">UX/UI Design</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Web Design">Web Design</option>
          </select>

          <label>Plan</label>
          <select
            name="plan"
            value={form.plan}
            onChange={handleChange}
            required
          >
            <option value="Business">Business</option>
            <option value="Professional">Professional</option>
          </select>

          <button className={styles.submit} disabled={submitting}>
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* SUMMARY */}
        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <p>
            <strong>Service:</strong> {serviceName}
          </p>
          <p>
            <strong>Plan:</strong> {form.plan}
          </p>
          <p>
            <strong>Price:</strong> ${priceParam}
          </p>
          <p>
            <strong>Category:</strong> {form.category}
          </p>
          <p>
            <strong>Status:</strong> Pending
          </p>
        </div>
      </div>
    </div>
  );
}
