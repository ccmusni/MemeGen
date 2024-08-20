import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../actions/category-actions";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    status: "idle" | "pending" | "error",
    successMessage: null,
    errorMessage: null,
    categories: null,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
