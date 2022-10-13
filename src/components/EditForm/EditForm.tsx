import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  contactListLoadingSelector,
  ContactLists,
  editContact
} from '../../features/contact/contactSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

type EditFormProps = {
  isOpenModal: boolean
  closeModal: () => void
  selectedContact: ContactLists | null
}

type EditFormValues = {
  name: string
  phone: string
}

export const EditForm = ({
  isOpenModal,
  closeModal,
  selectedContact
}: EditFormProps) => {
  const dispatch = useAppDispatch()
  const contactListLoading = useAppSelector(contactListLoadingSelector)

  const onFinish = async ({ name, phone }: EditFormValues) => {
    if (selectedContact) {
      await dispatch(
        editContact({
          ...selectedContact,
          name,
          phone
        })
      )
    }
    closeModal()
  }

  return (
    <Modal
      title='Edit contact'
      open={isOpenModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        name='normal_login'
        initialValues={{
          name: selectedContact?.name,
          phone: selectedContact?.phone
        }}
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
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
