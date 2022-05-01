import { createSlice } from '@reduxjs/toolkit'
import { initialProfile } from '../initialProfile'

const initialState = {
  profileData: initialProfile,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
})

// export const { changeNickname } = profileSlice.actions

export default profileSlice.reducer