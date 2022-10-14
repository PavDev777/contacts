export type UserItem = {
  name: string
  username: string
  email: string
  avatar: string
  id: string
}

export interface IUserState {
  data: UserItem | null
  loading: boolean
  status: Error | unknown
}
