import { RootState } from '../../../app/store'

export const isLoggedSelector = (state: RootState) => state.auth.isLoggedIn
