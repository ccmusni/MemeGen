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

export const fetchProductTemplate = createAsyncThunk(
  "products/fetchProductTemplate",
  async ({ productTemplateId }, { rejectWithValue }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_PRINTFUL_BASE_URL}/product-templates/${productTemplateId}`
    );

    return response.data?.result;
  }
);
