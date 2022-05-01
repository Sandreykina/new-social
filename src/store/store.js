import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../slices/profileSlice'
import postsReducer from './../slices/postsSlice'

export const store = configureStore({
    reducer: {
      posts: postsReducer,
      profile: profileReducer
    },
  })
