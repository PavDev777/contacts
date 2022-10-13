import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../app/hooks'
import {
  addContact,
  contactListLoadingSelector
} from '../../features/contact/contactSlice'
import { useSelector } from 'react-redux'

type AddFormContact = {
  isOpenModal: boolean
  closeModal: () => void
}

export type AddFormValues = {
  name: string
  phone: string
}

export const AddContactForm = ({ isOpenModal, closeModal }: AddFormContact) => {
  const dispatch = useAppDispatch()
  const contactListLoading = useSelector(contactListLoadingSelector)

  const onFinish = async ({ name, phone }: AddFormValues) => {
    await dispatch(
      addContact({
        name,
        phone
      })
    )
    closeModal()
  }
  return (
    <Modal
      title='Add contact'
      open={isOpenModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        name='normal_login'
        initialValues={{ name: '', phone: '' }}
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Name'
          />
        </Form.Item>
        <Form.Item
          name='phone'
          rules={[{ required: true, message: 'Please input phone number' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Phone'
            type='number'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={contactListLoading}
          >
            Add
          </Button>
        </Form.Item>
        {/*{error && (*/}
        {/*  <Alert*/}
        {/*    message='Error'*/}
        {/*    description='Username cant be find'*/}
        {/*    type='error'*/}
        {/*    showIcon*/}
        {/*  />*/}
        {/*)}*/}
      </Form>
    </Modal>
  )
}
