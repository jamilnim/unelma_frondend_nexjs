"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Strapi API endpoint
const API_URL = "http://localhost:1337/api/messages";

// Async thunk to submit contact form
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) return rejectWithValue("Failed to send message");

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactFormSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetFormStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong.";
      });
  },
});

export const { resetFormStatus } = contactFormSlice.actions;
export default contactFormSlice.reducer;
