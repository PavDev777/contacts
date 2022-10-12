import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
