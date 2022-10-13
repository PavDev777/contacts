import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { AddFormValues } from '../../components/AddContactForm/AddContactForm'

export type ContactLists = {
  name: string
  phone: string
  id: string
}

interface ContactsState {
  contactList: ContactLists[]
  loading: boolean
  searchContacts: string
}

const initialState: ContactsState = {
  contactList: [],
  loading: false,
  searchContacts: ''
}

export const fetchContacts = createAsyncThunk('fetchContacts', async () => {
  const response = await fetch(
    'https://634690bf745bd0dbd380a3b5.mockapi.io/contact-list'
  )
  return (await response.json()) as ContactLists[]
})

export const deleteContact = createAsyncThunk(
  'deleteContact',
  async (id: string) => {
    await fetch(
      `https://634690bf745bd0dbd380a3b5.mockapi.io/contact-list/${id}`,
      {
        method: 'DELETE'
      }
    )
    return id
  }
)

export const addContact = createAsyncThunk(
  'addContact',
  async (newContact: AddFormValues) => {
    const response = await fetch(
      `https://634690bf745bd0dbd380a3b5.mockapi.io/contact-list/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
      }
    )
    return (await response.json()) as ContactLists
  }
)

export const editContact = createAsyncThunk(
  'editContact',
  async (contactEdited: ContactLists) => {
    const response = await fetch(
      `https://634690bf745bd0dbd380a3b5.mockapi.io/contact-list/${contactEdited.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactEdited)
      }
    )
    return (await response.json()) as ContactLists
  }
)

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    searchContact: (state, action: PayloadAction<string>) => {
      state.searchContacts = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      if (payload) {
        state.contactList = payload
        state.loading = false
      }
    })
    builder.addCase(deleteContact.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contactList = state.contactList.filter(
        contact => contact.id !== action.payload
      )
      state.loading = false
    })
    builder.addCase(addContact.pending, state => {
      state.loading = true
    })
    builder.addCase(addContact.fulfilled, (state, action) => {
      if (action.payload) {
        state.contactList.push(action.payload)
        state.loading = false
      }
    })
    builder.addCase(editContact.pending, state => {
      state.loading = true
    })
    builder.addCase(editContact.fulfilled, (state, action) => {
      if (action.payload) {
        state.contactList = state.contactList.map(contact => {
          if (contact.id === action.payload.id) {
            return action.payload
          }
          return contact
        })
        state.loading = false
      }
    })
  }
})

export const { searchContact } = contactsSlice.actions

export const contactListSelector = (state: RootState) =>
  state.contacts.contactList
export const contactListLoadingSelector = (state: RootState) =>
  state.contacts.loading
export const searchContactsSelector = (state: RootState) =>
  state.contacts.searchContacts

export default contactsSlice.reducer
