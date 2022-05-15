import { createSlice } from '@reduxjs/toolkit'
import { initialData } from '../data'
import { apiAction } from './apiAction'

const initialState = {
  postsArr: initialData,
}

export const [getAllPosts] = apiAction(
  'posts/getAllPosts', ({ onFailure, onSuccess }) => ({
    url: 'http://localhost:5000/api/posts',
    onSuccess,
    onFailure,
  }),
);

export const [setComment] = apiAction(
  'posts/setComment', ({ data, onFailure, onSuccess }) => ({
    url: `http://localhost:5000/api/posts/:id`,
    method: 'POST',
    data,
    onSuccess,
    onFailure,
  }),
);

export const [addPost] = apiAction(
  'posts/addPost',
  ({ data, onSuccess, onFailure }) => ({
    url: `http://localhost:5000/api/posts`,
    method: 'POST',
    data,
    onSuccess,
    onFailure,
  }),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changeLike: (state, { payload: { postId, like } }) => {
      state.postsArr[postId].isLiked = like
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.postsArr = payload;
      })
    builder
      .addCase(setComment.fulfilled, (state, { payload: { postId, comment } }) => {
        state.postsArr[postId].comments?.push(comment);
      })
    builder
      .addCase(addPost.fulfilled, (state, { payload: { post } }) => {
        state.postsArr.push(post);
      })
  }
})

export const { changeLike } = postsSlice.actions

export default postsSlice.reducer;
