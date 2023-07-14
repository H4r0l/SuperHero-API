// store.js
import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "./Reducer";

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
});

export default store;
