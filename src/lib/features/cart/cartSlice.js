import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

const CART_STORAGE_KEY = "hotstore_cart_v1";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async (
    { customer, deliveryNotes, specialInstructions, paymentMethod, deliveryDate },
    { getState, rejectWithValue }
  ) => {
    try {
      const { items } = getState().cart;

      if (!items.length) {
        return rejectWithValue({ message: "Cart is empty" });
      }

      const payload = {
        data: {
          items: items.map((i) => ({
            id: i.id,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),

          total: items.reduce((s, i) => s + i.price * i.quantity, 0),

          customer: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
          },

          delivery_notes: deliveryNotes,
          special_instructions: specialInstructions,
          payment_method: paymentMethod,
          delivery_date: deliveryDate || null,

          placed_at: new Date().toISOString(),
          order_status: "pending",
          discount_amount: 0,
          metadata: {},
        },
      };

      const res = await API.post("/api/orders", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Unknown error" }
      );
    }
  }
);

const initialState = loadFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      saveToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = quantity;
      saveToStorage(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveToStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.creating = false;
        state.lastOrder = action.payload;
        state.items = [];
        saveToStorage(state);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      });
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
