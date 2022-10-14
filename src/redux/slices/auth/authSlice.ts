import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from './types'

const initialState: AuthState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')!)
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: state => {
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', JSON.stringify(true))
    },
    logOut: state => {
      state.isLoggedIn = false
      localStorage.setItem('isLoggedIn', JSON.stringify(false))
      localStorage.removeItem('user')
    }
  }
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer
