// src/lib/features/appointmentHerospot/appointmentHeroSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch hero data from Strapi
export const fetchAppointmentHero = createAsyncThunk(
  "appointmentHero/fetchAppointmentHero",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/appointment-heroes?populate=AppointmentHeroImage"
      );
      return response.data.data[0]?.attributes || null; // return first hero's attributes
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching hero");
    }
  }
);

const appointmentHeroSlice = createSlice({
  name: "appointmentHero",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentHero.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAppointmentHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentHeroSlice.reducer;
