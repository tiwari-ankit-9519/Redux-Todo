import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/api/v1/users";

export const loginUser = createAsyncThunk(
  "users/signin",
  async (newFormData) => {
    const response = await axios.post(`${baseURL}/signin`, newFormData);
    const token = response.data.token;
    localStorage.setItem("token", JSON.stringify(token));
    return token;
  }
);

export const signupUser = createAsyncThunk(
  "users/signup",
  async (newFormData) => {
    const response = await axios.post(`${baseURL}/signup`, newFormData);
    const token = response.data.token;
    localStorage.setItem("token", JSON.stringify(token));
    return token;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.laoding = false;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.laoding = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.laoding = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
const usersReducer = userSlice.reducer;
export default usersReducer;
