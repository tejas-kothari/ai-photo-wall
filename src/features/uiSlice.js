import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  frameIndex: -1,
  buttonIndex: -1,
  frameArray: [],
  frameAreaWidth: 0,
  wallImage: null,
  wallSize: "",
  wallScale: "",
  frameKey: 0,
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
      let frameObj = { ...action.payload };
      frameObj.key = state.frameKey;
      state.frameKey += 1;
      frameObj.image = action.payload.image ? action.payload.image : null;
      state.frameArray.push(frameObj);
      console.log(current(state.frameArray));
    },
    deleteFrame: (state, action) => {
      state.frameArray.splice(action.payload, 1);
      console.log(current(state.frameArray));
    },
    resetFrameArr: (state, _) => {
      state.frameArray = [];
    },
    setWallData: (state, action) => {
      state.frameAreaWidth = action.payload.frameAreaWidth;
      state.wallImage = action.payload.wallImage;
      state.wallSize = action.payload.wallSize;
      state.wallScale = action.payload.wallScale;
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
  resetFrameArr,
  setWallData,
} = uiSlice.actions;

export default uiSlice.reducer;
