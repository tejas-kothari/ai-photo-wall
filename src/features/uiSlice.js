import { createSlice, current } from "@reduxjs/toolkit";

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
      state.frameArray = [...action.payload];
    },
    changeImg: (state, action) => {
      state.frameArray[action.payload.frameIndex].image = action.payload.image;
    },
    addFrame: (state, action) => {
      state.frameArray.push(action.payload);
      console.log(current(state.frameArray));
    },
    deleteFrame: (state, action) => {
      state.frameArray.splice(action.payload, 1);
      console.log(current(state.frameArray));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  activateFCB,
  resetFCB,
  setFrameArray,
  changeImg,
  addFrame,
  deleteFrame,
} = uiSlice.actions;

export default uiSlice.reducer;
