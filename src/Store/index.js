import { configureStore } from "@reduxjs/toolkit";

import dataStoreReducer from "./dataStore"; // Import your dataStore reducer

const store = configureStore({
  reducer: {
    
    dataStore: dataStoreReducer, // Use the dataStore reducer
  },
});

export default store;