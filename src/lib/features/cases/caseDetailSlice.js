"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch a single case by ID from Strapi
export const fetchCaseById = createAsyncThunk(
  "caseDetail/fetchCaseById",
  async (id) => {
    const res = await fetch(`http://localhost:1337/api/case-studies/${id}?populate=*`);
    const json = await res.json();
    return json.data; // keep full structure for detail component
  }
);

const initialState = {
  item: null,
  loading: false,
  error: null,
};

const caseDetailSlice = createSlice({
  name: "caseDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchCaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default caseDetailSlice.reducer;
