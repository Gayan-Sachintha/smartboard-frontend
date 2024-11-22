import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WhiteboardState {
  drawings: string[];
}

const initialState: WhiteboardState = {
  drawings: [],
};

const whiteboardSliceKids = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    saveDrawing(state, action: PayloadAction<string>) {
      state.drawings.push(action.payload);
    },
  },
});

export const { saveDrawing } = whiteboardSliceKids.actions;

export default whiteboardSliceKids.reducer;
