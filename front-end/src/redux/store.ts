import { configureStore } from '@reduxjs/toolkit';
import moviePreviewReducer from './moviePreview/moviePreviewSlice';

export const store = configureStore({
  reducer: {
    moviesPreview: moviePreviewReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

