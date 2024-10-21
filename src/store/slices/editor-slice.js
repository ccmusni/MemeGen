import { createSlice } from "@reduxjs/toolkit";
import { FONT_SCALE } from "../constants/text-node-constraints";

const generateTitle = (textNodes) => {
  let count = textNodes?.length + 1;
  let title = `Text #${textNodes?.length + 1}`;
  const existingTitles = textNodes?.map((node) => node.title);

  do {
    title = `Text #${count++}`;
  } while (existingTitles.indexOf(title) !== -1);

  return title;
};

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    status: "idle" | "pending" | "error",
    successMessage: null,
    errorMessage: null,
    textNodes: [
      {
        id: Date.now().toString(),
        title: generateTitle([]),
        value: "Text 1",
        y: 0,
        height: 100,
        width: 500,
        color: "#000000",
        fontSize: 50,
      },
    ],
  },
  reducers: {
    resetTextNode(state, action) {
      state.textNodes = [
        {
          id: Date.now().toString(),
          title: generateTitle([]),
          value: "Text 1",
          y: 0,
          height: 100,
          width: 500,
          color: "#000000",
          fontSize: 50,
        },
      ];
    },
    addTextNode(state, action) {
      state.textNodes = [
        ...state.textNodes,
        {
          id: Date.now().toString(),
          title: generateTitle(state.textNodes),
          value: generateTitle(state.textNodes),
          x: 0,
          y: 0,
          width: 500,
          height: 100,
          color: "#000000",
          fontSize: 50,
        },
      ];
    },
    updateTextNodes(state, action) {
      state.textNodes = state.textNodes?.map((node) =>
        node.id === action.payload.id ? action.payload : node
      );
    },
    removeTextNode(state, action) {
      state.textNodes = state.textNodes.filter(
        (node) => node.id !== action.payload.id
      );
    },
    moveTextNode(state, action) {
      state.textNodes = state.textNodes?.map((node) =>
        node.id === action.payload.id
          ? {
              ...node,
              x: action.payload?.x,
              y: action.payload?.y,
            }
          : node
      );
    },
    resizeTextNode(state, action) {
      state.textNodes = state.textNodes?.map((node) => {
        let width = action.payload.width
          ? node.width - action.payload.width
          : node.width;
        let height = action.payload.height
          ? node.height - action.payload.height
          : node.height;

        return node.id === action.payload.id
          ? {
              ...node,
              width,
              height,
              fontSize: width * FONT_SCALE,
            }
          : node;
      });
    },
  },
});

export const {
  resetTextNode,
  addTextNode,
  moveTextNode,
  removeTextNode,
  resizeTextNode,
  updateTextNodes,
} = editorSlice.actions;
export default editorSlice.reducer;
