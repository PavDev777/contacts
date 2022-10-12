import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Contacts } from './pages/Contacts/Contacts'
import { Login } from './pages/Login/Login'
import { useAppSelector } from './app/hooks'
import { isLogged } from './features/auth/authSlice'

function App() {
  const isLoggedIn = useAppSelector(isLogged)

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn ? <Navigate to='/contacts' /> : <Navigate to='/login' />
          }
        />
        <Route path='/login' element={!isLoggedIn && <Login />} />
        <Route
          path='/contacts'
          element={isLoggedIn ? <Contacts /> : <Login />}
        />
      </Routes>
    </div>
  )
}

export default App
