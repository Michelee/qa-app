import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './module/questions';

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});
