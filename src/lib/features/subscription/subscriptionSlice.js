import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { BASE_URL } from "../../api";

export const subscribeUser = createAsyncThunk(
  "subscription/subscribeUser",
  async ({ email, firstName, lastName }, { rejectWithValue }) => {
    try {
      const res = await API.post(`${BASE_URL}/api/subscribe`, { email, firstName, lastName });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Subscription failed");
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(subscribeUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(subscribeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
