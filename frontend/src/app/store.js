import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/userSlice";
import todoReducer from "../features/todoSlice";

const store = configureStore({
  reducer: {
    user: usersReducer,
    todo: todoReducer,
  },
});

export default store;
