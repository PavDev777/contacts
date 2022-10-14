import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUserState, UserItem } from './types'

const initialState: IUserState = {
  data: JSON.parse(localStorage.getItem('user') || '{}'),
  loading: false,
  status: ''
}

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://5fb3db44b6601200168f7fba.mockapi.io/api/users?username=${username}`
      )
      if (!response.ok) {
        throw new Error('Server error')
      }
      return (await response.json()) as UserItem[]
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload[0]
        localStorage.setItem(
          'user',
          JSON.stringify(action.payload[0] ? action.payload[0] : '{}')
        )
      }
      state.loading = false
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.status = action.payload
    })
  }
})

export default userSlice.reducer
