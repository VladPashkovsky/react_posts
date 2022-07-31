import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import App from '../../App'
import { AuthContext } from '../../context'
import MyButton from '../button/MyButton'

const Navbar = () => {

  const { isAuth, setIsAut } = useContext(AuthContext)

  const logout = (event) => {
    setIsAut(false)
    localStorage.removeItem('auth')
  }

  return (
    <div className='navbar'>
      <MyButton onClick={logout}>Quit</MyButton>
      <div className='navbar__links'>
        <Link to='/about'>About</Link>
        <Link to='/login'>Login</Link>
        <Link to='/posts'>Posts</Link>
        <Link to='/posts_2'>PostsTwo</Link>
      </div>
    </div>
  )
}

export default Navbar