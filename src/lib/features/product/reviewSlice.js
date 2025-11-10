// src/lib/features/product/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Fetch reviews for a product
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.get(
        `/api/reviews?filters[product][id][$eq]=${productId}&populate=*`
      );
      return res.data.data || [];
    } catch (err) {
      console.error("Fetch error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Post a new review
export const postReview = createAsyncThunk(
  "reviews/postReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/reviews", { data: payload });
      return res.data.data;
    } catch (err) {
      console.error("Post error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // add new review on top
      });
  },
});

export default reviewSlice.reducer;
