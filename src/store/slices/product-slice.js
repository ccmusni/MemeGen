import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions/product-actions";

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: "idle" | "pending" | "error",
    successMessage: null,
    errorMessage: null,
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
