import { createSlice } from '@reduxjs/toolkit'
import { initialData } from '../data'
import { apiAction } from './apiAction'

const initialState = {
  postsArr: initialData,
}

export const [getAllPosts] = apiAction(
  'posts/getAllPosts', ({onFailure, onSuccess}) => ({
    url: 'http://localhost:5000/api/posts',
    onSuccess,
    onFailure,
  }),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment: (state, { payload: { postId, comment } }) => {
      state.postsArr[postId].comments?.push(comment);
    },
    changeLike: (state, { payload: { postId, like } }) => {
      state.postsArr[postId].isLiked = like
    },
    addPost: (state, { payload: { post } }) => {
      state.postsArr.push(post);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, {payload}) => {
        state.postsArr = payload;
    })
  }
})

export const { addComment, changeLike, addPost } = postsSlice.actions

export default postsSlice.reducer