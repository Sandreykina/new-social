import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../slices/profileSlice'
import postsReducer from './../slices/postsSlice'
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

export const store = configureStore({
    reducer: {
      posts: postsReducer,
      profile: profileReducer
    },
   // middleware: applyMiddleware(thunk),
  })
