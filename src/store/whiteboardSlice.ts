import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WhiteboardState {
  data: string | null;
}

const initialState: WhiteboardState = {
  data: null,
};

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    saveWhiteboardData(state, action: PayloadAction<string>) {
      state.data = action.payload;
    },
  },
});

export const { saveWhiteboardData } = whiteboardSlice.actions;

export default whiteboardSlice.reducer;
