import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Typography } from 'antd'
import './contacts.css'
import Search from 'antd/es/input/Search'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  contactListLoadingSelector,
  ContactLists,
  contactListSelector,
  deleteContact,
  fetchContacts
} from '../../features/contact/contactSlice'
import { AddContactForm } from '../../components/AddContactForm/AddContactForm'
import { EditForm } from '../../components/EditForm/EditForm'

const { Title } = Typography

export const Contacts = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false)
  const [isOpenEditForm, setIsOpenEditForm] = useState(false)
  const [selectedContact, setIsSelectedContact] = useState<ContactLists | null>(
    null
  )

  const dispatch = useAppDispatch()
  const contactsList = useAppSelector(contactListSelector)
  const contactsListLoader = useAppSelector(contactListLoadingSelector)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const deleteContactHandler = (id: string) => {
    dispatch(deleteContact(id))
  }

  const showEditForm = (contactItem: ContactLists) => {
    setIsOpenEditForm(true)
    setIsSelectedContact(contactItem)
  }

  return (
    <div className='contacts'>
      <Title>Contacts List</Title>
      <Search
        className='contactsSearch'
        placeholder='Search contacts...'
        enterButton
      />
      <List
        bordered
        className='contactsList'
        itemLayout='horizontal'
        dataSource={contactsList}
        loading={contactsListLoader}
        renderItem={contact => (
          <List.Item
            actions={[
              <Button
                key='list-loadmore-edit'
                onClick={() => showEditForm(contact)}
              >
                Edit
              </Button>,
              <Button
                onClick={() => deleteContactHandler(contact.id)}
                key='list-loadmore-edit'
                danger
              >
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
              title={<a href='https://ant.design'>{contact.name}</a>}
              description={contact.phone}
            />
          </List.Item>
        )}
      />
      <Button
        className='contactsButton'
        type='primary'
        onClick={() => setIsOpenAddForm(true)}
      >
        Add new contact
      </Button>
      {isOpenAddForm && (
        <AddContactForm
          isOpenModal={isOpenAddForm}
          closeModal={() => setIsOpenAddForm(false)}
        />
      )}
      {isOpenEditForm && (
        <EditForm
          selectedContact={selectedContact}
          isOpenModal={isOpenEditForm}
          closeModal={() => setIsOpenEditForm(false)}
        />
      )}
    </div>
  )
}
