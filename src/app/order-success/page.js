"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "../order/[slug]/orderPage.module.css";
import { jsPDF } from "jspdf";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const loadOrder = async () => {
      try {
        const res = await fetch(`http://localhost:1337/api/orders/${orderId}`);
        const json = await res.json();
        if (json?.data?.attributes) {
          setOrder({
            id: json.data.id,
            ...json.data.attributes,
          });
        }
      } catch (err) {
        console.error("Fetch order error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const downloadInvoice = () => {
    if (!order) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // Logo
    const logoImg = "/unelma_logi_b77ef09aeb.png"; // Place your logo in /public
    const img = new Image();
    img.src = logoImg;

    img.onload = () => {
      doc.addImage(img, "PNG", 40, 20, 120, 40);

      // Title
      doc.setFontSize(20);
      doc.text("INVOICE", 450, 50, { align: "right" });

      // Invoice details
      doc.setFontSize(12);
      doc.text(`Invoice #: ${order.invoiceNumber || orderId}`, 450, 80, {
        align: "right",
      });
      doc.text(
        `Date: ${new Date(order.createdAt).toLocaleString()}`,
        450,
        100,
        { align: "right" }
      );

      // Billed to
      doc.setFontSize(14);
      doc.text("Billed To:", 40, 100);
      doc.setFontSize(12);
      doc.text(order.userName || order.userEmail, 40, 120);

      // Table
      doc.setFontSize(14);
      doc.text("Order Details", 40, 160);
      doc.setFontSize(12);

      const tableY = 180;
      const colX = [40, 200, 350, 450];
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);

      // Header box
      doc.rect(40, tableY - 15, 510, 25); // x, y, width, height
      doc.text("Service", colX[0], tableY);
      doc.text("Category", colX[1], tableY);
      doc.text("Plan", colX[2], tableY);
      doc.text("Price", colX[3], tableY);

      // Row box
      const rowY = tableY + 20;
      doc.rect(40, rowY - 15, 510, 25);
      doc.text(order.serviceName, colX[0], rowY);
      doc.text(order.category, colX[1], rowY);
      doc.text(order.plan, colX[2], rowY);
      doc.text(`$${order.price}`, colX[3], rowY);

      // Total
      doc.setFontSize(14);
      doc.text(`Total: $${order.price}`, 450, rowY + 40, { align: "right" });

      // Status
      doc.setFontSize(12);
      doc.text(`Status: ${order.orderstatus}`, 40, rowY + 60);

      // Footer
      doc.setFontSize(10);
      doc.text("Thank you for your business!", 40, 780);

      doc.save(`invoice-${order.invoiceNumber || orderId}.pdf`);
    };

    img.onerror = () => {
      console.error("Logo failed to load.");
    };
  };

  if (loading) return <p className={styles.message}>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Success</h1>
      {order && (
        <>
          <p className={styles.row}>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className={styles.row}>
            <strong>Invoice #:</strong> {order.invoiceNumber || "N/A"}
          </p>
          <p className={styles.row}>
            <strong>Service:</strong> {order.serviceName}
          </p>
          <p className={styles.row}>
            <strong>Category:</strong> {order.category}
          </p>
          <p className={styles.row}>
            <strong>Plan:</strong> {order.plan}
          </p>
          <p className={styles.row}>
            <strong>Price:</strong> ${order.price}
          </p>
          <p className={styles.row}>
            <strong>Status:</strong> {order.orderstatus}
          </p>
        </>
      )}

      <div style={{ marginTop: 18 }}>
        <button
          className={styles.orderBtn}
          style={{ marginLeft: 12 }}
          onClick={() => router.push("/services")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
