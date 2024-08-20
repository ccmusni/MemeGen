import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category_id }, { rejectWithValue }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_PRINTFUL_BASE_URL}/products${
        category_id ? "?category_id=" + category_id : ""
      }`
    );
    return response.data?.result;
  }
);
