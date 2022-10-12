import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export type AuthState = {
  isLoggedIn: boolean
}

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
    }
  }
})

export const { logIn, logOut } = authSlice.actions

export const isLogged = (state: RootState) => state.auth.isLoggedIn

export default authSlice.reducer
