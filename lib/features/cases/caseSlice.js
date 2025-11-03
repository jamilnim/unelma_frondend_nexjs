import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all case studies
export const fetchCases = createAsyncThunk("cases/fetchCases", async () => {
  const res = await axios.get(
    "http://localhost:1337/api/case-studies?populate=*"
  );
  return res.data.data;
});

const caseSlice = createSlice({
  name: "caseStudies",
  initialState: {
    items: [],
    loading: false,
    selectedCase: null,
  },
  reducers: {
    selectCase: (state, action) => {
      state.selectedCase = action.payload;
    },
    clearSelection: (state) => {
      state.selectedCase = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCases.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { selectCase, clearSelection } = caseSlice.actions;
export default caseSlice.reducer;
