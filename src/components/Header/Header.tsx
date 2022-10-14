import { Button } from 'antd'
import styled from './header.module.scss'
import { LogoutOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logOut } from '../../redux/slices/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { selectUserData } from '../../redux/slices/user/selectors'

export const Header = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const navigate = useNavigate()

  const logOutHandler = () => {
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <header className={styled.header}>
      <div>
        <span>Hello, {userData?.username}! </span>
        <Button
          type='primary'
          icon={<LogoutOutlined />}
          onClick={logOutHandler}
        >
          Log Out
        </Button>
      </div>
    </header>
  )
}
