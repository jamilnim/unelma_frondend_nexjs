import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api"; // your axios instance

// Fetch all scrolling texts from Strapi
export const fetchScrollingTexts = createAsyncThunk(
  "scrollingText/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/scrolling-texts");
      // Map only the text field
      return res.data.data.map((item) => item.text);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const scrollingTextSlice = createSlice({
  name: "scrollingText",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScrollingTexts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchScrollingTexts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchScrollingTexts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default scrollingTextSlice.reducer;
