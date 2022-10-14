import { RootState } from '../../../app/store'

export const selectUserData = (state: RootState) => state.user.data
export const selectLoading = (state: RootState) => state.user.loading
