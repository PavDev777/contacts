import { Alert, Button, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './loginForm.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logIn } from '../../redux/slices/auth/authSlice'
import { fetchUsers } from '../../redux/slices/user/userSlice'
import { useState } from 'react'
import { selectLoading } from '../../redux/slices/user/selectors'
import { LoginData } from './type'

const { Title } = Typography

export const Login = () => {
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)

  const onFinish = async ({ userName }: LoginData) => {
    const isUserFound = await dispatch(fetchUsers(userName)).unwrap()
    const findUser = isUserFound?.find(
      user => user.username.toLowerCase() === userName.toLowerCase()
    )

    if (findUser) {
      dispatch(logIn())
      setError(false)
      navigate('/contacts')
    } else {
      setError(true)
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
          description='Username can,t be find'
          type='error'
          showIcon
        />
      )}
    </Form>
  )
}
