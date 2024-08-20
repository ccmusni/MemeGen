import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category_id }, { rejectWithValue }) => {
    const response = await axios.get(
      `${baseUrl}/products${category_id ? "?category_id=" + category_id : ""}`
    );
    return response.data?.result;
  }
);
