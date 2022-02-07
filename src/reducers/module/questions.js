import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../../helpers/generateId";
import { sortList } from "../../helpers/sortList";

const initialState = {
  list: [
    {
      question:
        "Which house was Harry Potter almost put into by the sorting hat?",
      answer: "Slytherin",
      id: generateId(),
    },
  ],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    add: (state, action) => {
      state.list = [...state.list, { ...action.payload, id: generateId() }];
    },
    edit: (state, action) => {
      const index = state.list?.findIndex(item => item.id === action.payload.id)
      const updatedList = state.list
      updatedList[index] = action.payload
      state.list = updatedList;
    },
    remove: (state, action) => {
      state.list = state.list?.filter(item => item.id !== action.payload);
    },
    sort: (state) => {
      state.list = sortList(state.list, 'question')
    },
  },
});

export const { add, edit, remove, sort } = questionsSlice.actions;

export default questionsSlice.reducer;
