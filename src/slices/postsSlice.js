import { createSlice } from '@reduxjs/toolkit'
import { initialData } from '../data'
import { apiAction } from './apiAction'

const initialState = {
  postsArr: initialData,
}

export const [getAllPosts] = apiAction(
  'posts/getAllPosts', ({ onFailure, onSuccess }) => ({
    url: 'https://new-social-api.herokuapp.com/api/posts',
    onSuccess,
    onFailure,
  }),
);

export const [addPost] = apiAction(
  'posts/addPost',
  ({ data, onSuccess, onFailure }) => ({
    url: `https://new-social-api.herokuapp.com/api/posts`,
    method: 'POST',
    data,
    onSuccess,
    onFailure,
  }),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.postsArr = payload;
      })
    builder
      .addCase(addPost.fulfilled, (state, { payload: { post } }) => {
        state.postsArr.push(post);
      })
  }
})

export const { changeLike, addComment } = postsSlice.actions

export default postsSlice.reducer;
