// .storybook/testStore.js
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '@/shared/redux/features/mapSlice';
import userReducer from '@/shared/redux/features/userSlice';

export const testStore = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
  },
});
