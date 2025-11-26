// lib/features/orders/ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Fetch orders by username (filter in frontend)
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (username, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/orders"); // fetch all orders
      const allOrders = res.data.data || [];

      // filter orders by username
      const userOrders = allOrders.filter(
        (order) => order.customer?.name === username
      );

      return userOrders;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
