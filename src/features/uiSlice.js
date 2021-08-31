import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  frameIndex: -1,
  buttonIndex: -1,
  frameArray: [],
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    activateFCB: (state, action) => {
      state.frameIndex = action.payload.frameIndex;
      state.buttonIndex = action.payload.buttonIndex;
    },
    resetFCB: (state) => {
      state.frameIndex = -1;
      state.buttonIndex = -1;
    },
    setFrameArray: (state, action) => {
      console.log(action.payload);
      state.frameArray = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { activateFCB, resetFCB, setFrameArray } = uiSlice.actions;

export default uiSlice.reducer;
