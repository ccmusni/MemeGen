import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductTemplate,
} from "../actions/product-actions";

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: "idle" | "pending" | "error",
    successMessage: null,
    errorMessage: null,
    products: null,
    productTemplate: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProductTemplate(state, action) {
      state.productTemplate = action.payload;
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
      })
      .addCase(fetchProductTemplate.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProductTemplate.fulfilled, (state, action) => {
        state.status = "idle";
        state.productTemplate = action.payload;
      })
      .addCase(fetchProductTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.productTemplate = action.error.message;
      });
  },
});

export const { setProducts, setProductTemplate } = productSlice.actions;
export default productSlice.reducer;
