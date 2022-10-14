import React from 'react'
import Search from 'antd/es/input/Search'
import { searchContact } from '../../redux/slices/contacts/contactSlice'
import { useAppDispatch } from '../../app/hooks'

export const SearchContacts = () => {
  const dispatch = useAppDispatch()

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchContact(event.target.value))
  }

  return (
    <Search
      className='contactsSearch'
      placeholder='Search contacts...'
      onChange={searchHandler}
    />
  )
}
