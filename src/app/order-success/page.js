"use client";

import { useEffect, useState } from "react";
import styles from "./orderConfirm.module.css";

export default function OrderConfirm({ params }) {
  const { id } = params;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1337/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.data));
  }, [id]);

  if (!order) return <p className={styles.loading}>Loading...</p>;

  const o = order.attributes;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Confirmed</h1>
      <p className={styles.subtitle}>
        Thank you! Your order is being processed.
      </p>

      <div className={styles.card}>
        <div>
          <strong>Name:</strong> {o.userName}
        </div>
        <div>
          <strong>Email:</strong> {o.userEmail}
        </div>
        <div>
          <strong>Service:</strong> {o.serviceName}
        </div>
        <div>
          <strong>Plan:</strong> {o.plan}
        </div>
        <div>
          <strong>Price:</strong> ${o.price}
        </div>

        <div className={styles.invoice}>
          <strong>Invoice:</strong> {o.invoiceNumber}
        </div>

        <div className={styles.status}>
          <strong>Status:</strong> {o.orderstatus}
        </div>
      </div>
    </div>
  );
}
