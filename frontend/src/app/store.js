import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});

export default store;
