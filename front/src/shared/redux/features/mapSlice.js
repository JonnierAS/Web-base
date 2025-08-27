import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapBoxDrawStateRef: null,
  mapRef: null,
};

export const map_slice = createSlice({
  name: "map_slice",
  initialState,
  reducers: {
    setMapboxDrawRef: (state, action) => {
      state.mapBoxDrawStateRef = action.payload;
    },
    setMapref: (state, action) => {
      state.mapRef = action.payload;
    },
  }
});


export const {
  setMapboxDrawRef,
  setMapref,
} = map_slice.actions;

export default map_slice.reducer;