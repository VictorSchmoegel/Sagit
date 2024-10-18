import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colabs: [],
  loading: false,
  error: null,
};

const colabsSlice = createSlice({
  name: "colabs",
  initialState,
  reducers: {
    fetchColabsStart: (state) => {
      state.loading = true;
    },
    fetchColabsSuccess: (state, action) => {
      state.colabs = action.payload;
      state.loading = false;
    },
    fetchColabsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createColabStart: (state) => {
      state.loading = true;
    },
    createColabFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createColabSuccess: (state, action) => {
      state.colabs.push(action.payload);
    },
  }
});

export const {
  fetchColabsStart,
  fetchColabsSuccess,
  fetchColabsFailure,
  createColabStart,
  createColabFailure,
  createColabSuccess,
} = colabsSlice.actions;

export default colabsSlice.reducer;