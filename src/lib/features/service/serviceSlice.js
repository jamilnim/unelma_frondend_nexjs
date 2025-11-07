// src/lib/features/service/serviceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all service categories
export const fetchCategories = createAsyncThunk(
  "services/fetchCategories",
  async () => {
    const res = await axios.get(
      "http://localhost:1337/api/service-categories?populate=*"
    );
    return res.data.data;
  }
);

// Fetch single service by slug
export const fetchServiceBySlug = createAsyncThunk(
  "services/fetchServiceBySlug",
  async (slug) => {
    const res = await axios.get(
      `http://localhost:1337/api/service-categories?filters[slug][$eq]=${slug}&populate=*`
    );
    return res.data.data[0]; // returns first matching service
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    categories: [],
    currentService: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchServiceBySlug
      .addCase(fetchServiceBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentService = action.payload;
      })
      .addCase(fetchServiceBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
export { fetchCategories, fetchServiceBySlug };