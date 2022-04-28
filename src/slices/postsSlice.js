import { createSlice } from '@reduxjs/toolkit'
import { initialData } from '../data'

const initialState = {
  postsArr: initialData,
}

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
})

export const { addComment, changeLike, addPost } = postsSlice.actions

export default postsSlice.reducer