"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import styles from "./confirm.module.css";

export default function ConfirmOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `http://localhost:1337/api/orders/${id}?populate=*`
        );
        const data = await res.json();
        console.log("Order API response:", data);

        if (!data?.data?.attributes) {
          setError("Order not found.");
        } else {
          setOrder(data.data.attributes);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Error fetching order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const downloadPDF = () => {
    if (!order) return;

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Order Confirmation", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Order ID: ${id}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 40);

    let y = 55;
    const lineHeight = 10;

    const details = [
      ["Name", order.userName],
      ["Email", order.userEmail],
      ["Service", order.serviceName],
      ["Plan", order.plan],
      ["Price", `$${order.price}`],
      ["Payment Method", order.paymentMethod || "N/A"],
      ["Status", order.orderstatus],
      ["Category", order.category],
    ];

    details.forEach(([label, value]) => {
      doc.text(`${label}:`, 20, y);
      doc.text(`${value}`, 70, y);
      y += lineHeight;
    });

    doc.line(20, y + 2, 190, y + 2);
    doc.setFontSize(16);
    doc.text("Thank you for your order!", 105, y + 15, null, null, "center");

    doc.save(`Order_${id}.pdf`);
  };

  if (loading) return <p className="text-center mt-10">Loading order...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Order Confirmed 🎉</h1>
        <p className={styles.subtitle}>
          Your order ID is: <strong>{id}</strong>
        </p>

        <div className={styles.grid}>
          <div className={styles.cardItem}>
            <p className={styles.label}>Name</p>
            <p className={styles.value}>{order.userName}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{order.userEmail}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.label}>Service</p>
            <p className={styles.value}>{order.serviceName}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.label}>Plan</p>
            <p className={styles.value}>{order.plan}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.label}>Price</p>
            <p className={styles.value}>${order.price}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.label}>Payment Method</p>
            <p className={styles.value}>{order.paymentMethod || "N/A"}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.label}>Status</p>
            <p className={styles.value}>{order.orderstatus}</p>
          </div>
          <div className={styles.cardItem}>
            <p className={styles.label}>Category</p>
            <p className={styles.value}>{order.category}</p>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={downloadPDF}
          >
            Download PDF
          </button>
          <a href="/" className={`${styles.button} ${styles.secondary}`}>
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
