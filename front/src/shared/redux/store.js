import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "@/shared/redux/features/mapSlice"
import userReducer from "@/shared/redux/features/userSlice"

export const store = configureStore({
  reducer: {
    mapReducer,
    userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});