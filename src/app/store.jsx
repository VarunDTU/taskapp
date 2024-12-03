import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/slice";
export const store = configureStore({
  reducer: taskReducer,
});
