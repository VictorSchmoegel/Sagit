import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
    },
    fetchProjectsSuccess: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.projects = action.payload;
    },
    fetchProjectsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProjectStart: (state) => {
      state.loading = true;
    },
    createProjectFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProjectSuccess: (state, action) => {
      state.projects.push(action.payload);
    },
  }
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  createProjectStart,
  createProjectFailure,
  createProjectSuccess,
} = projectsSlice.actions;

export default projectsSlice.reducer;