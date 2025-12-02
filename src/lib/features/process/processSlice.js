"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// ✅ Async thunk to fetch all work processes from Strapi
export const fetchProcessSteps = createAsyncThunk(
  "processSteps/fetchProcessSteps",
  async () => {
    const res = await API.get("/api/workprocesses?populate=*"); // ✅ correct endpoint
    return res.data.data; // return array of processes
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const processSlice = createSlice({
  name: "processSteps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcessSteps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProcessSteps.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProcessSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default processSlice.reducer;
