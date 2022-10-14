import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { useAppSelector } from './app/hooks'
import { Header } from './components/Header'
import { isLoggedSelector } from './redux/slices/auth/selectors'
import { Contacts } from './pages/Contacts'

function App() {
  const isLoggedIn = useAppSelector(isLoggedSelector)

  return (
    <div className='App'>
      {isLoggedIn && <Header />}
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
