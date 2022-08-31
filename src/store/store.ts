// @ts-ignore
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../slices/profileSlice';
import postsReducer from '../slices/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    profile: profileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
