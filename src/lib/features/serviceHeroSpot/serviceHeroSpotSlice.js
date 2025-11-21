import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServiceHeroSpot = createAsyncThunk(
  "serviceHeroSpot/fetch",
  async () => {
    const res = await fetch(
      "http://localhost:1337/api/service-hero-spots?populate=*"
    );
    const data = await res.json();
    return data.data?.[0] || null;
  }
);

const serviceHeroSpotSlice = createSlice({
  name: "serviceHeroSpot",
  initialState: { data: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceHeroSpot.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceHeroSpot.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServiceHeroSpot.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default serviceHeroSpotSlice.reducer;
