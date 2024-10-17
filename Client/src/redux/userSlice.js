import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProjectStart: (state) => {
      state.loading = true;
    },
    createProjectSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    createProjectFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  createProjectStart,
  createProjectSuccess,
  createProjectFailure,
} = userSlice.actions;

export default userSlice.reducer;
