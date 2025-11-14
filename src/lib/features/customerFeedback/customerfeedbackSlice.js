import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Fetch all customer feedback entries from Strapi
export const fetchCustomerFeedback = createAsyncThunk(
    "customerFeedback/fetchCustomerFeedback",
    async () => {
      const response = await API.get("/api/customer-foodbacks?populate=*");
      return response.data.data; // ✅ important fix
    }
  );
  
  const customerFeedbackSlice = createSlice({
    name: "customerFeedback",
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCustomerFeedback.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchCustomerFeedback.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchCustomerFeedback.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default customerFeedbackSlice.reducer;
