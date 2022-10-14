import { RootState } from '../../../app/store'

export const contactListSelector = (state: RootState) =>
  state.contacts.contactList
export const contactListLoadingSelector = (state: RootState) =>
  state.contacts.loading
export const searchContactsSelector = (state: RootState) =>
  state.contacts.searchContacts
