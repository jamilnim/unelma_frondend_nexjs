"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk to fetch all cases from Strapi
export const fetchCases = createAsyncThunk("caseStudies/fetchCases", async () => {
  const res = await fetch("http://localhost:1337/api/case-studies?populate=*");
  const json = await res.json();

  // Keep the full structure including id + attributes
  return json.data;
});

// ✅ Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// ✅ Slice
const caseSlice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // 👈 full data preserved
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default caseSlice.reducer;
