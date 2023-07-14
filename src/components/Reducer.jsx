import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  heroes: [],
  loading: false,
  error: null,
};
const heroesReducer = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    fetchApiRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApiSuccess: (state, action) => {
      state.heroes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchApiError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { fetchApiRequest, fetchApiSuccess, fetchApiError } =
  heroesReducer.actions;
export default heroesReducer.reducer;
