import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ContactLists } from '../../features/contact/contactSlice'

type EditFormProps = {
  isOpenModal: boolean
  closeModal: () => void
  selectedContact: ContactLists | null
}

export const EditForm = ({
  isOpenModal,
  closeModal,
  selectedContact
}: EditFormProps) => {
  const onFinish = () => {}

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
          >
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
