import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAboutAPI } from "../../api";

// Async thunk to fetch the About page data
export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAboutAPI(); // calls axios API
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
    about: null,   // stores about data
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed later
  },
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
