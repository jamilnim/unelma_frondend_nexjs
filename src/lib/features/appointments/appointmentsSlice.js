// src/lib/features/appointments/appointmentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSlot: null,
  form: {},
  status: "",
  error: null, // for setError
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
    updateForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = {};
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export all actions including setError
export const { setSelectedSlot, updateForm, resetForm, setStatus, setError } =
  appointmentsSlice.actions;

export default appointmentsSlice.reducer;
