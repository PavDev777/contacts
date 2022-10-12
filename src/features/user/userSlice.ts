import { createSlice } from '@reduxjs/toolkit'

export type UserItem = {
  name: string
  username: string
  email: string
  avatar: string
  id: string
}

type Status = 'idle' | 'loading' | 'failed' | 'success'

export interface IUserState {
  data: UserItem | null
  status: Status
}

const initialState: IUserState = {
  data: null,
  status: 'idle'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {}
})

export const {} = userSlice.actions

export default userSlice.reducer
