import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_PRINTFUL_BASE_URL}/categories`
    );
    return response.data?.result?.categories;
  }
);
