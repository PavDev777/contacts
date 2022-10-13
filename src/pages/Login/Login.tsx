import { Button, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './loginForm.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logIn } from '../../features/auth/authSlice'
import { fetchUsers, selectStatus } from '../../features/user/userSlice'

type LoginData = {
  userName: string
}

const { Title } = Typography

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)

  const onFinish = async ({ userName }: LoginData) => {
    const isUserFound = await dispatch(fetchUsers(userName)).unwrap()
    const findUser = isUserFound.find(user => user.username === userName)

    try {
      if (findUser) {
        dispatch(logIn())
        navigate('/contacts')
      } else {
        console.log('не существует')
      }
    } catch (error) {
      console.log(error)
    }

    // setLoading(true)
    // dispatch(fetchUsers(userName))
    // const response = await fetch(
    //   'https://5fb3db44b6601200168f7fba.mockapi.io/api/users'
    // )
    // const users = (await response.json()) as singleUser[]
    //
    // const findUser = users.find(
    //   user => user.username.toLowerCase() === userName.toLowerCase()
    // )
    // if (!findUser) {
    //   setError(true)
    //   setLoading(false)
    // } else {
    //   setError(false)
    //   setLoading(false)
    //   dispatch(logIn())
    //   navigate('/contacts')
    // }
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
          loading={status === 'loading'}
          type='primary'
          htmlType='submit'
          className='login-form-button'
        >
          Log In
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
  )
}
