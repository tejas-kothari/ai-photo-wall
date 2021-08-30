import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  frameIndex: -1,
  buttonIndex: -1,
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    activateFCB: (state, action) => {
      state.frameIndex = action.payload.frameIndex;
      state.buttonIndex = action.payload.buttonIndex;
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { activateFCB } = uiSlice.actions;

export default uiSlice.reducer;
