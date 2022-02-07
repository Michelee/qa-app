import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [{ question: "How are you?", answer: "turu turu" }],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    add: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    remove: (state, action) => {
      state.list = [...state.list, action.payload];
    },
  },
});

export const { add, remove } = questionsSlice.actions;

export default questionsSlice.reducer;
