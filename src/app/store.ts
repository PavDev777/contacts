import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userReducer from '../redux/slices/user/userSlice'
import authReducer from '../redux/slices/auth/authSlice'
import contactsReducer from '../redux/slices/contacts/contactSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    contacts: contactsReducer
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
