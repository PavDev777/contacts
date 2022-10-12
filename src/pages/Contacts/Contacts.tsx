import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Typography } from 'antd'
import './contacts.css'
import Search from 'antd/es/input/Search'

type ContactItem = {
  name: string
  phone: string
  id: string
}

const { Title } = Typography

export const Contacts = () => {
  const [contacts, setContacts] = useState<ContactItem[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://634690bf745bd0dbd380a3b5.mockapi.io/contact-list')
      .then(response => response.json())
      .then(data => setContacts(data))
  }, [])

  return (
    <div className='contacts'>
      <Title>Contacts List</Title>
      <Search
        className='contactsSearch'
        placeholder='Search contacts...'
        enterButton
        onChange={event => setSearch(event.target.value)}
      />
      <List
        bordered
        className='contactsList'
        itemLayout='horizontal'
        dataSource={contacts}
        renderItem={contact => (
          <List.Item
            actions={[
              <Button key='list-loadmore-edit'>edit</Button>,
              <Button key='list-loadmore-edit'>delete</Button>
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
      <Button className='contactsButton' type='primary'>
        Add new contact
      </Button>
    </div>
  )
}
