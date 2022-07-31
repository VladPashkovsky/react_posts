import React, { useContext } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import MyInput from '../UI/input/MyInput'
import MyButton from '../UI/button/MyButton'
import {useAuth} from '../hooks/useAuth'
import { AuthContext } from '../context'

const Login = () => {
  // const navigate = useNavigate()
  // const location = useLocation()
  // const {singIn} = useAuth()
  //
  // const fromPage = location.state?.from?.pathname || '/'
  //
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const form = event.target
  //   const user = form.username.value
  //
  //   singIn(user, () => navigate(fromPage, {replace: true}))
  // }

  const useLogin = (event) => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    event.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }

  return (
    <div>
      <h1>Login Page:</h1>
      <form onSubmit={useLogin}>
        <MyInput type='text' placeholder='Enter your name' />
        <MyInput type='password' placeholder='Enter your password' />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  )
}

export default Login