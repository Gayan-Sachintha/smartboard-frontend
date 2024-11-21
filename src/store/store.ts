import { configureStore } from '@reduxjs/toolkit';
import whiteboardReducer from './whiteboardSlice';

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
