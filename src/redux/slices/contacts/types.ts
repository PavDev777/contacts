export type ContactLists = {
  name: string
  phone: string
  id: string
}

export interface ContactsState {
  contactList: ContactLists[]
  loading: boolean
  searchContacts: string
}
