import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Create Inquiry
export const createInquiry = createAsyncThunk(
  "inquiry/createInquiry",
  async ({ data, file, jwt }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append text fields under 'data'
      Object.entries(data).forEach(([key, value]) => {
        formData.append(`data[${key}]`, value);
      });

      // Append file if exists
      if (file) {
        formData.append("files.file", file);
      }

      const res = await API.post("/api/inquiries", formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error?.message || err.message
      );
    }
  }
);

const inquirySlice = createSlice({
  name: "inquiry",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetInquiry: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createInquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetInquiry } = inquirySlice.actions;
export default inquirySlice.reducer;
