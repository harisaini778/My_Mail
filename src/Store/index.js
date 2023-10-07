import { configureStore } from "@reduxjs/toolkit";
import verificationReducer from "./auth";
import dataStoreReducer from "./dataStore"; // Import your dataStore reducer

const store = configureStore({
  reducer: {
    verification: verificationReducer,
    dataStore: dataStoreReducer, // Use the dataStore reducer
  },
});

export default store;