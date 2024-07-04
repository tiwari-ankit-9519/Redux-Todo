import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/api/v1/todos";

const initialState = {
  loading: false,
  error: null,
  todo: [],
};

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (newFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/todo`, newFormData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.message);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/todo`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return id;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const toggleTodoCompletion = createAsyncThunk(
  "todo/updateTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/todo/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response.data.todo;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todo = action.payload;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todo = action.payload.todos;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(`Error: ${action.error.payload}`);
      })
      .addCase(deleteTodos.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.todo) {
          state.todo = state.todo.filter((todo) => todo.id !== action.payload);
        }
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(toggleTodoCompletion.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleTodoCompletion.fulfilled, (state, action) => {
        state.todo = state.todo.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      })
      .addCase(toggleTodoCompletion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, updateCompleted } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
