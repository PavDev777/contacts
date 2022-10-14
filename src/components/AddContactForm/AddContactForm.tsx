import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../app/hooks'
import { addContact } from '../../redux/slices/contacts/contactSlice'
import { useSelector } from 'react-redux'
import { AddFormContact, AddFormValues } from './types'
import { contactListLoadingSelector } from '../../redux/slices/contacts/selectors'
import { IMaskInput } from 'react-imask'

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
          {/*<Input*/}
          {/*  prefix={<LockOutlined className='site-form-item-icon' />}*/}
          {/*  placeholder='Phone'*/}
          {/*/>*/}
          <IMaskInput mask={'+{7}(000)000-00-00'} />
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
      </Form>
    </Modal>
  )
}
