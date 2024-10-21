import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMemes = createAsyncThunk("memes/fetchMemes", async () => {
  const response = await axios.get(`https://api.memegen.link/templates`);

  return response?.data;
});

export const createMemes = createAsyncThunk(
  "memes/createMemes",
  async ({ meme, nodes }, { rejectWithValue }) => {
    const textUrl = nodes.map((node) => node.value)?.join("/");
    const response = await fetch(
      `https://api.memegen.link/images/${meme.id}/${textUrl}.png`,
      {
        method: "GET",
      }
    ).then((res) => {
      return { data: { url: res.url, page_url: "" } };
    });

    return response;
  }
);
