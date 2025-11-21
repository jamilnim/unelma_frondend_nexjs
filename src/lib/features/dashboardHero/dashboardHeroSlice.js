import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Construct Strapi URL using HOST and PORT from env
const STRAPI_URL = `http://${process.env.HOST}:${process.env.PORT}`;

export const fetchDashboardHero = createAsyncThunk(
  "dashboardHero/fetchDashboardHero",
  async () => {
    const response = await axios.get(
      `${STRAPI_URL}/api/dashboard-heroes?populate=*`
    );
    return response.data.data[0]; // take first hero
  }
);

const dashboardHeroSlice = createSlice({
  name: "dashboardHero",
  initialState: { hero: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardHero.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardHero.fulfilled, (state, action) => {
        state.hero = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardHero.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default dashboardHeroSlice.reducer;
