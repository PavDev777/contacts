import { Button } from 'antd'
import styled from './header.module.scss'
import { LogoutOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logOut } from '../../features/auth/authSlice'
import { selectUserData } from '../../features/user/userSlice'

export const Header = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)

  return (
    <header className={styled.header}>
      <div>
        <span>Hello, {userData?.username}! </span>
        <Button
          type='primary'
          icon={<LogoutOutlined />}
          onClick={() => dispatch(logOut())}
        >
          Log Out
        </Button>
      </div>
    </header>
  )
}
