import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:1337/api/appointments";

// Create Appointment thunk
export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData, thunkAPI) => {
    try {
      // Strapi v4 requires "data" wrapper
      const response = await axios.post(API_URL, {
        data: appointmentData,
      });

      return response.data;
    } catch (error) {
      // Handle Strapi errors
      const message =
        error.response?.data?.error?.message ||
        error.message ||
        "Failed to create appointment";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create appointment";
      });
  },
});

export const { reset } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
