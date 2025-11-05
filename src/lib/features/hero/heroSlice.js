import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:1337";

export const fetchHero = createAsyncThunk(
  "hero/fetchHero",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/hero-spots?populate=backgroundMedia`);
      if (!res.data.data || res.data.data.length === 0) {
        return rejectWithValue("No hero data found");
      }

      const heroData = res.data.data[0]; // take the first hero

      // Return the object as-is
      return heroData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const heroSlice = createSlice({
  name: "hero",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHero.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchHero.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchHero.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export default heroSlice.reducer;
