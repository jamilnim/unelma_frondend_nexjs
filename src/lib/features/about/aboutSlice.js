import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api"; // only import API

// Async thunk to fetch the About page data
export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/abouts?populate=*"); // call directly here
      const data = res.data?.data?.[0] || null;
      if (!data) return rejectWithValue("No About data found");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    about: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector to get about data from Redux store
export const selectAbout = (state) => state.about.about;

// Export reducer to include in store
export default aboutSlice.reducer;
