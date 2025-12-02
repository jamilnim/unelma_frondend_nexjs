"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../../lib/features/cart/ordersSlice";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || {});
  const { orders, loading, error } = useSelector((state) => state.orders || {});

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders(user.username));
    }
  }, [user, dispatch]);

  if (!user) return <div>Please login to view your profile.</div>;
  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDownload = (order) => {
    const doc = new jsPDF();

    // 1️⃣ Header
    doc.setFontSize(22);
    doc.text("Invoice", 105, 20, null, null, "center");

    // Optional: add logo
    // doc.addImage(logoDataUrl, 'PNG', 14, 10, 50, 20);

    // 2️⃣ Customer info
    doc.setFontSize(12);
    doc.text(`Customer: ${user.name || user.username}`, 14, 35);
    doc.text(`Email: ${user.email}`, 14, 42);
    doc.text(`Username: ${user.username}`, 14, 49);

    // 3️⃣ Order info
    doc.text(`Order ID: ${order.id}`, 140, 35);
    doc.text(`Status: ${order.order_status || "Unknown"}`, 140, 42);
    doc.text(`Placed At: ${order.placed_at ? new Date(order.placed_at).toLocaleString() : "-"}`, 140, 49);
    doc.text(`Delivery: ${order.delivery_date || "-"}`, 140, 56);
    doc.text(`Payment: ${order.payment_method || "-"}`, 140, 63);

    // 4️⃣ Items table
    const tableData = order.items.map((item, idx) => [
      idx + 1,
      item.title || "No title",
      item.quantity ?? 0,
      `€${item.price?.toFixed(2) ?? 0}`,
      `€${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 75,
      head: [["#", "Item", "Qty", "Price", "Total"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    // 5️⃣ Total amount
    const finalY = doc.lastAutoTable.finalY || 75;
    doc.setFontSize(14);
    doc.text(`Total: €${order.total?.toFixed(2) ?? 0}`, 160, finalY + 10);

    // 6️⃣ Footer
    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 105, finalY + 20, null, null, "center");

    doc.save(`order-${order.id}.pdf`);
  };

  return (
    <div className={styles.profileFace}>
      {/* User Details */}
      <div className={styles.userSection}>
        <h2>User Profile</h2>
        <div className={styles.userInfo}>
         
          <div className={styles.userDetails}>
            <p><strong>Name:</strong> {user.name || user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className={styles.ordersSection}>
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => {
            const items = order.items || [];

            return (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Status:</strong> {order.order_status || "Unknown"}</p>
                  <button onClick={() => handleDownload(order)} className={styles.downloadBtn}>
                    <FaDownload /> Download PDF
                  </button>
                </div>
                <p><strong>Placed At:</strong> {order.placed_at ? new Date(order.placed_at).toLocaleString() : "-"}</p>
                <p><strong>Total:</strong> €{order.total ?? 0}</p>
                <p><strong>Payment:</strong> {order.payment_method || "-"}</p>
                <p><strong>Delivery:</strong> {order.delivery_date || "-"}</p>

                <div className={styles.itemsContainer}>
                  {items.length > 0 ? (
                    items.map((item, idx) => (
                      <div key={idx} className={styles.orderItem}>
                        <img src={item.image || "/placeholder.png"} alt={item.title} />
                        <div>
                          <p>{item.title || "No title"}</p>
                          <p>Qty: {item.quantity ?? 0}</p>
                          <p>Price: €{item.price?.toFixed(2) ?? 0}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items in this order.</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
