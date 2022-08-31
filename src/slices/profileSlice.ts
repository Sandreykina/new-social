import { createSlice } from '@reduxjs/toolkit';
import { initialProfile } from '../initialProfile';

export interface profileType {
  id: number;
  nickname: string;
  fio: string;
  education: string;
  group: string;
  avatar: string;
}

type stateType = {
  profileData: profileType
} 

const initialState: stateType = {
  profileData: initialProfile,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
})

export default profileSlice.reducer
