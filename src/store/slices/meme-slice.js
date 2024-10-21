import { createSlice } from "@reduxjs/toolkit";
import { fetchMemes } from "../actions/meme-actions";

const memeSlice = createSlice({
  name: "meme",
  initialState: {
    status: "idle" | "pending" | "error",
    successMessage: null,
    errorMessage: null,
    memes: null,
    selectedMeme: null,
  },
  reducers: {
    setMemes(state, action) {
      state.memes = action.payload;
    },
    setSelectedMeme(state, action) {
      state.selectedMeme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = "idle";
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const { setMemes, setSelectedMeme } = memeSlice.actions;
export default memeSlice.reducer;
