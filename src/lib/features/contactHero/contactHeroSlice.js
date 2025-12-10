import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContactHero = createAsyncThunk(
  "contactHero/fetchContactHero",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/contact-heroes?populate=*"
      );
      return res.data.data[0] || null;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch contact hero"
      );
    }
  }
);

const contactHeroSlice = createSlice({
  name: "contactHero",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactHero.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContactHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export default contactHeroSlice.reducer;
