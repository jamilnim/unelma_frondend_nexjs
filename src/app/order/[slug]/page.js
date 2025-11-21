"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LoginForm from "../../../component/auth/login/LoginForm";
import { jsPDF } from "jspdf";
import styles from "./orderPage.module.css";

export default function OrderPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const plan = searchParams?.get("plan") || "Business"; // Default plan
  const router = useRouter();
  const user = useSelector((state) => state.user?.user);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false); // Show login form if not logged in
      return;
    }

    const loadService = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/service-categories?populate=*`
        );
        const data = await res.json();

        const fetched = (data?.data || []).map((item) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          category: item.category,
          priceBusiness: item.priceBusiness || 0,
          priceProfessional: item.priceProfessional || 0,
        }));

        const found = fetched.find(
          (s) => s.slug?.trim().toLowerCase() === slug?.trim().toLowerCase()
        );
        setService(found || null);
      } catch (err) {
        console.error("Error fetching service:", err);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [slug, user]);

  if (loading) return <p className={styles.message}>Loading...</p>;

  if (!user) {
    return (
      <div className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Login to continue</h2>
        <LoginForm />
      </div>
    );
  }

  if (!service) return <p>Service not found.</p>;

  // Pick price based on selected plan
  const planPrice =
    plan === "Business" ? service.priceBusiness : service.priceProfessional;

  const handlePlaceOrder = async () => {
    if (!service) return;

    const invoiceNumber = `ORD-${Date.now()}`;
    setPlacing(true);

    try {
      // Create order in Strapi
      const payload = {
        data: {
          userName: user.username || user.name || user.email,
          userEmail: user.email,
          serviceName: service.name,
          category: service.category,
          plan,
          price: planPrice,
          invoiceNumber,
          orderstatus: "pending",
        },
      };

      const res = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      const createdOrder = json?.data;

      // Generate PDF invoice
      const doc = new jsPDF({ unit: "pt" });
      doc.setFontSize(18);
      doc.text("Invoice", 40, 50);
      doc.setFontSize(12);
      doc.text(`Invoice #: ${invoiceNumber}`, 40, 90);
      doc.text(`Date: ${new Date().toLocaleString()}`, 40, 110);
      doc.text(`Billed to: ${user.username || user.email}`, 40, 130);
      doc.text(`Service: ${service.name}`, 40, 160);
      doc.text(`Category: ${service.category}`, 40, 180);
      doc.text(`Plan: ${plan}`, 40, 200);
      doc.text(`Price: $${planPrice}`, 40, 220);
      doc.text(`Total: $${planPrice}`, 40, 240);
      doc.save(`invoice-${invoiceNumber}.pdf`);

      router.push(`/order-success?orderId=${createdOrder.id}`);
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order. Check console for details.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        ← Back
      </button>

      <h1 className={styles.title}>Order Confirmation</h1>

      <p className={styles.row}>
        <span className={styles.label}>Service:</span> {service.name}
      </p>
      <p className={styles.row}>
        <span className={styles.label}>Category:</span> {service.category}
      </p>
      <p className={styles.row}>
        <span className={styles.label}>Plan:</span> {plan}
      </p>
      <p className={styles.row}>
        <span className={styles.label}>Price:</span> ${planPrice}
      </p>
      <p className={styles.row}>
        <span className={styles.label}>User:</span>{" "}
        {user.username || user.email}
      </p>

      <button
        className={styles.orderBtn}
        onClick={handlePlaceOrder}
        disabled={placing}
      >
        {placing ? "Placing order…" : "Place Order"}
      </button>
    </div>
  );
}
