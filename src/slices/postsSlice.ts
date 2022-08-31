import { createSlice } from '@reduxjs/toolkit';
import { initialData } from '../data';
import { apiAction } from './apiAction';

export interface commentType {
  id: number;
  name: string;
  comment: string;
};

export interface postType {
  id: number;
  title: string;
  description: string;
  img: string;
  comments: Array<commentType>;
  likeCount: number;
  isLiked: boolean;
};

interface stateType {
  posts: Array<postType>
};

const initialState: stateType = {
  posts: initialData
};

export const [getAllPosts] = apiAction( 'posts/getAllPosts', 
  ({ onSuccess, onFailure} ) => ({
    url: 'https://new-social-api.herokuapp.com/api/posts',
    method: 'GET',
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
    builder
      .addCase(addPost.fulfilled, (state, { payload: { post } }) => {
        state.posts.push(post);
      })
  }
})

export default postsSlice.reducer;
