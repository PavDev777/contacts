import React, { useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './loginForm.css'

type LoginData = {
  userName: string
}

type singleUser = {
  name: string
  username: string
  email: string
  avatar: string
  id: string
}

const { Title } = Typography

export const Login = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const onFinish = async ({ userName }: LoginData) => {
    setLoading(true)
    const response = await fetch(
      'https://5fb3db44b6601200168f7fba.mockapi.io/api/users'
    )
    const users: singleUser[] = await response.json()

    const findUser = users.find(
      user => user.username.toLowerCase() === userName.toLowerCase()
    )
    if (!findUser) {
      setError(true)
      setLoading(false)
    } else {
      setError(false)
      setLoading(false)
    }
  }

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ userName: '', password: '' }}
      onFinish={onFinish}
    >
      <Title>Authorization</Title>
      <Form.Item
        name='userName'
        rules={[{ required: true, message: 'Please input your username' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Password'
          type='password'
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          type='primary'
          htmlType='submit'
          className='login-form-button'
        >
          Log In
        </Button>
      </Form.Item>
      {error && (
        <Alert
          message='Error'
          description='Username cant be find'
          type='error'
          showIcon
        />
      )}
    </Form>
  )
}
