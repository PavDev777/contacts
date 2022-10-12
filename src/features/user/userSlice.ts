import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

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

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://5fb3db44b6601200168f7fba.mockapi.io/api/users?username=${username}`
      )
      const user = (await response.json()) as UserItem[]
      return user
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // if (action.payload) {
      //   state.status = 'success'
      //   state.data = action.payload
      // }

      state.data = action.payload[0]
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed'
    })
  }
})

export const {} = userSlice.actions

export const selectUserData = (state: RootState) => state.user.data

export default userSlice.reducer
