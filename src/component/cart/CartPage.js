"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  createOrder,
} from "../../lib/features/cart/cartSlice";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items = [], creating = false, createError = null } = useSelector(
    (state) => state.cart || {}
  );
  const { user } = useSelector((state) => state.auth || {});

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // CUSTOMER INFO
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setCustomer((prev) => ({
        ...prev,
        name: user.name || user.username || user.identifier || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // NEW ORDER INPUTS
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryDate, setDeliveryDate] = useState("");

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return { subtotal, total: subtotal };
  }, [items]);

  const handleQtyChange = (id, value) => {
    const quantity = Math.max(1, Number(value) || 1);
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const handleCreateOrder = async () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill all customer fields.");
      return;
    }

    const resultAction = await dispatch(
      createOrder({
        customer,
        deliveryNotes,
        specialInstructions,
        paymentMethod,
        deliveryDate: deliveryDate || null,
      })
    );

    if (createOrder.fulfilled.match(resultAction)) {
      alert("Order placed successfully!");
      setDeliveryNotes("");
      setSpecialInstructions("");
      setDeliveryDate("");
      setCustomer((prev) => ({ ...prev, phone: "", address: "" }));
    } else {
      alert("Order failed. Check console.");
    }
  };

  if (!mounted) return null;
  if (!items.length)
    return <div className={styles.emptyState}>Your cart is empty.</div>;

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartTitle}>Your Cart</h1>

      {/* ITEMS */}
      <div className={styles.itemsList}>
        {items.map((it) => (
          <div key={it.id} className={styles.itemRow}>
            <img
              src={it.image || "/placeholder.png"}
              alt={it.title}
              className={styles.itemImage}
            />

            <div className={styles.itemInfo}>
              <div className={styles.itemName}>{it.title}</div>
              <div className={styles.itemPrice}>€{it.price.toFixed(2)}</div>

              <div className={styles.qtyWrap}>
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={it.quantity}
                  onChange={(e) => handleQtyChange(it.id, e.target.value)}
                  className={styles.qtyInput}
                />
                <button
                  onClick={() => handleRemove(it.id)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className={styles.itemSubtotal}>
              €{(it.price * it.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* TOTALS */}
      <div className={styles.totals}>
        <div>Subtotal: €{totals.subtotal.toFixed(2)}</div>
        <div>Total: €{totals.total.toFixed(2)}</div>
      </div>

      {/* CUSTOMER & ORDER DETAILS CARD */}
      <div className={styles.detailsCard}>
        {/* CUSTOMER DETAILS */}
        <div className={styles.detailsColumn}>
          <h3 className={styles.sectionTitle}>Customer Details</h3>
          <input
            placeholder="Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className={styles.inputField}
          />
          <input
            placeholder="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            className={styles.inputField}
          />
          <input
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            className={styles.inputField}
          />
          <input
            placeholder="Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            className={styles.inputField}
          />
        </div>

        {/* ORDER DETAILS */}
        <div className={styles.detailsColumn}>
          <h3 className={styles.sectionTitle}>Order Details</h3>
          <input
            placeholder="Delivery Notes"
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
            className={styles.inputField}
          />
          <textarea
            placeholder="Special Instructions"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className={styles.textareaField}
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className={styles.inputField}
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="banktransfer">Bank Transfer</option>
          </select>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className={styles.inputField}
          />

          <div className={styles.buttonRow}>
            <button
              onClick={handleCreateOrder}
              disabled={creating}
              className={styles.smallBtn}
            >
              {creating ? "Placing..." : "Place Order"}
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className={styles.smallBtn}
            >
              Clear Cart
            </button>
          </div>

          {createError && (
            <div className={styles.errorText}>
              Error: {createError.message || JSON.stringify(createError)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
