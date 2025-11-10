import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/products?populate=*");
      const raw = res.data?.data || [];

      const products = raw.map((p) => ({
        id: p.id,
        documentId: p.documentId,
        slug: p.slug || "",          // <--- must be filled in Strapi
        name: p.name || "Unnamed",
        description: p.description || "",
        price: p.price || 0,
        images: p.images || [],
      }));

      return products;
    } catch (err) {
      console.error("Fetch error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
      });
  },
});

export default productSlice.reducer;
