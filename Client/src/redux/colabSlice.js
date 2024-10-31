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
    updateColabStart: (state) => {
      state.loading = true;
    },
    updateColabFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateColabSuccess: (state, action) => {
      if (Array.isArray(state.colabs)) {
        state.colabs = state.colabs.map((colab) =>
          colab.id === action.payload.id ? action.payload : colab
        );
      }
    }
  }
});

export const {
  fetchColabsStart,
  fetchColabsSuccess,
  fetchColabsFailure,
  createColabStart,
  createColabFailure,
  createColabSuccess,
  updateColabStart,
  updateColabFailure,
  updateColabSuccess,
} = colabsSlice.actions;

export default colabsSlice.reducer;