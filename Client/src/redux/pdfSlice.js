import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pdf: [],
  loading: false,
  error: null,
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    fetchPdfStart: (state) => {
      state.loading = true;
    },
    fetchPdfSuccess: (state, action) => {
      state.pdf = action.payload;
      state.loading = false;
    },
    fetchPdfFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    uploadPdfStart: (state) => {
      state.loading = true;
    },
    uploadPdfFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    uploadPdfSuccess: (state, action) => {
      state.pdf.push(action.payload);
    },
    deletePdfStart: (state) => {
      state.loading = true;
    },
    deletePdfFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deletePdfSuccess: (state, action) => {
      state.pdf = state.pdf.filter((pdf) => pdf._id !== action.payload);
    },
  }
});

export const {
  fetchPdfStart,
  fetchPdfSuccess,
  fetchPdfFailure,
  uploadPdfStart,
  uploadPdfFailure,
  uploadPdfSuccess,
  deletePdfStart,
  deletePdfFailure,
  deletePdfSuccess,
} = pdfSlice.actions;

export default pdfSlice.reducer;