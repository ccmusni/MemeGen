import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category_id }, { rejectWithValue }) => {
    const response = await axios.get(`${baseUrl}/products`);
    return response.data;
  }
);
